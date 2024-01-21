const envPrefix = 'VITE_VAR_';

const loremIpsum = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet'
];
let loremIpsumIdx = 0;

const delimiter: string = import.meta.env[envPrefix + 'DELIMITER'];
const replacements: string = import.meta.env[envPrefix + 'REPLACE'];

export function setupVar(el: HTMLElement) {
    const varName = el.dataset['var'];
    if (varName === undefined)
      throw new Error('Expected "dataset.var" to be defined.');

    const envKey = envPrefix + varName.toUpperCase();
    const value: string|undefined = import.meta.env[envKey];
    if (value === undefined) {
      console.error(`Expected the environment variable "${envKey}" to be set.`);
      return;
    }

    let replaced = value;
    let toReplace = null;
    for (const char of replacements) {
        if (toReplace === null) {
            toReplace = char;
            continue;
        }

        replaced = replaced.replace(toReplace, char);
        toReplace = null;
    }

    const split = replaced.split(delimiter);

    const linkPrefixEnvKey = envKey + '_LINK_PREFIX';
    const linkPrefix: string|undefined = import.meta.env[linkPrefixEnvKey];
    if (linkPrefix !== undefined)
        el.addEventListener('click', () => window.open(linkPrefix + split.join('')));

    const labelSeparatorEnvKey = envKey + '_LABEL_SEPARATOR';
    const labelSeparator = import.meta.env[labelSeparatorEnvKey] ?? '';

    while (el.firstChild)
        el.firstChild.remove();

    let isFirst = true;

    for (const part of split) {
        if (!isFirst) {
            const noPartEl = document.createElement('span');
            noPartEl.classList.add('no-part');
            noPartEl.innerText = loremIpsum[loremIpsumIdx];
            el.appendChild(noPartEl);

            loremIpsumIdx = (loremIpsumIdx + 1) % loremIpsum.length;
        }

        const partEl = document.createElement('span');
        partEl.classList.add('part');
        partEl.innerText = isFirst ? part : labelSeparator + part;
        el.appendChild(partEl);

        isFirst = false;
    }
}
