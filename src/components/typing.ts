const cycleInterval = 5;
const canvasContext = document.createElement('canvas').getContext('2d')!;

function getTextWidth(text: string, font: string) {
    canvasContext.font = font;
    return canvasContext.measureText(text).width;
}

function typingCycle(el: HTMLUListElement) {
    const current = el.querySelector<HTMLLIElement>('.active');
    const next = (current?.nextElementSibling ?? el.firstElementChild) as HTMLLIElement;
    if (next === null)
        return;

    next.style.animationTimingFunction = `steps(${next.innerText.length})`;

    const font = el.computedStyleMap().get('font')!.toString();
    const textWidth = getTextWidth(next.innerText, font);
    next.style.setProperty('--text-width', `${textWidth}px`);
    
    current?.classList.remove('active');
    next.classList.add('active');
}

export function setupTyping(el: HTMLUListElement) {
    typingCycle(el);
    setInterval(typingCycle.bind(null, el), cycleInterval * 1000);
}
