/**
 * Oceanalt dish tagger. Reads a menu line (name, price, description) and scores the dish on seven
 * flavour and texture axes from the words in it: ingredients, cooking methods and dish types.
 * No outside service, no key. Every score can be traced back to the words that set it, so a
 * wrong score is fixed by editing the word lists below.
 *
 * Axes, 0 to 1: heat, crunch, rich, fresh, sweet, tang, umami.
 */
export const AXES = ["heat", "crunch", "rich", "fresh", "sweet", "tang", "umami"];

/* dish types set the starting point. [pattern, base scores, plate look, kind] */
const TYPES = [
  [/\b(ramen|pho|udon|soba|laksa|noodle soup|bun bo)\b/, { rich: .5, fresh: .3, umami: .8 }, "noodles", "main"],
  [/\b(noodles?|pad thai|lo mein|chow mein|mee goreng|dan dan|japchae|pad see ew)\b/, { rich: .5, umami: .6, sweet: .2 }, "noodles", "main"],
  [/\b(pasta|spaghetti|linguine|rigatoni|penne|gnocchi|lasagne|tagliatelle|pappardelle|cacio e pepe|carbonara)\b/, { rich: .7, umami: .6 }, "pasta", "main"],
  [/\b(pizza|margherita|calzone)\b/, { rich: .7, crunch: .4, umami: .6, tang: .2 }, "pizza", "main"],
  [/\b(burger|cheeseburger|slider)\b/, { rich: .85, crunch: .3, umami: .7, sweet: .2 }, "plate-grill", "main"],
  [/\b(burrito|wrap|quesadilla|kebab|shawarma|gyros?|souvlaki|banh mi|roll)\b/, { rich: .6, crunch: .3, fresh: .4, umami: .5 }, "roll", "main"],
  [/\b(tacos?|tostadas?|nachos)\b/, { crunch: .5, fresh: .5, tang: .3, rich: .4 }, "tacos", "main"],
  [/\b(curry|masala|korma|vindaloo|rendang|massaman|dhal|dal|tikka|madras|rogan josh|stew|wat)\b/, { rich: .7, heat: .4, umami: .7 }, "bowl-brown", "main"],
  [/\b(soup|broth|chowder)\b/, { fresh: .3, rich: .4, umami: .6 }, "bowl-yellow", "main"],
  [/\b(salad|slaw|fattoush|tabouli|tabbouleh|larb|som tam|poke)\b/, { fresh: .85, crunch: .5, tang: .4 }, "greens", "main"],
  [/\b(sushi|sashimi|nigiri|maki|hand ?roll|chirashi)\b/, { fresh: .8, umami: .7, tang: .2 }, "sushi", "main"],
  [/\b(ceviche|crudo|tartare|carpaccio)\b/, { fresh: .9, tang: .8 }, "ceviche", "main"],
  [/\b(fried rice|nasi goreng|biryani|risotto|paella|jollof|don|donburi|bibimbap|rice bowl|rice plate|broken rice)\b/, { rich: .5, umami: .7 }, "rice", "main"],
  [/\b(dumplings?|gyoza|bao|buns?|xiao long bao|wontons?|momos?|spring rolls?)\b/, { rich: .5, umami: .7, crunch: .3 }, "rolls", "main"],
  [/\b(fried chicken|karaage|wings|nuggets|schnitzel|katsu|tenders)\b/, { crunch: .95, rich: .75, umami: .6 }, "chicken", "main"],
  [/\b(steak|brisket|ribs|grill(ed)?|bbq|barbecue|skewers?|chops?|cutlets?|lamb shoulder|roast)\b/, { rich: .7, umami: .8 }, "plate-grill", "main"],
  [/\b(pie|pastie|pastry|spanakopita|borek|empanadas?|samosas?)\b/, { crunch: .7, rich: .6 }, "pie", "main"],
  [/\b(falafel|arancini|croquettes?|meatballs?|kofta)\b/, { crunch: .6, rich: .5, umami: .5 }, "falafel", "main"],
  [/\b(platter|plate|combination|mezze|thali|banquet)\b/, { rich: .5, umami: .5, fresh: .3 }, "platter", "main"],
  [/\b(fries|chips|wedges|onion rings|hash browns?|tots)\b/, { crunch: .9, rich: .5 }, "platter", "side"],
  [/\b(bread|naan|roti|pita|garlic bread|focaccia|rice|edamame|greens|broccolini|bok choy|side)\b/, { rich: .3 }, "greens", "side"],
  [/\b(cake|brownie|cookie|ice cream|gelato|tart|pudding|cheesecake|churros|tiramisu|mochi|baklava|pavlova|dessert|donut|doughnut|sundae)\b/, { sweet: .9, rich: .6 }, "pie", "dessert"],
  [/\b(coffee|latte|tea|juice|smoothie|soda|coke|lemonade|beer|wine|water|kombucha|milkshake|shake)\b/, { sweet: .3 }, "flat", "drink"],
];

/* words that push an axis up or down */
const WORDS = {
  heat: [[/\b(chilli|chili|chillies|spicy|hot|fiery|sriracha|jalapeno|jalapeño|habanero|chipotle|gochujang|kimchi|harissa|nduja|'nduja|vindaloo|peri ?peri|sambal|mala|sichuan|szechuan|szechwan|buffalo|cajun|berbere|scotch bonnet|xo|chilli oil|la zi|diavola|arrabbiata|green curry|red curry|jungle curry|larb|som tam|madras)\b/, .35],
         [/\b(mild|kids?|plain)\b/, -.3]],
  crunch: [[/\b(crispy|crisp|crunchy|fried|deep[- ]fried|tempura|panko|crumbed|battered|toasted|charred|crackling|pork belly|nuts?|peanuts?|cashews?|almonds?|pistachios?|sesame|slaw|cabbage|lettuce|cucumber|radish|apple|wafers?|crackers?|prawn crackers|croutons|pickles?|tostada|taco shell|papadum|pappadum|spring onion)\b/, .25],
           [/\b(soft|silken|creamy|mashed|puree|purée|braised|slow[- ]cooked|soup|broth|stew)\b/, -.2]],
  rich: [[/\b(butter|buttery|cream|creamy|cheese|cheesy|parmesan|pecorino|mozzarella|cheddar|gruyere|brie|burrata|ricotta|bacon|pork belly|brisket|lamb|wagyu|short rib|duck|confit|braised|slow[- ]cooked|ghee|coconut cream|coconut milk|egg yolk|aioli|mayo|mayonnaise|gravy|carbonara|alfredo|truffle|bone marrow|lard|tallow|double|loaded|smothered|mac)\b/, .2],
         [/\b(light|lean|steamed|poached|raw|salad|grilled fish|vegetable broth|clear)\b/, -.2]],
  fresh: [[/\b(fresh|herbs?|mint|coriander|cilantro|basil|thai basil|parsley|dill|chives|lemongrass|lime|lemon|cucumber|tomato|tomatoes|salad|greens|leaves|rocket|spinach|kale|raw|crudo|ceviche|sashimi|poke|slaw|salsa|pico|herb|rice paper|papaya|mango|avocado|sprouts|watercress|radish|citrus|yoghurt|yogurt|tzatziki)\b/, .2],
          [/\b(fried|deep[- ]fried|braised|slow[- ]cooked|gravy|cheese|cream)\b/, -.15]],
  sweet: [[/\b(sweet|honey|caramel|caramelised|caramelized|maple|sugar|syrup|teriyaki|hoisin|char siu|bbq sauce|glazed|glaze|mango|pineapple|coconut|chocolate|vanilla|jam|plum sauce|sweet chilli|kecap manis|palm sugar|dates|raisins|dulce|condensed milk|nutella|berry|berries|banana|plantain|candied)\b/, .2]],
  tang: [[/\b(lime|lemon|citrus|vinegar|pickled|pickles?|kimchi|sauerkraut|tamarind|sumac|yoghurt|yogurt|tzatziki|labneh|sour|sour cream|ceviche|nam jim|nuoc cham|ponzu|yuzu|capers|olives|feta|goat cheese|tomato|tomatoes|salsa|mustard|chutney|vinaigrette|dressing|larb|som tam|tom yum|achar|sorrel)\b/, .2]],
  umami: [[/\b(soy|shoyu|tamari|miso|dashi|mushrooms?|shiitake|porcini|truffle|parmesan|anchovy|anchovies|fish sauce|oyster sauce|xo|black bean|doubanjiang|broth|stock|bone broth|tonkotsu|beef|bacon|ham|prosciutto|salami|chorizo|pork|duck|lamb|chicken|prawns?|shrimp|crab|scallops?|seaweed|nori|bonito|kombu|tomato paste|worcestershire|aged|cured|smoked|grilled|charred|roast|roasted|cheese|gravy|ragu|bolognese|kimchi|natto)\b/, .12]],
};

const MEAT = /\b(beef|pork|lamb|chicken|duck|bacon|ham|prosciutto|salami|chorizo|brisket|wagyu|veal|goat|turkey|mince|sausage|pepperoni|meatballs?|ribs|steak|fish|salmon|tuna|prawns?|shrimp|crab|scallops?|squid|calamari|octopus|anchovy|anchovies|fish sauce|oyster sauce|bonito|dashi|gelatin|lard|tallow|kingfish|barramundi|snapper|cod|mussels|clams|oysters|lobster|eel|kebab|shawarma|karaage|katsu|schnitzel|nuggets|wings)\b/;
const VEG_HINT = /\b(vegetarian|veggie|vegetable|veg|tofu|tempeh|paneer|falafel|mushroom|eggplant|aubergine|cauliflower|chickpea|lentil|dhal|dal|halloumi|haloumi|bean|beans|spinach|pumpkin|potato|margherita|cacio e pepe|seitan|jackfruit|greens|salad|broccolini)\b/;

/* what well-known dishes usually contain, so a menu that only says "Khao soi" still scores right.
   Added to the dish's own words before scoring. */
const KNOWN = [
  [/mapo tofu/, "chilli sichuan doubanjiang braised silken tofu beef mince"], [/dan ?dan/, "chilli oil sichuan pork mince sesame noodles"],
  [/kung pao/, "chilli peanuts sichuan sweet soy"], [/yangnyeom/, "fried crispy sweet chilli gochujang glazed garlic"], [/bulgogi/, "sweet soy grilled beef sesame"],
  [/bibimbap/, "rice vegetables egg gochujang chilli sesame fresh"], [/tteokbokki/, "chilli gochujang sweet soft"], [/japchae/, "sweet soy noodles vegetables sesame"],
  [/khao soi/, "curry coconut milk noodles crispy chilli pickled lime"], [/pad thai/, "noodles tamarind peanuts lime sweet fish sauce"], [/pad see ew/, "noodles sweet soy charred"],
  [/green curry/, "chilli coconut milk thai basil"], [/red curry/, "chilli coconut milk"], [/massaman/, "coconut milk peanuts sweet potato mild"], [/tom yum/, "chilli lime lemongrass sour broth"],
  [/larb/, "chilli lime mint fresh herbs fish sauce toasted rice"], [/(som tam|papaya salad)/, "chilli lime fish sauce peanuts crunchy fresh sour"],
  [/gado ?gado/, "vegetables peanut sauce egg prawn crackers fresh crunchy"], [/nasi goreng/, "fried rice kecap manis sweet chilli egg"], [/rendang/, "slow-cooked beef coconut chilli spices"],
  [/satay/, "grilled peanut sauce sweet"], [/laksa/, "chilli coconut milk noodles broth"], [/(banh mi)/, "crusty bread pickled carrot herbs chilli pate crunchy fresh"],
  [/\bpho\b/, "broth beef herbs lime fresh"], [/bun cha/, "grilled pork noodles herbs nuoc cham fresh"], [/(broken rice|com tam)/, "grilled pork chop rice egg pickled nuoc cham sweet"],
  [/spring rolls?/, "crispy fried crunchy"], [/rice paper rolls?/, "fresh herbs raw"], [/kottu/, "chopped roti curry chilli fried"], [/hoppers?/, "crispy coconut"],
  [/(dhal|\bdal\b)/, "lentils mild creamy"], [/butter chicken/, "butter cream tomato mild"], [/vindaloo/, "very hot chilli vinegar"], [/(chole|chana)/, "chickpeas spices tomato"],
  [/bhature/, "fried bread"], [/dosa/, "crispy crepe potato coconut chutney"], [/biryani/, "rice spices fried onion"], [/samosas?/, "fried crispy potato peas"],
  [/doro wat/, "chilli berbere slow-cooked chicken egg injera sour"], [/injera/, "sour"], [/(shiro|misir)/, "lentils berbere"],
  [/shawarma/, "garlic sauce pickles grilled"], [/falafel/, "fried crunchy chickpea tahini"], [/hummus/, "chickpea tahini lemon"], [/fattoush/, "fresh crunchy sumac lemon crisp bread"],
  [/(adana|iskender)/, "chilli grilled lamb"], [/lahmacun/, "crispy flatbread mince chilli herbs lemon"], [/(gozleme|pide)/, "flatbread cheese"],
  [/souvlaki/, "grilled lemon tzatziki"], [/spanakopita/, "crispy pastry spinach feta"], [/(gyros?)/, "tzatziki tomato onion"],
  [/cacio e pepe/, "pecorino butter black pepper"], [/carbonara/, "egg yolk pecorino guanciale"], [/'?nduja/, "spicy chilli cured pork"], [/margherita/, "tomato mozzarella basil"],
  [/(al pastor)/, "pineapple chilli grilled pork"], [/(birria)/, "chilli braised beef broth"], [/quesadilla/, "cheese crispy"], [/(elote|esquites)/, "corn cheese lime chilli"],
  [/ceviche/, "raw fish lime chilli fresh"], [/(lomo saltado)/, "soy beef fries tomato"], [/pollo a la brasa/, "roast chicken aji"],
  [/jollof/, "tomato chilli rice smoky"], [/suya/, "spicy peanut grilled"], [/plantain/, "fried sweet"],
  [/karaage/, "fried crispy chicken soy ginger"], [/katsu/, "crumbed fried crispy"], [/(tonkotsu)/, "pork broth rich creamy"], [/miso ramen/, "miso broth"], [/shoyu ramen/, "soy broth"],
  [/aburi/, "seared salmon mayo"], [/teriyaki/, "sweet soy glazed"], [/gyoza/, "pan-fried crispy pork"],
  [/brisket/, "smoked slow-cooked rich"], [/(pulled pork)/, "smoked sweet bbq sauce"], [/(mac(aroni)? (and|&|n) cheese)/, "cheese cream rich"],
  [/(fried chicken)/, "crispy"], [/(buffalo wings?)/, "hot sauce chilli crispy butter"], [/caesar/, "cos lettuce parmesan croutons anchovy dressing crunchy"],
  [/poke/, "raw fish rice soy sesame cucumber fresh"], [/(burrito)/, "rice beans cheese salsa"], [/cheeseburger/, "cheese pickles"],
];

const clamp = (x) => Math.max(0, Math.min(1, x));
const norm = (s) => ` ${s.toLowerCase().replace(/[’']/g, "'")} `;

/** Tag one dish. Returns scores, diets, plate look, kind and the words that drove each axis. */
export function tagDish(name, description = "") {
  const base = `${name} ${description}`.toLowerCase();
  const extra = KNOWN.filter(([re]) => re.test(base)).map(([, w]) => w).join(" ");
  const text = norm(`${name} ${description} ${extra}`);
  const nameText = norm(name);
  const v = { heat: .1, crunch: .25, rich: .4, fresh: .3, sweet: .15, tang: .2, umami: .45 };
  let look = "bowl-mixed", kind = "main";
  const why = Object.fromEntries(AXES.map((a) => [a, []]));
  /* the first type that matches the dish name wins, then the description */
  const type = TYPES.find(([re]) => re.test(nameText)) || TYPES.find(([re]) => re.test(text));
  if (type) { const [, base, l, k] = type; Object.assign(v, Object.fromEntries(Object.entries(base).map(([a, x]) => [a, Math.max(v[a], x)]))); look = l; kind = k; }
  for (const axis of AXES) for (const [re, step] of WORDS[axis] || []) {
    const hits = text.match(new RegExp(re.source, "g")) || [];
    if (!hits.length) continue;
    /* diminishing returns: the first word counts in full, each further one less */
    const total = hits.reduce((s, _, i) => s + step / (1 + i * .7), 0);
    v[axis] += total; why[axis].push(...new Set(hits.map((h) => h.trim())));
  }
  /* looks that the words make plain */
  if (/\b(chilli|chili|sichuan|szechuan|mala|dan dan|spicy)\b/.test(text) && look === "noodles") look = "noodles-red";
  if (look === "bowl-brown" && v.heat > .55) look = "bowl-red";
  if (look === "bowl-brown" && /\b(coconut|korma|yellow|massaman|dhal|dal|laksa)\b/.test(text)) look = "bowl-yellow";
  if (/\b(burrito)\b/.test(nameText)) look = "burrito";
  /* diets: what the menu says, plus vegetarian when there's plainly no meat or fish */
  const diets = new Set();
  if (/\((v|veg|vegetarian)\)|\bvegetarian\b|\(v,|, ?v\)/.test(text)) diets.add("veg");
  if (/\((vg|ve|vegan)\)|\bvegan\b|\bplant[- ]based\b/.test(text)) { diets.add("vegan"); diets.add("veg"); }
  if (/\(gf\)|\bgluten[- ]free\b|\bgf\b|\bcoeliac\b/.test(text)) diets.add("gf");
  if (/\bhalal\b/.test(text)) diets.add("halal");
  if (!diets.has("veg") && !MEAT.test(text) && VEG_HINT.test(text) && kind !== "drink") diets.add("veg");
  const scores = AXES.map((a) => Math.round(clamp(v[a]) * 100) / 100);
  return { v: scores, diets: [...diets], look, kind, why };
}

/* cuisine from the dish names on a menu, when the header doesn't say */
const CUISINES = [
  ["Sichuan", /\b(sichuan|szechuan|mapo|dan dan|mala|kung pao|dry[- ]fried)\b/], ["Chinese", /\b(dumplings?|wontons?|char siu|fried rice|chow mein|xiao long bao|bao|peking|sweet and sour)\b/],
  ["Japanese", /\b(sushi|sashimi|ramen|udon|katsu|karaage|teriyaki|gyoza|donburi|don|miso|tempura|onigiri)\b/], ["Korean", /\b(kimchi|bibimbap|bulgogi|gochujang|japchae|tteokbokki|korean)\b/],
  ["Thai", /\b(pad thai|tom yum|green curry|red curry|massaman|larb|som tam|pad see ew|khao)\b/], ["Vietnamese", /\b(pho|banh mi|bun|rice paper|nuoc cham|com tam|broken rice)\b/],
  ["Indonesian", /\b(nasi goreng|rendang|gado gado|satay|sambal|mee goreng|ayam)\b/], ["Indian", /\b(curry|masala|tikka|korma|vindaloo|naan|biryani|paneer|dhal|dal|dosa|samosa|bhaji|tandoori)\b/],
  ["Sri Lankan", /\b(hoppers|kottu|lamprais|sri lankan)\b/], ["Lebanese", /\b(shawarma|falafel|hummus|tabouli|tabbouleh|fattoush|manoush|kibbeh|labneh)\b/],
  ["Turkish", /\b(kebab|pide|lahmacun|gozleme|borek|adana|iskender|turkish)\b/], ["Greek", /\b(souvlaki|gyros?|spanakopita|moussaka|tzatziki|saganaki|greek)\b/],
  ["Italian", /\b(pizza|pasta|spaghetti|risotto|gnocchi|lasagne|arancini|tiramisu|carbonara|margherita|cacio e pepe)\b/], ["Mexican", /\b(tacos?|burrito|quesadilla|nachos|enchiladas?|tostadas?|al pastor|churros|guacamole)\b/],
  ["Ethiopian", /\b(injera|wat|tibs|berbere|kitfo|shiro)\b/], ["Peruvian", /\b(ceviche|lomo saltado|anticuchos|pollo a la brasa|aji)\b/],
  ["West African", /\b(jollof|suya|plantain|fufu|egusi|waakye)\b/], ["Barbecue", /\b(brisket|smoked|ribs|pulled pork|burnt ends|smokehouse)\b/],
  ["Burgers", /\b(burgers?|cheeseburger|sliders?)\b/], ["Fried chicken", /\b(fried chicken|wings|tenders|nuggets)\b/],
];
export function guessCuisine(names) {
  const text = norm(names.join(" · "));
  let best = ["Other", 0];
  for (const [c, re] of CUISINES) { const n = (text.match(new RegExp(re.source, "g")) || []).length; if (n > best[1]) best = [c, n]; }
  return best[0];
}

/* read a pasted menu: one dish per line, price anywhere on the line, the rest split into name and description */
export function parseMenu(body) {
  const dishes = [];
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!line || line.length < 3 || /^#/.test(line)) continue;
    const pm = line.match(/\$\s?(\d+(?:\.\d{1,2})?)/) || line.match(/(?:^|\s)(\d{1,3}(?:\.\d{2})?)\s*$/);
    if (!pm) continue; /* section headings and notes have no price */
    const price = Number(pm[1]);
    const rest = (line.slice(0, pm.index) + " " + line.slice(pm.index + pm[0].length)).trim();
    const [name] = rest.split(/\s{2,}| [-–—|:] | \(|, (?=[a-z])/);
    const description = rest.slice(name.length).replace(/^[\s\-–—|:,]+/, "");
    if (name && name.length > 1) dishes.push({ name: name.replace(/[\s\-–—|:]+$/, "").trim(), price, description });
  }
  return dishes;
}
