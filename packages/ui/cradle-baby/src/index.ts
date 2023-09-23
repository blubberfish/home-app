import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const domRoot = document.getElementById('root');

if (domRoot) {
  const reactRoot = createRoot(domRoot);
  reactRoot.render(createElement(App));
}
