import React from "react";

function Tr({
  Sno,
  Storage,
  Quantity,
  Status,
  Supplier,
  OnDate,
  showDelBtnTd,
  className = "",
  edFun = () => {},
  delFun = () => {},
}) {
  return (
    <tr className={`border-b dark:border-neutral-500 ${className}`}>
      <td className="whitespace-nowrap px-4 py-3 font-medium">{Sno}</td>
      <td className="whitespace-nowrap px-4 py-3">{Storage}</td>
      <td className="whitespace-nowrap px-4 py-3">{Quantity}</td>
      <td className="whitespace-nowrap px-4 py-3">{Status}</td>
      <td className="whitespace-nowrap px-4 py-3">{OnDate}</td>
      <td className="whitespace-nowrap px-4 py-3">{Supplier}</td>

      {showDelBtnTd && (
        <td className="whitespace-nowrap">
          <div className="grid grid-cols-2 gap-2 items-center">
            <button
              type="button"
              className="text-blue-500 font-semibold bg-blue-100 p-1 px-2 rounded-md active:scale-[0.95] duration-100"
              onClick={edFun}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-red-500 font-semibold bg-red-100 p-1 px-2 rounded-md active:scale-[0.95] duration-100"
              onClick={delFun}
            >
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

export default Tr;
