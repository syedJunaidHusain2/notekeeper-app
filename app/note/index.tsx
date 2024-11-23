"use client";

import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import Loader from "../components/Loader";
import { fetchNotes, saveNote, deleteNote } from "../services/noteService";
import toast from "react-hot-toast";
import PaginationControls from "./paginationControls";

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
        toast.error("Failed to load notes. Please try again.");
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
      toast.success(
        note.id ? "Note updated successfully!" : "Note added successfully!"
      );
    } catch (error) {
      toast.error("Failed to save the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinToggle = async (id: string) => {
    setIsLoading(true);
    try {
      // Find the note and toggle its pinned status
      const noteToToggle = notes.find((note) => note.id === id);
      if (!noteToToggle) {
        throw new Error("Note not found");
      }
  
      const updatedNote = { ...noteToToggle, pinned: !noteToToggle.pinned };
  
      // Save the updated note to the database
      await saveNote(updatedNote);
  
      // Update the local state
      const updatedNotes = notes.map((n) =>
        n.id === id ? updatedNote : n
      );
      setNotes(updatedNotes);
  
      toast.success("Note pin status updated!");
    } catch (error) {
      console.error("Error updating pin status:", error);
      toast.error("Failed to update pin status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleColorTheme = async (id: string) => {
    setIsLoading(true);
    try {
      const noteToToggle = notes.find((note) => note.id === id);
      if (!noteToToggle) {
        throw new Error("Note not found");
      }
      const updatedNote = { ...noteToToggle, pinned: !noteToToggle.pinned };
  
      // Save the updated note to the database
      await saveNote(updatedNote);
  
      // Update the local state
      const updatedNotes = notes.map((n) =>
        n.id === id ? updatedNote : n
      );
      setNotes(updatedNotes);
  
      toast.success("Note pin status updated!");
    } catch (error) {
      console.error("Error updating pin status:", error);
      toast.error("Failed to update pin status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
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
    <div className="p-6 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      <div className="mx-auto w-6/12 p-4 pt-0 border rounded-lg shadow-lg bg-white mb-5 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
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

      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </>
      )}

      <div className="mt-auto">
        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {selectedNote && isModalOpen && (
        <NoteModal
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddOrEditNote}
        />
      )}
    </div>
  );
}
