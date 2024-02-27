import React from "react";
import { toast } from "react-toastify";

const Table = ({ children }) => {
  const headerData = [
    "#",
    "Name",
    "Created at",
    "Updated at",
    "meow",
    "Action",
  ];

  const addClassLevel = () => {
    toast("meow", { type: "info" });
  };

  return (
    <div className="overflow-x-auto">
      <div className="p-3 border">
        <div className="flex justify-between">
          <div className="grid gap-2 grid-cols">
            <h1 className="font-bold">Class Levels</h1>
            <h1 className="text-sm">List of class levels in your app</h1>
          </div>
          <div className="flex">
            <button
              onClick={addClassLevel}
              className="px-3 py-1 mt-auto text-sm font-bold text-white bg-blue-700 border rounded-lg"
            >
              Add class level
            </button>
          </div>
        </div>

        <table className="min-w-full mt-10 bg-white table-auto">
          <thead>
            <tr className="bg-gray-100">
              {headerData.map((data, idx) => (
                <th className="px-6 py-3 text-center">{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
