"use client";

import { CustomButton } from "@/components/CustomButton";
import { NavBar } from "@/components/NavBar";
import { StudentProps } from "@/interfaces";
import { useEffect, useState } from "react";

export default function ManagerPage() {
  const [students, setStudents] = useState<StudentProps[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setStudents(result);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <NavBar active="Manager" />

      <main className="flex justify-center items-center min-h-screen">
        <div className="flex-col items-center justify-center p-10 bg-gray-200 m-4 rounded min-w-[70vw] shadow-lg">
          <div className="flex items-start mb-4">
            <div className="flex-col mr-8 min-w-[220px] p-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Manager
              </h2>
              <hr className="border-t-2 border-black" />
              <div className="flex flex-col mt-4 space-y-2 gap-1">
                <CustomButton text="Add" />
                <CustomButton text="Update" />
                <CustomButton text="Delete" />
              </div>
            </div>

            <div className="flex-grow">
              <div className="border border-gray-400 rounded">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-300">
                    <tr>
                      <td
                        colSpan={6}
                        className="border px-4 py-2 text-center font-bold text-lg"
                      >
                        Students Manager
                      </td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 text-left">ID</th>
                      <th className="border px-4 py-2 text-left">Name</th>
                      <th className="border px-4 py-2 text-left">Course</th>
                      <th className="border px-4 py-2 text-left">Grade</th>
                      <th className="border px-4 py-2 text-left">Period</th>
                      <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="border px-4 py-2 text-center">
                          {student.id}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {student.name}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {student.course}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {student.grade}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {student.period}
                        </td>
                        <td className="border px-4 py-2 max-w-30 text-center">
                          <CustomButton text="Edit" /> {" | "}
                          <CustomButton text="Delete" />
                        </td>
                      </tr>
                    ))}
                    {Array.from({ length: 7 }).map((_, index) => (
                      <tr key={`empty-row-${index}`}>
                        <td className="border px-4 py-2 ">&nbsp;</td>
                        <td className="border px-4 py-2">&nbsp;</td>
                        <td className="border px-4 py-2">&nbsp;</td>
                        <td className="border px-4 py-2">&nbsp;</td>
                        <td className="border px-4 py-2">&nbsp;</td>
                        <td className="border px-4 py-2 max-w-30 text-center">
                          <CustomButton text="Edit" /> {" | "}
                          <CustomButton text="Delete" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
