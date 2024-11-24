import { useState } from "react";
import { AiTwotonePushpin } from "react-icons/ai";
import { RiUnpinLine } from "react-icons/ri";
import DeleteBtn from "./DeleteBtn";
import ColorPicker from "./ColorPicker";

type NoteCardProps = {
  note: Note;
  onEdit: () => void;
  onPinToggle: (id: string) => void;
  onColorTheme: (id: string, activeColor: string) => void;
  onDelete: (id: string) => void;
};

export default function NoteCard({
  note,
  onEdit,
  onPinToggle,
  onColorTheme,
  onDelete,
}: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  return (
    <div
      className="relative mt-3 h-fit p-4 pb-2 border rounded shadow-sm cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsTrayOpen(false);
      }}
      onClick={onEdit}
      style={{ backgroundColor: note.choosenColor }}
    >
      <div className="absolute -top-1 right-2 flex items-center">
        {/* Delete Button */}
        <div
          className={`transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <DeleteBtn handleClick={() => onDelete(note.id)} />
        </div>

        {/* Color Picker */}
        <div
          className={`z-50 mt-2 mr-2 transition-opacity duration-300  ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <ColorPicker
            onColorSelect={(activeColor) => onColorTheme(note.id, activeColor)}
            isTrayOpen={isTrayOpen}
            setIsTrayOpen={setIsTrayOpen}
          />
        </div>

        {/* Pin/Unpin Button */}
        <button
          className={`px-2 py-1 mt-2 text-sm rounded  ${
            note.pinned
              ? "bg-yellow-200 text-yellow-700"
              : `bg-gray-200 text-gray-700 transition-opacity duration-300 ${
                  !isHovered && "opacity-0"
                }`
          }`}
          onClick={(e) => {
            onPinToggle(note.id);
            e.stopPropagation();
          }}
        >
          {note.pinned ? <RiUnpinLine /> : <AiTwotonePushpin />}
        </button>
      </div>

      {/* Note Content */}
      <h2 className="font-bold text-lg mt-4">{note.title}</h2>
      <p className="text-sm text-gray-500">{note.tagline}</p>
      <p className="mt-2 break-words">{note.body}</p>
    </div>
  );
}
