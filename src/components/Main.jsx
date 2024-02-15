import React, { useEffect, useRef, useState } from "react";
import Tr from "./Tr";

function Main() {
  const [showBtns, setShowBtns] = useState(false);
  const [inventoryArr, setInventoryArr] = useState([]);
  const [stoageStatus, setStoageStatus] = useState("");
  const [enterOrUpdate, setEnterOrUpdate] = useState("Enter");
  const [index, setIndex] = useState(null);

  const panel = useRef(null);
  const formRef = useRef(null);
  const storageRef = useRef(null);
  const quantityRef = useRef(null);
  const statusRef = useRef(null);
  const supplierRef = useRef(null);
  const onDateRef = useRef(null);

  useEffect(() => {
    setInventoryArr(
      localStorage.inventory
        ? JSON.parse(localStorage.getItem("inventory"))
        : []
    );
  }, [localStorage.inventory]);

  // console.log(inventoryArr);

  function setLsInventory(val) {
    return localStorage.setItem("inventory", JSON.stringify(val));
  }

  function handleDataInput() {
    panel.current.classList.toggle("hidden");
    panel.current.classList.toggle("flex");
    if (panel.current.classList.contains("flex")) storageRef.current.focus();
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (enterOrUpdate === "Enter") {
      const detailsRowObj = {
        id: Date.now(),
        storage: storageRef.current.value,
        quantity: quantityRef.current.value,
        supplier: supplierRef.current.value,
        status: statusRef.current.value,
        onDate: onDateRef.current.value.split("-").reverse().join("-"),
      };

      if (localStorage.inventory) {
        if (storageRef.current.value === "") {
          handleDataInput();
          return;
        }
        setInventoryArr(inventoryArr.push(detailsRowObj));
        setLsInventory(inventoryArr);
      } else setLsInventory([detailsRowObj]);
    } else {
      const toUpdate = inventoryArr[index];
      toUpdate.storage = storageRef.current.value;
      toUpdate.quantity = quantityRef.current.value;
      toUpdate.supplier = supplierRef.current.value;
      toUpdate.status = statusRef.current.value;
      toUpdate.onDate = onDateRef.current.value.split("-").reverse().join("-");

      if (storageRef.current.value === "") {
        handleDataInput();
        return;
      }
      setInventoryArr((inventoryArr[index] = toUpdate));
      setLsInventory(inventoryArr);
    }

    formRef.current.reset();
    handleDataInput();
  }

  return (
    <>
      <div
        ref={panel}
        className="fixed w-full h-screen p-2 bg-[#00000070] hidden items-start justify-center z-10 overflow-auto"
      >
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="bg-white w-full max-w-[500px] rounded-lg overflow-hidden flex flex-col gap-3 p-4"
        >
          <div className="flex justify-end">
            <button
              type="reset"
              className="bg-gray-200 p-2 font-bold w-10 rounded-md"
              onClick={handleDataInput}
            >
              X
            </button>
          </div>
          <label htmlFor="storage" className="grid font-semibold gap-1">
            Storage
            <input
              ref={storageRef}
              type="text"
              id="storage"
              className="border-2 border-gray-200 rounded-md p-2"
              placeholder="Ex: Books, Electronics etc..."
            />
          </label>
          <label htmlFor="quantity" className="grid font-semibold gap-1">
            Quantity
            <input
              ref={quantityRef}
              type="text"
              id="quantity"
              className="border-2 border-gray-200 rounded-md p-2"
              placeholder="Ex: 210 packages"
            />
          </label>
          <label htmlFor="status" className="grid font-semibold gap-1">
            Status
            <select
              ref={statusRef}
              id="status"
              className="border-2 border-gray-200 rounded-md p-2"
              placeholder="Ex: 200 Packs"
              onChange={(e) => {
                setStoageStatus(e.target.value);
              }}
            >
              <option value="">-- Select --</option>
              <option value="Pending">Pending</option>
              <option value="Imported">Imported</option>
              <option value="Exported">Exported</option>
              <option value="Transported">Transported</option>
            </select>
          </label>
          <label htmlFor="onDate" className="grid gap-1 font-semibold w-full">
            Date:
            <input
              ref={onDateRef}
              type="date"
              id="onDate"
              className="border-2 border-gray-200 rounded-md p-2 disabled:bg-gray-100 disabled:text-gray-300"
              placeholder="Ex: 200 Packs"
              disabled={stoageStatus === "Pending" ? true : false}
            />
          </label>
          <label htmlFor="supplier" className="grid font-semibold gap-1">
            Supplier
            <input
              ref={supplierRef}
              type="text"
              id="supplier"
              className="border-2 border-gray-200 rounded-md p-2"
              placeholder="Supplier Name"
            />
          </label>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <input
              type="reset"
              value="Reset"
              className="border-2 border-blue-500 text-blue-500 rounded-md py-2 font-semibold active:scale-[0.99] duration-100"
            />
            <button
              type="reset"
              className="border-2 border-gray-400 text-gray-500 rounded-md py-2 font-semibold active:scale-[0.99] duration-100"
              onClick={handleDataInput}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-2 border-blue-500 bg-blue-500 text-white rounded-md py-2 font-semibold active:scale-[0.99] duration-100"
              onClick={handleFormSubmit}
            >
              {enterOrUpdate}
            </button>
          </div>
        </form>
      </div>

      <main className="grow flex flex-col gap-2 p-4 rounded-md">
        <div className="flex justify-between">
          <h5 className="text-lg font-bold">
            Date:&nbsp;
            <span className="font-semibold">
              {new Date().toJSON().slice(0, 10).split("-").reverse().join("-")}
            </span>
          </h5>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-md px-3 py-1 shadow-md bg-gradient-to-tl from-indigo-400 to-cyan-400 text-white font-bold active:scale-[0.99] duration-100"
              onClick={() => {
                handleDataInput();
                setEnterOrUpdate("Enter");
              }}
            >
              Insert Data
            </button>
            <span className="bg-white">
              <button
                type="button"
                className="w-full h-full cursor-pointer rounded-md px-2 py-1 shadow-md border bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold active:scale-[0.99] duration-100"
                onClick={() => {
                  setShowBtns(!showBtns);
                }}
              >
                {showBtns ? "Cancel" : "Manage"}
              </button>
            </span>
            <span className="bg-white">
              <button
                type="button"
                className="w-full h-full cursor-pointer rounded-md px-2 py-1 shadow-md border bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold active:scale-[0.99] duration-100"
                onClick={() => {
                  setShowBtns(false);
                  setTimeout(() => {
                    var printContents =
                      document.getElementById("tableDataContainer").innerHTML;
                    // var originalContents = document.body.innerHTML;
                    document.body.innerHTML = printContents;
                    window.print();
                    // document.body.innerHTML = originalContents;
                    location.reload();
                  }, 10);
                }}
              >
                Print
              </button>
            </span>
          </div>
        </div>

        <div
          id="tableDataContainer"
          className="border border-gray-800 bg-white shadow-md rounded-lg mt-2 p-4"
        >
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="font-medium dark:border-red-500">
                      <tr className="border-b border-gray-800">
                        <th scope="col" className="whitespace-nowrap px-4 py-3">
                          #
                        </th>
                        <th scope="col" className="whitespace-nowrap px-4 py-3">
                          Storage
                        </th>
                        <th scope="col" className="whitespace-nowrap px-4 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="whitespace-nowrap px-4 py-3">
                          Status
                        </th>
                        <th scope="col" className="whitespace-nowrap px-4 py-3">
                          On Date
                        </th>
                        <th scope="col" className="whitespace-nowrap px-4 py-3">
                          Supplier
                        </th>
                        {showBtns &&
                          localStorage.inventory !== "[]" &&
                          inventoryArr.length !== 0 && (
                            <th
                              scope="col"
                              className="whitespace-nowrap px-0 py-2"
                            >
                              <div className="grid">
                                <button
                                  className="text-white font-semibold bg-red-500 py-1 px-2 rounded-md active:scale-[0.95] duration-100"
                                  onClick={() => {
                                    if (
                                      confirm(
                                        "ARE YOU SURE ? \nyou want to delete all the data from your store. \n\n!! WARNING !! \nDeleteing data cannot be undone, whole inventory data should be deleted!"
                                      )
                                    ) {
                                      setInventoryArr([]); // Empty an array like the given way as well. // inventoryArr.splice(0, inventoryArr.length)
                                      setLsInventory([]);
                                    }
                                  }}
                                >
                                  Delete All
                                </button>
                              </div>
                            </th>
                          )}
                      </tr>
                    </thead>

                    <tbody>
                      {inventoryArr.length ? (
                        inventoryArr.map((data, i) => {
                          return (
                            <Tr
                              key={i}
                              Sno={i + 1}
                              Storage={data.storage}
                              Quantity={data.quantity}
                              Status={data.status}
                              Supplier={data.supplier}
                              OnDate={
                                data.status === "Pending" ? "-" : data.onDate
                              }
                              className="last:border-none"
                              edFun={() => {
                                setIndex(i);
                                handleDataInput();
                                (storageRef.current.value =
                                  inventoryArr[i].storage),
                                  (quantityRef.current.value =
                                    inventoryArr[i].quantity),
                                  (supplierRef.current.value =
                                    inventoryArr[i].supplier),
                                  (statusRef.current.value =
                                    inventoryArr[i].status),
                                  (onDateRef.current.value = inventoryArr[
                                    i
                                  ].onDate
                                    .split("-")
                                    .reverse()
                                    .join("-"));

                                if (enterOrUpdate === "Enter")
                                  setEnterOrUpdate("Update");
                              }}
                              showDelBtnTd={showBtns}
                              delFun={() => {
                                const invenArr = inventoryArr.filter(
                                  (tRow) => tRow.id !== inventoryArr[i].id
                                );
                                setInventoryArr(invenArr);
                                setLsInventory(invenArr);
                              }}
                            />
                          );
                        })
                      ) : (
                        <Tr
                          key={"demo"}
                          Sno={1}
                          Storage={"Books"}
                          Quantity={"170 copies"}
                          Supplier={"John Doe"}
                          Status={"Imported"}
                          OnDate={"01-02-2024"}
                          className="text-gray-400 last:border-none"
                        />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
