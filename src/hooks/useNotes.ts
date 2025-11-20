import { useState, useEffect } from 'react';
import type { Note } from '../interfaces/noteTypes';
import { noteStorage } from '../services/noteServices';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const loadedNotes = await noteStorage.loadAll();
            setNotes(loadedNotes);
        })();
    }, []);

    const createNote = async () => {
        const newNote = {
            title: '',
            content: '',
            created_at: new Date()
        };

        const newId = await noteStorage.save(newNote);

        if (newId !== null) {
            const fullNote: Note = { id: newId, ...newNote };

            setNotes(prev => [fullNote, ...prev]);
            setSelectedNoteId(newId);
        }
    };

    const updateNote = async (id: number, newTitle: string, newContent: string) => {
        const success = await noteStorage.update(id, newTitle, newContent);
        if (success) {
            setNotes(prev =>
                prev.map(note =>
                    note.id === id ? { ...note, title: newTitle, content: newContent } : note
                )
            );
        }
    };

    const deleteNote = async (id: number) => {
        const success = await noteStorage.remove(id);

        if (success) {
            setNotes(prev => prev.filter(note => note.id !== id));
            if (selectedNoteId === id) {
                setSelectedNoteId(null);
            }
        }
    };

    const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

    return {
        notes,
        selectedNote,
        selectedNoteId,
        setSelectedNoteId,
        createNote,
        updateNote,
        deleteNote
    };
};