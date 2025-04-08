import { MouseEvent } from "react";

export interface EditModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  student: StudentProps;
  onSuccess?: () => void;
}

export interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    name: string;
    notes?: { id: string; value: number }[];
  };
  notes?: { id: string; value: number }[];
}

export interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface NavBarProps {
  active: "Dashboard" | "Home" | "Manager";
}

export interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
  addClass?: string;
  duration?: number;
}

export interface CustomButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  customClass?: string;
  addClass?: string;
}

export interface StudentProps {
  id: number;
  name: string;
  course: string;
  period: string;
  notes: number[] | null;
}

export interface LoadingSpinnerProps {
  size?: string;
  color?: string;
}
