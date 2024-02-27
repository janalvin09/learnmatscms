import React from "react";
import { toast } from "react-toastify";

const TableRow = ({ id, name, createdAt, updatedAt, meow, meow2 }) => {
  const editData = () => {
    toast("Show popup modal?", { type: "success" });
  };

  const deleteData = () => {
    toast(`Class level with the id of ${id} deleted`, { type: "success" });
  };

  return (
    <tr className="text-center border-b border-gray-200">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{createdAt}</td>
      <td className="px-6 py-4">{updatedAt}</td>
      <td className="px-6 py-4">{meow}</td>
      <td className="px-6 py-4">{meow2}</td>
      <td className="px-6 py-4 text-blue-500">
        <div className="flex gap-5">
          <p onClick={editData} className="text-blue-500 cursor-pointer">
            Edit
          </p>
          <p onClick={deleteData} className="text-red-500 cursor-pointer">
            Delete
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
