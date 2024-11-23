"use client";

import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import Loader from "../components/Loader"; // Assuming you have a Loader component
import { fetchNotes, saveNote, deleteNote } from "../services/noteService";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false); // For global loading
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
      toast.success(note.id ? "Note updated successfully!" : "Note added successfully!");
    } catch (error) {
      toast.error("Failed to save the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinToggle = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedNotes = notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      );
      setNotes(updatedNotes);
      toast.success("Note pin status updated!");
    } catch (error) {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          setSelectedNote(null);
          setIsModalOpen(true);
        }}
      >
        Add Note
      </button>

      {isLoading ? (
        <Loader /> // Display loader during global loading
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {isModalOpen && (
        <NoteModal
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddOrEditNote}
        />
      )}
    </div>
  );
}
