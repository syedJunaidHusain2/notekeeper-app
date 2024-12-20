import { useState, useEffect } from "react";
import { toast } from "sonner";

interface NoteModalProps {
  note: Note | null;
  onClose: () => void;
  onSave: (note: Note) => Promise<void>;
}

const MAX_TITLE_LENGTH = 120;
const MAX_TAGLINE_LENGTH = 150;
const MAX_BODY_LENGTH = 500;

export default function NoteInput({ note, onClose, onSave }: NoteModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState(note?.title || "");
  const [tagline, setTagline] = useState(note?.tagline || "");
  const [body, setBody] = useState(note?.body || "");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async () => {
    if (!title || !tagline || !body) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await onSave({
        id: note?.id || "",
        title,
        tagline,
        body,
        pinned: note?.pinned || false,
        choosenColor: note?.choosenColor || "#ffffff",
      });
      handleClose();
    } catch (error) {
      toast.error("Failed to save the note. Please try again.");
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    } else {
      toast.error(`Title cannot exceed ${MAX_TITLE_LENGTH} characters.`);
    }
  };

  const handleTaglineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_TAGLINE_LENGTH) {
      setTagline(e.target.value);
    } else {
      toast.error(`Tagline cannot exceed ${MAX_TAGLINE_LENGTH} characters.`);
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_BODY_LENGTH) {
      setBody(e.target.value);
    } else {
      toast.error(`Body text cannot exceed ${MAX_BODY_LENGTH} characters.`);
    }
  };

  return (
    <div
      className={`${
        note ? "fixed" : "static"
      } inset-0 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 p-3 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white transform transition-transform duration-300 ${
          note && isVisible ? "scale-scale" : `${note && "scale-90"}`
        } ${note ? "md:w-6/12 w-80 rounded-lg p-3 shadow-soft-lg" : "w-full"} `}
      >
        {note && <h2 className="text-lg font-semibold mb-4">Edit Note</h2>}
        <div className={`flex md:space-x-4`}>
          <input
            className="md:flex-grow mb-1 p-2 w-full placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            className="md:flex-shrink-0 md:w-1/3 w-full mb-1 p-2 text-sm placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
            placeholder="Tagline"
            value={tagline}
            onChange={handleTaglineChange}
          />
        </div>
        <textarea
          className={`${
            !note ? "h-auto" : "h-64"
          } w-full mb-1 p-2 text-sm placeholder:font-medium placeholder:text-gray-500 focus:outline-none`}
          placeholder="Body"
          rows={4}
          value={body}
          onChange={handleBodyChange}
        ></textarea>
        <div className="flex font-semibold justify-between text-sm text-gray-600 ">
          <button className="ml-1" onClick={handleClose}>
            Close
          </button>
          <button className="mr-2" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
