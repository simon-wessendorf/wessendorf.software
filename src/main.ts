import './main.scss';
import { setupTyping } from './components/typing.ts';
import { setupVar } from './utils/var.ts';
import { setupScrollUp } from './components/scroll-up.ts';


window.addEventListener('load', () => {
  // The typing animation
  for (const el of document.querySelectorAll<HTMLUListElement>('.typing'))
    setupTyping(el);

  // Fill in private information
  for (const el of document.querySelectorAll<HTMLElement>('[data-var]'))
    setupVar(el);

  // The scroll up button
  for (const el of document.querySelectorAll<HTMLElement>('.scroll-up'))
    setupScrollUp(document.querySelector<HTMLElement>('html')!, el);
});
