import { FaRegLightbulb } from "react-icons/fa";

export default function NoNotesPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 h-full mt-7">
      <FaRegLightbulb className="text-6xl mb-4 opacity-30" />
      <p className="text-lg">Notes that you add appear here</p>
    </div>
  );
}
