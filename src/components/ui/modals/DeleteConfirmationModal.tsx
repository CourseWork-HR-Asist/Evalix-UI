import type { ComponentProps } from "react";
import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import BaseModal from "./BaseModal";
import { materialProps } from "../helpers/materialTailwind";


interface DeleteConfirmationModalProps {
  open: boolean;
  handler: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmationModal({
  open,
  handler,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteConfirmationModalProps) {
  return (
    <BaseModal open={open} handler={handler} size="xs">
      <DialogHeader
        className="flex items-center justify-center text-red-500 border-b border-gray-200 dark:border-[#333333] p-4"
        {...materialProps<ComponentProps<typeof DialogHeader>>()}
      >
        <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
        <span>{title}</span>
      </DialogHeader>
      <DialogBody
        className="text-center p-6 dark:text-gray-300"
        divider={false}
        {...materialProps<ComponentProps<typeof DialogBody>>()}
      >
        {message}
      </DialogBody>
      <DialogFooter
        className="flex justify-center gap-4 p-4 border-t border-gray-200 dark:border-[#333333]"
        {...materialProps<ComponentProps<typeof DialogFooter>>()}
      >
        <Button
          className="normal-case dark:text-gray-300"
          variant="outlined"
          color="gray"
          onClick={handler}
          size="sm"
          {...materialProps<ComponentProps<typeof Button>>()}
        >
          Cancel
        </Button>
        <Button
          className="normal-case dark:text-gray-300"
          variant="filled"
          color="red"
          onClick={onConfirm}
          size="sm"
          {...materialProps<ComponentProps<typeof Button>>()}
        >
          Delete
        </Button>
      </DialogFooter>
    </BaseModal>
  );
}
