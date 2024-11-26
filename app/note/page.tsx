"use client";
import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import NotesHeader from "../components/NotesHeader";
import AddNoteBar from "../components/AddNoteBar";
import NotesGrid from "../components/NotesGrid";
import NoteModal from "../components/NoteModal";
import Loader from "../components/Loader";
import PaginationControls from "../components/PaginationControls";

const ITEMS_PER_PAGE = 6;

export default function NotesPage() {
  const { notes, isLoading, addOrEditNote, deleteNoteById, updateNote } =
    useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="p-6 pb-3 flex flex-col justify-between bg-slate-50 h-screen overflow-x-auto">
      <div className="max-w-7xl mx-auto w-full">
        <NotesHeader />

        <AddNoteBar
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          addOrEditNote={addOrEditNote}
        />

        {isLoading ? (
          <div className="w-full mx-auto">
            <Loader />
          </div>
        ) : (
          <NotesGrid
            notes={paginatedNotes}
            onEdit={(note) => {
              setSelectedNote(note);
              setIsModalOpen(true);
            }}
            onPinToggle={(id) =>
              updateNote(id, {
                pinned: !notes.find((n) => n.id === id)?.pinned,
              })
            }
            onColorTheme={(id, color) =>
              updateNote(id, { choosenColor: color })
            }
            onDelete={deleteNoteById}
          />
        )}

        {/* Note Modal */}
        {selectedNote && isModalOpen && (
          <NoteModal
            note={selectedNote}
            onClose={() => setIsModalOpen(false)}
            onSave={addOrEditNote}
          />
        )}

        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
