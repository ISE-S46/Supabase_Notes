import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import type { Note } from '../interfaces/noteTypes';
import { NoteListItem } from './NoteListItem';

interface SidebarProps {
    notes: Note[];
    selectedNoteId: number | null;
    onSelectNote: (id: number) => void;
    onCreateNote: () => void;
    onDeleteNote: (id: number) => void;
    onHide: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    notes,
    selectedNoteId,
    onSelectNote,
    onCreateNote,
    onDeleteNote,
    onHide
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onHide}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Hide sidebar"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Notes</h1>
                    </div>
                    <button
                        onClick={onCreateNote}
                        className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <Plus size={18} />
                        New
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredNotes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-8">
                        <div className="w-16 h-16 mb-4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-center">No notes yet</p>
                        <p className="text-sm text-center mt-1">Click "New" to create one</p>
                    </div>
                ) : (
                    filteredNotes.map(note => (
                        <NoteListItem
                            key={note.id}
                            note={note}
                            isSelected={note.id === selectedNoteId}
                            onSelect={onSelectNote}
                            onDelete={onDeleteNote}
                        />
                    ))
                )}
            </div>
        </div>
    );
};