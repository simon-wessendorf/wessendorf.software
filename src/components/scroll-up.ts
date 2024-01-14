interface ScrollUpArgs {
    showIfNeeded: () => void,
    hideIfNeeded: () => void,
    scrollContainer: HTMLElement,
    control: HTMLElement
}

function showIfNeeded(args: ScrollUpArgs) {
    if (args.scrollContainer.scrollTop < 10)
        return;

    args.control.classList.remove('d-none');
    window.addEventListener('scroll', args.hideIfNeeded);
    window.removeEventListener('scroll', args.showIfNeeded);
}

function hideIfNeeded(args: ScrollUpArgs) {
    if (args.scrollContainer.scrollTop > 10)
        return;

    args.control.classList.add('d-none');
    window.addEventListener('scroll', args.showIfNeeded);
    window.removeEventListener('scroll', args.hideIfNeeded);
}


export function setupScrollUp(scrollContainer: HTMLElement, control: HTMLElement) {
    control.addEventListener('click', () => scrollContainer.scrollTo(0, 0));

    const args: Partial<ScrollUpArgs> = { scrollContainer, control };
    args.showIfNeeded = showIfNeeded.bind(null, args as ScrollUpArgs);
    args.hideIfNeeded = hideIfNeeded.bind(null, args as ScrollUpArgs);

    window.addEventListener('scroll', args.showIfNeeded);
}
