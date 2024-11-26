import { MdOutlineColorLens } from "react-icons/md";

type ColorPickerProps = {
  onColorSelect: (color: string) => void;
  isTrayOpen: boolean;
  setIsTrayOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorSelect,
  isTrayOpen,
  setIsTrayOpen,
}) => {
  const colors = ["#FFF6E9", "#FFFECB", "#F5EFFF", "#F5EFE6", "#FFFFFF"];
  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsTrayOpen((prev) => !prev);
        }}
        className="text-gray-600 hover:text-gray-900 mt-[2px]"
      >
        <MdOutlineColorLens size={17} />
      </button>

      {/* Color Tray */}
      {isTrayOpen && (
        <div className="absolute top-full -left-28 mt-2 flex space-x-2 p-2 bg-white border rounded shadow-lg z-50">
          {colors.map((color) => (
            <div
              key={color}
              className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
              style={{ backgroundColor: color }}
              onClick={(e) => {
                e.stopPropagation();
                onColorSelect(color);
                setIsTrayOpen(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
