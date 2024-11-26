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
    <div className="flex items-center justify-center mt-7 space-x-6">
      {/* Previous Button */}
      <button
        className={`flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full transition-all duration-300 ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-soft-lg  hover:border-gray-600"
        }`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        <FaChevronLeft size={14} className="text-gray-600" />
      </button>

      {/* Page Info */}
      <span className="text-gray-800 text-sm">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        className={`flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-soft-lg hover:border-gray-600"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <FaChevronRight size={14} className="text-gray-600" />
      </button>
    </div>
  );
};

export default PaginationControls;
