import React from 'react';
import { Trash2 } from 'lucide-react';
import type { NoteListItemProps } from '../interfaces/noteTypes';
import { formatDateTime } from '../utils/FormatDate';

export const NoteListItem: React.FC<NoteListItemProps> = ({
    note,
    isSelected,
    onSelect,
    onDelete
}) => {
    return (
        <div
            className={`p-4 cursor-pointer border-l-4 transition-colors ${isSelected
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-transparent hover:bg-gray-50'
                }`}
            onClick={() => onSelect(note.id)}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                        {note.title || 'Untitled Note'}
                    </h3>
                    <p className="text-sm text-gray-500 truncate mt-1">
                        {note.content || 'No content'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{formatDateTime(note.created_at)}</p>
                </div>
                {isSelected && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(note.id);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};