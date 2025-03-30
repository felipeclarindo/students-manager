export interface NavBarProps {
  active: "Dashboard" | "Home" | "Manager";
}

export interface CustomButtonProps {
  text: string;
  customClass?: string;
  type?: "submit" | "reset";
  onClick?: () => void;
}

export interface StudentProps {
  id: number;
  name: string;
  course: string;
  grade: string;
  period: string;
}
