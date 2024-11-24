"use client";

import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import Loader from "../components/Loader";
import { fetchNotes, saveNote, deleteNote } from "../services/noteService";
import PaginationControls from "../components/PaginationControls";

const ITEMS_PER_PAGE = 6;

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        // TODO: Add sooner
        // toast.error("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadNotes();
  }, []);

  const handleAddOrEditNote = async (note: Note) => {
    setIsLoading(true);
    try {
      const updatedNotes = await saveNote(note);
      setNotes(updatedNotes);
      setIsModalOpen(false);
      // TODO: Add sooner
      // toast.success(
      //   note.id ? "Note updated successfully!" : "Note added successfully!"
      // );
    } catch (error) {
      // TODO: Add sooner
      // toast.error("Failed to save the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinToggle = async (id: string) => {
    setIsLoading(true);
    try {
      const noteToToggle = notes.find((note) => note.id === id);
      if (!noteToToggle) {
        throw new Error("Note not found");
      }

      const updatedNote = { ...noteToToggle, pinned: !noteToToggle.pinned };
      await saveNote(updatedNote);

      const updatedNotes = notes.map((n) => (n.id === id ? updatedNote : n));
      setNotes(updatedNotes);
      // TODO: Add sooner
      // toast.success("Note pin status updated!");
    } catch (error) {
      console.error("Error updating pin status:", error);
      // TODO: Add sooner
      // toast.error("Failed to update pin status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorTheme = async (id: string, activeColor: string) => {
    setIsLoading(true);
    try {
      const colorSet = notes.find((color) => color.id === id);
      if (!colorSet) {
        throw new Error("Color not found");
      }
      const updatedColor = { ...colorSet, choosenColor: activeColor };
      await saveNote(updatedColor);

      const updatedColors = notes.map((n) => (n.id === id ? updatedColor : n));
      setNotes(updatedColors);
      // TODO: Add sooner
      // toast.success("Color status updated!");
    } catch (error) {
      console.error("Error updating color status:", error);
      // TODO: Add sooner
      // toast.error("Failed to update color status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedNotes = await deleteNote(id);
      setNotes(updatedNotes);
      // TODO: Add sooner
      // toast.success("Note deleted successfully!");
    } catch (error) {
      // TODO: Add sooner
      // toast.error("Failed to delete the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sortedNotes = [
    ...notes.filter((n) => n.pinned),
    ...notes.filter((n) => !n.pinned),
  ];

  const paginatedNotes = sortedNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedNotes.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 h-screen flex flex-col justify-between bg-slate-50">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <div className="mx-auto md:w-6/12 p-4 pt-0 border rounded-lg shadow-lg bg-white mb-5 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
          {!selectedNote && isModalOpen ? (
            <NoteModal
              note={selectedNote}
              onClose={() => setIsModalOpen(false)}
              onSave={handleAddOrEditNote}
            />
          ) : (
            <div
              className="text-gray-600 font-bold pt-4 pl-1"
              onClick={() => {
                setSelectedNote(null);
                setIsModalOpen(true);
              }}
            >
              Take a Note ...
            </div>
          )}
        </div>
        <div className="overflow-y-auto">
        {isLoading ? (
          <div className="h-screen mx-auto">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {paginatedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => {
                  setSelectedNote(note);
                  setIsModalOpen(true);
                }}
                onPinToggle={handlePinToggle}
                onColorTheme={handleColorTheme}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}

        {selectedNote && isModalOpen && (
          <NoteModal
            note={selectedNote}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddOrEditNote}
          />
        )}
        </div>
        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
    </div>
  );
}
