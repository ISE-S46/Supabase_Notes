import React, { useState, useEffect } from 'react';
import type { NoteEditorProps } from '../interfaces/noteTypes';
import { formatDateTime } from '../utils/FormatDate';

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdate }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note]);    

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onUpdate(note.id, newTitle, content);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        onUpdate(note.id, title, newContent);
    };

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="border-b px-8 py-4">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Untitled Note"
                    className="text-2xl font-medium w-full outline-none"
                />
                <p className="text-sm text-gray-400 mt-2">
                    Created at {formatDateTime(note.created_at)}
                </p>
            </div>
            <div className="flex-1 px-8 py-6">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Start typing your note..."
                    className="w-full h-full outline-none resize-none text-gray-700"
                />
            </div>
        </div>
    );
};