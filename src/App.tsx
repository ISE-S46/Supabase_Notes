import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useNotes } from './hooks/useNotes';
import { Sidebar } from './components/Sidebar';
import { NoteEditor } from './components/NoteEditor';
import { EmptyState } from './components/EmptyState';
import './css/styles.css';

const App: React.FC = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const {
        notes,
        selectedNote,
        selectedNoteId,
        setSelectedNoteId,
        createNote,
        updateNote,
        deleteNote
    } = useNotes();

    return (
        <div className="flex h-screen bg-gray-50">
            {isSidebarVisible && (
                <Sidebar
                    notes={notes}
                    selectedNoteId={selectedNoteId}
                    onSelectNote={setSelectedNoteId}
                    onCreateNote={createNote}
                    onDeleteNote={deleteNote}
                    onHide={() => setIsSidebarVisible(false)}
                />
            )}

            <div className="flex-1 flex flex-col">
                {!isSidebarVisible && (
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <button
                            onClick={() => setIsSidebarVisible(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Show sidebar"
                        >
                            <Menu size={24} className="text-gray-600" />
                        </button>
                    </div>
                )}

                {selectedNote ? (
                    <NoteEditor
                        note={selectedNote}
                        onUpdate={updateNote}
                        onDelete={deleteNote}
                    />
                ) : (
                    <EmptyState onCreateNote={createNote} />
                )}
            </div>
        </div>
    );
};

export default App;