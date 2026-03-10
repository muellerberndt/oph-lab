declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

function hasGtag(): boolean {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function trackPageView(path: string, title: string) {
    if (!hasGtag()) return;

    window.gtag?.('event', 'page_view', {
        page_title: title,
        page_path: path,
        page_location: new URL(path, window.location.origin).toString(),
    });
}

export function trackEvent(eventName: string, params: Record<string, unknown>) {
    if (!hasGtag()) return;
    window.gtag?.('event', eventName, params);
}

export function installLinkTracking(pageSection: string) {
    const handleClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const link = target.closest('a[href]');
        if (!link || !hasGtag()) return;

        const url = new URL(link.href, window.location.href);
        const shouldTrack = url.host !== window.location.host ||
            url.pathname.startsWith('/oph/');

        if (!shouldTrack) return;

        trackEvent('navigation_click', {
            page_section: pageSection,
            link_text: (link.textContent || '').trim().slice(0, 120),
            link_url: url.toString(),
        });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
}
