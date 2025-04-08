import { useState } from "react";
import { createStudent } from "@/actions/students-actions";
import { CustomButton } from "@/components/CustomButton";
import { StudentProps } from "@/interfaces";
import { ErrorNotification } from "../ErrorNotification";
import { generateId } from "@/lib/utils";

export const AddModal = ({
  isOpenModal,
  onClose,
  onSuccess,
}: {
  isOpenModal: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  const [notesInput, setNotesInput] = useState("");
  const [notes, setNotes] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const student: StudentProps = {
      id: parseInt(generateId()),
      name: (document.getElementById("name") as HTMLInputElement).value,
      course: (document.getElementById("course") as HTMLInputElement).value,
      period: (document.getElementById("period") as HTMLInputElement).value,
      notes: notes.length > 0 ? notes : null,
    };

    await createStudent(student);
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 ${
        isOpenModal ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {errorMessage && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
            <ErrorNotification
              addClass="animate-slide-in w-[300px]"
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-4">Add Student</h2>
          <CustomButton
            addClass="bg-[#2e2222] hover:bg-[#2e2222]"
            text="X"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-black mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-500 rounded-md p-2 w-full"
              placeholder="Enter student name"
              autoFocus
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="course"
              className="block text-sm font-bold text-black mb-1"
            >
              Course
            </label>
            <input
              type="text"
              id="course"
              className="border border-gray-500 rounded-md p-2 w-full"
              placeholder="Enter course name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="period"
              className="block text-sm font-bold text-black mb-1"
            >
              Period
            </label>
            <input
              type="text"
              id="period"
              className="border border-gray-500 rounded-md p-2 w-full"
              placeholder="Enter period type"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-bold text-black mb-1"
            >
              Add Note (numeric)
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
                placeholder="Enter note (0-10)"
                required
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
            <CustomButton text="Add" type="submit" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};
