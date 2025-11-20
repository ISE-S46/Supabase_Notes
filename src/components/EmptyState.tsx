import React from 'react';

interface EmptyStateProps {
    onCreateNote: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNote }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-24 h-24 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <p className="text-lg mb-2">No note selected</p>
            <p className="text-sm mb-6">Select a note from the sidebar or create a new one</p>
            <button
                onClick={onCreateNote}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
                Create New Note
            </button>
        </div>
    );
};