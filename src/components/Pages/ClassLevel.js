import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
// import axios from "axios";

export const ClassLevel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // const classLevelEndpoint = "";
      // const data = axios.get(classLevelEndpoint);
      // const res = data.data;

      setData([
        {
          id: 1,
          name: "hi1",
          createdAt: "hi2",
          updatedAt: "hi3",
          meow: "hi4",
          meow2: "hi5",
        },
        {
          id: 2,
          name: "hi1",
          createdAt: "hi2",
          updatedAt: "hi3",
          meow: "hi4",
          meow2: "hi5",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center w-full classlevel_main">
      <Table>
        {data.map((dt, idx) => (
          <TableRow key={idx} {...dt} />
        ))}
      </Table>
    </div>
  );
};
