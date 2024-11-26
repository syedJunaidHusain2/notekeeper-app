import { FaPen } from "react-icons/fa6";

export default function NotesHeader() {
  return (
    <h1 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-800">
      Notes Keeper <FaPen size={20} />
    </h1>
  );
}
