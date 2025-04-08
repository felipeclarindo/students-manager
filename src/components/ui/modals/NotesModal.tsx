import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NotesModalProps } from "@/interfaces";

export const NotesModal = ({ isOpen, onClose, student }: NotesModalProps) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-normal">
            Notas de <span className="font-bold">{student.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {student.notes && student.notes.length > 0 ? (
            <ul className="list-disc list-inside">
              {student.notes.map((note, index) => (
                <li key={note.id} className="text-gray-700">
                  Nota {index + 1}: {note.value}
                </li>
              ))}
            </ul>
          ) : (
            <p>Esse estudante ainda não possui notas registradas.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
