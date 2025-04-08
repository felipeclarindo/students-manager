import { CustomButtonProps } from "@/interfaces";

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <button
      className={`font-bold py-2 px-4 rounded ${
        props.customClass ??
        `${
          props.addClass ?? ""
        }bg-amber-950 hover:bg-amber-900 text-white transition-all duration-300 ease-in-out 
        `
      }`}
      type={props.type ?? "button"}
      onClick={props.onClick}
    >
      <p>{props.text}</p>
    </button>
  );
};
