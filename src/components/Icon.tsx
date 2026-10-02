import icons from "../../templates/icons/icons.json";

export type IconName = keyof typeof icons;

// Oceanalt's own icon set (templates/icons). Same drawings as the client templates.
export function Icon({ name, className = "i" }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
