import { LoadingSpinnerProps } from "@/interfaces";

export const LoadingSpinner = ({
  size = "w-8 h-8",
  color = "border-[#2e2222]",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`}
      ></div>
    </div>
  );
};
