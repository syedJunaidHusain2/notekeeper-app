import { useState } from "react";
import Loader from "./Loader";

interface NoteModalProps {
  note: Note | null;
  onClose: () => void;
  onSave: (note: Note) => Promise<void>;
}

export default function NoteModal({ note, onClose, onSave }: NoteModalProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [tagline, setTagline] = useState(note?.tagline || "");
  const [body, setBody] = useState(note?.body || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title || !tagline || !body) {
      alert("All fields are required.");
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        id: note?.id || "",
        title,
        tagline,
        body,
        pinned: note?.pinned || false,
        choosenColor : note?.choosenColor || "#fffff",
      });
      onClose();
    } catch (error) {
      alert("Failed to save the note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`${
        note ? "fixed" : "static"
      } inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div className={`bg-white  rounded  ${note ? "w-96 p-6" : "w-full"} `}>
        <h2 className="text-xl font-bold mb-4">{note && "Edit Note"}</h2>

        {isSaving ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className={`flex md:space-x-4`}>
              <input
                className="md:flex-grow mb-4 p-2 border rounded w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="md:flex-shrink-0 md:w-1/3 w-full mb-4 p-2 border rounded"
                placeholder="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <textarea
              className="w-full mb-4 p-2 border rounded"
              placeholder="Body"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
