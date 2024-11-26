import NoteModal from "./NoteModal";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedNote: Note | null; 
  setSelectedNote: (note: Note | null) => void;
  addOrEditNote: (note: Note) => Promise<void>; 
};

export default function AddNoteBar({
  isModalOpen,
  setIsModalOpen,
  selectedNote,
  setSelectedNote,
  addOrEditNote,
}: Props) {
  return (
    <div
      className={`mx-auto md:w-6/12 w-full border rounded-lg shadow-soft-lg bg-white mb-5 cursor-pointer ${
        !selectedNote &&
        !isModalOpen &&
        "transform transition-transform duration-300 ease-in-out hover:scale-102"
      }`}
    >
      {!selectedNote && isModalOpen ? (
        <NoteModal
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onSave={addOrEditNote}
        />
      ) : (
        <div
          className="text-gray-500 font-semibold p-3 pl-4"
          onClick={() => {
            setSelectedNote(null);
            setIsModalOpen(true);
          }}
        >
          Take a Note ...
        </div>
      )}
    </div>
  );
}
