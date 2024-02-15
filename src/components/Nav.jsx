import React from "react";

function Nav() {
  return (
    <nav className="bg-gradient-to-r from-indigo-400 to-cyan-400 flex justify-between items-center gap-2 p-4 rounded-md my-4">
      <div className="flex items-center gap-1">
        <img
          src="/inventoryLogo.png"
          alt="Inventory Logo"
          className="bg-white rounded-md p-1 w-12 aspect-square"
        />
        <h1 className="text-3xl font-bold text-white">Inventory</h1>
      </div>
      <span className="bg-white text-black font-semibold text-sm rounded-md px-3 py-1.5">
        Abdul Sadath
      </span>
    </nav>
  );
}

export default Nav;
