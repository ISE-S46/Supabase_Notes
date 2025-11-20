import { createClient } from '@supabase/supabase-js';
import type { Note } from '../interfaces/noteTypes';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_KEY!
);

export const noteStorage = {
    loadAll: async (): Promise<Note[]> => {
        try {
            const { data, error } = await supabase
                .from('Note')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return (
                data?.map(n => ({
                    ...n,
                    created_at: new Date(n.created_at),
                })) ?? []
            );
        } catch (err) {
            console.error('Failed to load notes:', err);
            return [];
        }
    },

    save: async (note: Omit<Note, 'id'>): Promise<number | null> => {
        try {
            const { data, error } = await supabase
                .from('Note')
                .insert({
                    title: note.title,
                    content: note.content,
                    created_at: note.created_at,
                })
                .select('*')
                .single();

            if (error) throw error;

            return data.id;
        } catch (err) {
            console.error('Failed to save note:', err);
            return null;
        }
    },

    update: async (id: number, title: string, content: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('Note')
                .update({ title, content })
                .eq('id', id);

            if (error) throw error;

            return true;
        } catch (err) {
            console.error('Failed to update note:', err);
            return false;
        }
    },

    remove: async (id: number): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('Note')
                .delete()
                .eq('id', id);

            if (error) throw error;

            return true;
        } catch (err) {
            console.error('Failed to delete note:', err);
            return false;
        }
    }
};