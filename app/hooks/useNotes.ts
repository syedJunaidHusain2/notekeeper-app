import { useState, useEffect } from "react";
import { fetchNotes, saveNote, deleteNote } from "../services/noteService";
import { toast } from "sonner";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        toast.error("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadNotes();
  }, []);

  const addOrEditNote = async (note: Note) => {
    setIsLoading(true);
    try {
      const updatedNotes = await saveNote(note);
      setNotes(updatedNotes);
      toast.success(
        note.id ? "Note updated successfully!" : "Note added successfully!"
      );
    } catch (error) {
      toast.error("Failed to save the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNoteById = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedNotes = await deleteNote(id);
      setNotes(updatedNotes);
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (id: string, changes: Partial<Note>) => {
    setIsLoading(true);
    try {
      const noteToUpdate = notes.find((note) => note.id === id);
      if (!noteToUpdate) {
        throw new Error("Note not found");
      }
      const updatedNote = { ...noteToUpdate, ...changes };
      await saveNote(updatedNote);
      const updatedNotes = notes.map((n) =>
        n.id === id ? updatedNote : n
      );
      setNotes(updatedNotes);
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error("Failed to update the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { notes, isLoading, addOrEditNote, deleteNoteById, updateNote };
}
