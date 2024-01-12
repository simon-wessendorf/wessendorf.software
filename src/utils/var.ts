import { varMap } from "../varMap";

export interface Var {
    text: string[] | string,
    link?: string
}

export interface VarMap {
    [name: string]: Var
}

const loremIpsum = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet'
];
let loremIpsumIdx = 0;

export function setupVar(el: HTMLElement) {
    const varName = el.dataset['var'];
    if (varName === undefined)
      throw new Error('Expected dataset.var to be defined');

    const variable = varMap[varName];
    if (variable === undefined) {
      console.error(`Undefined var "${varName}"`);
      return;
    }

    if (variable.link !== undefined)
        el.addEventListener('click', () => window.open(variable.link));
    
    if (typeof variable.text === 'string') {
        el.innerText = variable.text;
        return;
    }

    for (const part of variable.text) {
        const partEl = document.createElement('span');
        partEl.classList.add('part');
        partEl.innerText = part;
        el.appendChild(partEl);

        const noPartEl = document.createElement('span');
        noPartEl.classList.add('no-part');
        noPartEl.innerText = loremIpsum[loremIpsumIdx];
        el.appendChild(noPartEl);

        loremIpsumIdx = (loremIpsumIdx + 1) % loremIpsum.length;
    }
}
