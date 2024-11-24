type DeleteBtnProps = {
  handleClick: () => void; 
};

const DeleteBtn: React.FC<DeleteBtnProps> = ({ handleClick }) => {
  return (
    <button
      className="group relative flex h-10 w-8 flex-col items-center justify-center overflow-hidden"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); 
        handleClick(); 
      }}
    >
      <svg
        viewBox="0 0 1.625 1.625"
        className="absolute -top-7 fill-gray-500 delay-100 group-hover:top-4 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
        height="11"
        width="11"
      >
        <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
        <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
        <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
      </svg>
      <svg
        width="13"
        fill="none"
        viewBox="0 0 39 7"
        className="origin-right duration-500 group-hover:rotate-90"
      >
        <line strokeWidth="4" stroke="gray" y2="5" x2="39" y1="5"></line>
        <line
          strokeWidth="3"
          stroke="gray"
          y2="1.5"
          x2="26.0357"
          y1="1.5"
          x1="12"
        ></line>
      </svg>

      <svg width="11" fill="none" viewBox="0 0 33 39" className="">
        <mask fill="white" id="path-1-inside-1_8_19">
          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
        </mask>
        <path
          mask="url(#path-1-inside-1_8_19)"
          fill="gray"
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
        ></path>
        <path strokeWidth="4" stroke="gray" d="M12 6L12 29"></path>
        <path strokeWidth="4" stroke="gray" d="M21 6V29"></path>
      </svg>
    </button>
  );
};

export default DeleteBtn;