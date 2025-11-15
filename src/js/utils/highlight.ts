export function highlightText(text: string, searchQuery: string): string {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');

    return text.replace(regex, `<span class="highlight">$1</span>`);
}