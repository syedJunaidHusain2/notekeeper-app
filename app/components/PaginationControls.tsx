import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-center mt-7 space-x-4" >
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        <FaChevronLeft size={16} />
      </button>
      <span className="text-gray-700 font-medium text-sm">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

export default PaginationControls;
