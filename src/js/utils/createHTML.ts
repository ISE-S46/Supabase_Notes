import { formatDate } from "./FormatDate";
import { highlightText } from "./highlight";
import type { Note } from "../noteService";

export function createNoteHTML(note: Note, searchQuery: string): string {
    const formattedDate = formatDate(note.created_at);
    const highlightedContent = highlightText(note.content, searchQuery);

    return `
        <div class="note" id="note-${note.id}">
            <p><strong>ID:</strong> ${note.id}</p>
            <p><strong>Created At:</strong> ${formattedDate}</p>
            <p id="note-content-${note.id}">${highlightedContent}</p>
            <button class="delete-btn btn btn-danger" data-id="${note.id}">Delete Note</button>
            <button class="edit-btn btn btn-secondary" data-id="${note.id}">Edit Note</button>
        </div>
    `;
}

export function createEditAreaHTML(noteId: string, currentContent = ''): string {
    return `
        <textarea id="edit-note-input-${noteId}" class="form-control" rows="4">${currentContent}</textarea>
        <button class="save-edit-btn btn btn-success mt-2" data-id="${noteId}">Save</button>
        <button class="cancel-edit-btn btn btn-secondary mt-2" data-id="${noteId}">Cancel</button>
    `;
}