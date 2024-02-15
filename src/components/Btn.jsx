import React, { forwardRef } from "react";

function Btn({ children, className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`rounded-md px-4 py-2 bg-white text-black font-bold active:scale-[0.99] duration-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default forwardRef(Btn);
