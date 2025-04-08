import { DeleteConfirmationProps } from "@/interfaces";
import { CustomButton } from "@/components/CustomButton";

export const DeleteConfirmation = ({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete this student?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <CustomButton
            text="Delete"
            onClick={onConfirm}
            customClass="bg-red-500 hover:bg-red-600 text-white"
          />
          <CustomButton
            text="Cancel"
            onClick={onCancel}
            customClass="bg-gray-300 hover:bg-gray-400 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};
