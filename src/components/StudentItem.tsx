"use client";

import { useState } from "react";
import { StudentProps } from "@/interfaces";
import { CustomButton } from "./CustomButton";
import { deleteStudent } from "@/actions/students-actions";
import { EditModal } from "@/components/ui/modals/EditModal";
import { DeleteConfirmation } from "./ui/DeleteConfirmation";
import { NotesModal } from "./ui/modals/NotesModal";

export const StudentItem = ({
  id,
  name,
  course,
  period,
  notes,
  onEdit,
}: StudentProps & { onEdit: () => void }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    onEdit();
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleViewNotes = () => setIsNotesModalOpen(true);

  const confirmDelete = async () => {
    if (id === undefined) {
      alert("Student ID is undefined.");
      return;
    }

    const result = await deleteStudent(id.toString());
    if (result.error) {
      alert(result.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <tr>
        <td className="border px-4 py-2 text-center">{id}</td>
        <td className="border px-4 py-2 text-center">{name}</td>
        <td className="border px-4 py-2 text-center">{course}</td>
        <td className="border px-4 py-2 text-center">{period}</td>
        <td className="border px-4 py-2 text-center">
          <button
            onClick={handleViewNotes}
            className="text-black cursor-pointer underline transition-all duration-300 ease-in-out hover:opacity-40"
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

      {isEditModalOpen && id !== undefined && (
        <EditModal
          isOpenModal={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          student={{ id, name, course, period, notes }}
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
            name: name,
            notes: notes
              ? notes.map((note, index) => ({
                  id: index.toString(),
                  value: note,
                }))
              : undefined,
          }}
          notes={
            notes
              ? notes.map((note, index) => ({
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
