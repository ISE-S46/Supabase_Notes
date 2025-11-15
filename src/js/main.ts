import '../scss/styles.scss'
import { createClient } from '@supabase/supabase-js'

import { formatDate } from './utils/FormatDate';
import { highlightText } from './utils/highlight';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Note {
    id: number;
    content: string;
    created_at: Date;
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchNotes();

    const DeleteBtn = document.querySelectorAll<HTMLButtonElement>('.delete-btn')
    const EditBtn = document.querySelectorAll<HTMLButtonElement>('.edit-btn')

    DeleteBtn.forEach(button => {
        button.addEventListener('click', () => {
            const noteId = button.getAttribute('data-id');

            console.log("test delete ", noteId)
            // removeNote(noteId);
        });
    });

    // Attach edit event listeners
    EditBtn.forEach(button => {
        button.addEventListener('click', () => {
            const noteId = button.getAttribute('data-id');

            console.log("test edit ", noteId)
            // editNoteUI(noteId);
        });
    });

});

async function fetchNotes(searchQuery = ''): Promise<void> {
    const notes = document.getElementById('notes') as HTMLDivElement;

    let { data, error } = await supabase
        .from('Note')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching data:', error);
        notes.innerHTML = 'Error fetching data';
    }

    const filteredNotes: Note[] | undefined = data?.filter(note => {
        return note.content.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filteredNotes == undefined) {
        console.log("Note table does not exist")
        return
    }

    const result = filteredNotes.map(note => {
        const formattedDate = formatDate(note.created_at);  // Format date to dd/mm/yyyy hh:mm:ss

        const highlightedContent = highlightText(note.content, searchQuery);

        return `<div class="note" id="note-${note.id}">
                    <p><strong>ID:</strong> ${note.id}</p>
                    <p><strong>Created At:</strong> ${formattedDate}</p>
                    <p id="note-content-${note.id}">${highlightedContent}</p>
                    <button class="delete-btn btn btn-danger" data-id="${note.id}">Delete Note</button>
                    <button class="edit-btn btn btn-secondary" data-id="${note.id}">Edit Note</button>
                </div>`;
    }).join('');

    notes.innerHTML = result;

}