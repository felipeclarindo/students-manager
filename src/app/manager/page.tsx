"use client";

import { useState, useEffect } from "react";
import { CustomButton } from "@/components/CustomButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NavBar } from "@/components/NavBar";
import { StudentItem } from "@/components/StudentItem";
import { ErrorNotification } from "@/components/ui/ErrorNotification";
import { AddModal } from "@/components/ui/modals/AddModal";
import { SuccessNotification } from "@/components/ui/SuccessNotification";
import { StudentProps } from "@/interfaces";
import { useStudents } from "@/actions/students-actions";

export default function ManagerPage() {
  const { students, loading, error, setError, fetchStudents } = useStudents();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProps | null>(
    null
  );
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleViewNotes = (student: StudentProps) => {
    setSelectedStudent(student);
    setIsNotesModalOpen(true);
  };
  
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleStudentAdded = async () => {
    await fetchStudents();
    setIsAddModalOpen(false);
    setShowSuccess(true);
    setSuccessVisible(true);

    setTimeout(() => {
      setSuccessVisible(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 500);
    }, 2000);
  };

  return (
    <>
      <NavBar active="Manager" />
      <main className="flex justify-center items-center min-h-[70vh]">
        <div className="flex-col items-center justify-center p-10 bg-gray-200 m-4 rounded min-w-[70vw] shadow-lg">
          <div className="flex items-start mb-4">
            <div className="flex-col mr-8 min-w-[220px] p-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Manager
              </h2>
              <hr className="border-t-2 border-black" />
              <div className="flex flex-col mt-4 space-y-2 gap-1">
                <CustomButton text="Add" onClick={handleAddClick} />
              </div>
            </div>
            <div className="flex-grow">
              <div className="border border-gray-400 rounded">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-300">
                    <tr>
                      <th
                        colSpan={6}
                        className="border px-4 py-2 text-center font-bold text-lg"
                      >
                        Students Registers
                      </th>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 text-left">ID</th>
                      <th className="border px-4 py-2 text-left">Name</th>
                      <th className="border px-4 py-2 text-left">Course</th>
                      <th className="border px-4 py-2 text-left">Period</th>
                      <th className="border px-4 py-2 text-left">Notes</th>
                      <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      if (loading) {
                        return (
                          <tr>
                            <td colSpan={6} className="text-center py-4">
                              <LoadingSpinner />
                            </td>
                          </tr>
                        );
                      }
                      if (students && students.length > 0) {
                        return students.map((student: StudentProps) => (
                          <StudentItem key={student.id} {...student} />
                        ));
                      }
                      return (
                        <tr>
                          <td colSpan={6} className="text-center px-4 py-2">
                            No students found.
                          </td>
                        </tr>
                      );
                    })()}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 ml-2">
                {error && (
                  <ErrorNotification
                    addClass="ml-4"
                    message={error}
                    onClose={() => setError(null)}
                  />
                )}
                {showSuccess && (
                  <SuccessNotification
                    addClass={`ml-4 transition-opacity duration-500 ${
                      successVisible ? "opacity-100" : "opacity-0"
                    }`}
                    message="Student added successfully!"
                    onClose={() => setShowSuccess(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {isAddModalOpen && (
        <AddModal
          isOpenModal={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleStudentAdded}
        />
      )}
    </>
  );
}
