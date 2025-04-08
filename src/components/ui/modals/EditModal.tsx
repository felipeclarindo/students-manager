"use client";

import { useEffect, useState } from "react";
import { EditModalProps, StudentProps } from "@/interfaces";
import { editStudent } from "@/actions/students-actions";
import { CustomButton } from "@/components/CustomButton";
import { ErrorNotification } from "@/components/ui/ErrorNotification";
import { SuccessNotification } from "@/components/ui/SuccessNotification";
import { getChangedFields } from "@/utils/compareObjects";

export const EditModal = ({
  isOpenModal,
  onClose,
  student,
  onSuccess,
}: EditModalProps) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState<number[]>([]);
  const [notesInput, setNotesInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpenModal && student) {
      setName(student.name || "");
      setCourse(student.course || "");
      setPeriod(student.period || "");
      setNotes(Array.isArray(student.notes) ? student.notes : []);
      setNotesInput("");
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpenModal, student]);

  const handleAddNote = () => {
    const parsed = parseFloat(notesInput);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) {
      setNotes((prev) => [...prev, parsed]);
      setNotesInput("");
      setErrorMessage(null);
    } else {
      setErrorMessage("Please enter a valid number between 0 and 10.");
    }
  };

  const handleRemoveNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    const updatedData: StudentProps = {
      ...student,
      name,
      course,
      period,
      notes,
    };

    const changes = getChangedFields(student, updatedData);

    if (Object.keys(changes).length === 0) {
      setErrorMessage("No changes detected.");
      return;
    }

    try {
      const result = await editStudent(student.id.toString(), changes);
      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage("Student updated successfully!");
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1000);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  // ⛔ evita renderizar o modal se não for necessário
  if (!isOpenModal || !student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {errorMessage && (
          <ErrorNotification
            addClass="absolute top-2 left-1/2 transform -translate-x-1/2 z-50"
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}

        {successMessage && (
          <SuccessNotification
            addClass="absolute top-2 left-1/2 transform -translate-x-1/2 z-50"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Student</h2>
          <CustomButton
            addClass="bg-[#2e2222] hover:bg-[#2e2222]"
            text="X"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-bold mb-1">
              Course
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="period" className="block text-sm font-bold mb-1">
              Period
            </label>
            <input
              type="text"
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-bold mb-1">
              Add Note (0-10)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="notes"
                min={0}
                max={10}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="border border-gray-500 rounded-md p-2 w-full"
              />
              <CustomButton text="+" onClick={handleAddNote} type="button" />
            </div>
            <ul className="mt-2">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded mt-1"
                >
                  <span>{note}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveNote(index)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <CustomButton text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
