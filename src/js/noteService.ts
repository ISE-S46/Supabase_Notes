import { createClient } from '@supabase/supabase-js'
import { createNoteHTML, createEditAreaHTML } from './utils/createHTML';
import { cachedElements } from './main';

interface Database {
    Note: {
        id: number;
        content: string;
        created_at: string;
    };
}

export type Note = Database['Note'];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchNotes(searchQuery = ''): Promise<void> {
    const notesContainer = cachedElements?.notes;
    if (!notesContainer) return;

    try {
        const { data, error } = await supabase
            .from('Note')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            notesContainer.innerHTML = '<p class="text-muted">No notes found. Create your first note!</p>';
            return;
        }

        const filteredNotes = data.filter(note =>
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredNotes.length === 0) {
            notesContainer.innerHTML = '<p class="text-muted">No matching notes found.</p>';
            return;
        }

        const result = filteredNotes.map(note => createNoteHTML(note, searchQuery)).join('');
        notesContainer.innerHTML = result;

    } catch (error) {
        console.error('Error fetching notes:', error);
        notesContainer.innerHTML = '<p class="text-danger">Error loading notes. Please try again.</p>';
    }
}

async function PostNote(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const noteInput = cachedElements?.noteInput;
    if (!noteInput) return;

    const content = noteInput.value.trim();

    if (content === '') {
        alert('Please enter a note.');
        return;
    }

    try {
        const { error } = await supabase
            .from('Note')
            .insert([{ content }]);

        if (error) throw error;

        noteInput.value = '';
        await fetchNotes();
    } catch (error) {
        console.error('Error adding note:', error);
        alert('Error adding note. Please try again.');
    }
}

async function removeNote(id: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('Note')
            .delete()
            .eq('id', id);

        if (error) throw error;

        const noteElement = document.getElementById(`note-${id}`);
        noteElement?.remove();

        await fetchNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note. Please try again.');
    }
}

function editNoteUI(noteId: string): void {
    const noteContentElement = document.getElementById(`note-content-${noteId}`);
    if (!noteContentElement) return;

    const currentContent = noteContentElement.textContent || '';

    noteContentElement.innerHTML = createEditAreaHTML(noteId, currentContent);

    // Add event listeners for save and cancel
    document.querySelector(`.save-edit-btn[data-id="${noteId}"]`)?.addEventListener('click', () => {
        const textarea = document.getElementById(`edit-note-input-${noteId}`) as HTMLTextAreaElement;
        saveNoteEdits(noteId, textarea.value);
    });

    document.querySelector(`.cancel-edit-btn[data-id="${noteId}"]`)?.addEventListener('click', () => {
        cancelNoteEdit(noteId, currentContent);
    });
}

async function saveNoteEdits(noteId: string, updatedContent: string): Promise<void> {
    if (updatedContent.trim() === '') {
        alert('Note content cannot be empty.');
        return;
    }

    try {
        const { error } = await supabase
            .from('Note')
            .update({ content: updatedContent })
            .eq('id', noteId);

        if (error) throw error;

        await fetchNotes();
    } catch (error) {
        console.error('Error updating note:', error);
        alert('Error updating note. Please try again.');
    }
}

function cancelNoteEdit(noteId: string, originalContent: string): void {
    const noteContentElement = document.getElementById(`note-content-${noteId}`);
    if (noteContentElement) {
        noteContentElement.textContent = originalContent;
    }
}

export {
    fetchNotes,
    PostNote,
    removeNote,
    editNoteUI
}