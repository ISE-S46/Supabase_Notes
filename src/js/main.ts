import '../scss/styles.scss'
import { 
    fetchNotes,
    PostNote,
    removeNote,
    editNoteUI
} from './noteService';

// Cache DOM elements to avoid repeated queries
let cachedElements: {
    notes: HTMLDivElement | null;
    noteForm: HTMLFormElement | null;
    noteInput: HTMLTextAreaElement | null;
    searchBar: HTMLFormElement | null;
    searchInput: HTMLInputElement | null;
} | null = null;

function initializeDOMElements(): void {
    cachedElements = {
        notes: document.getElementById('notes') as HTMLDivElement,
        noteForm: document.getElementById('noteForm') as HTMLFormElement,
        noteInput: document.getElementById('noteInput') as HTMLTextAreaElement,
        searchBar: document.querySelector<HTMLFormElement>('form[role="search"]'),
        searchInput: document.querySelector<HTMLInputElement>('input[type="search"]')
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    initializeDOMElements();

    if (!cachedElements) return;

    await fetchNotes();

    // Event delegation for delete and edit buttons
    cachedElements.notes?.addEventListener('click', handleNoteActions);

    // Search form listener
    cachedElements.searchBar?.addEventListener('submit', (event) => {
        event.preventDefault();
        fetchNotes(cachedElements?.searchInput?.value || '');
    });

    // Note form listener
    cachedElements.noteForm?.addEventListener('submit', PostNote);
});

function handleNoteActions(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('delete-btn')) {
        const noteId = target.getAttribute('data-id');
        if (noteId) {
            removeNote(noteId);
        }
    } else if (target.classList.contains('edit-btn')) {
        const noteId = target.getAttribute('data-id');
        if (noteId) {
            editNoteUI(noteId);
        }
    }
}

export { cachedElements }