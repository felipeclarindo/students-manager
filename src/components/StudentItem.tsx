"use client";

import { useState } from "react";
import { StudentProps } from "@/interfaces";
import { CustomButton } from "./CustomButton";
import { deleteStudent } from "@/actions/students-actions";
import { EditModal } from "@/components/ui/modals/EditModal";
import { DeleteConfirmation } from "./ui/DeleteConfirmation";
import { NotesModal } from "./ui/modals/NotesModal";

export const StudentItem = (student: StudentProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleViewNotes = () => setIsNotesModalOpen(true);

  const confirmDelete = async () => {
    if (student.id === undefined) {
      alert("Student ID is undefined.");
      return;
    }

    const result = await deleteStudent(student.id.toString());
    if (result.error) {
      alert(result.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <tr>
        <td className="border px-4 py-2 text-center">{student.id}</td>
        <td className="border px-4 py-2 text-center">{student.name}</td>
        <td className="border px-4 py-2 text-center">{student.course}</td>
        <td className="border px-4 py-2 text-center">{student.period}</td>
        <td className="border px-4 py-2 text-center">
          <button
            onClick={handleViewNotes}
            className="text-blue-600 hover:underline"
          >
            Ver Notas
          </button>
        </td>
        <td className="border px-4 py-2 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton text="Edit" onClick={handleEditClick} />
            <CustomButton text="Delete" onClick={handleDeleteClick} />
          </div>
        </td>
      </tr>

      {isEditModalOpen && student.id !== undefined && (
        <EditModal
          isOpenModal={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          studentId={student.id}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmation
          onConfirm={() => {
            confirmDelete();
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isNotesModalOpen && (
        <NotesModal
          isOpen={isNotesModalOpen}
          onClose={() => setIsNotesModalOpen(false)}
          student={{
            name: student.name,
            notes: student.notes
              ? student.notes.map((note, index) => ({
                  id: index.toString(),
                  value: note,
                }))
              : undefined,
          }}
          notes={
            student.notes
              ? student.notes.map((note, index) => ({
                  id: index.toString(),
                  value: note,
                }))
              : undefined
          }
        />
      )}
    </>
  );
};
