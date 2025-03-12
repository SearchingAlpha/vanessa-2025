"use client";

function Button({ onClick, children }) {
  return (
    <button
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.8)] transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button