interface Database {
    Note: {
        id: number;
        title: string;
        content: string;
        created_at: Date;
    };
}

export type Note = Database['Note'];

export interface NoteListItemProps {
    note: Note;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface NoteEditorProps {
    note: Note;
    onUpdate: (id: number, newTitle: string, newContent: string) => void;
    onDelete: (id: number) => void;
}