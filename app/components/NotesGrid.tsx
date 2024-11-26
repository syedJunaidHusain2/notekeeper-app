import NoteCard from "./NoteCard";

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onPinToggle: (id: string) => void;
  onColorTheme: (id: string, color: string) => void;
  onDelete: (id: string) => void;
};

export default function NotesGrid({
  notes,
  onEdit,
  onPinToggle,
  onColorTheme,
  onDelete,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-12 p-0">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onPinToggle={onPinToggle}
          onColorTheme={onColorTheme}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
