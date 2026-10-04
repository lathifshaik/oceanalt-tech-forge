import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The home page is pre-rendered at build time (scripts/prerender.mjs), so
// hydrate it. The Terms and Privacy routes aren't, so render those fresh.
if (root.hasChildNodes() && !window.location.hash.startsWith('#/')) hydrateRoot(root, app);
else {
  root.replaceChildren();
  createRoot(root).render(app);
}
