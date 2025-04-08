import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NotesModalProps } from "@/interfaces";

export const NotesModal = ({
  isOpen,
  onClose,
  student,
  notes,
}: NotesModalProps) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notas de {student.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {student.notes && student.notes.length > 0 ? (
            <ul className="list-disc list-inside">
              {notes?.map((note) => (
                <li key={note.id} className="text-gray-700">
                  Nota: {note.value}
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
