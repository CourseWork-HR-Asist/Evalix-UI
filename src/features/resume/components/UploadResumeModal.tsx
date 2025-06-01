import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ComponentProps } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import FileInput from "../../../components/form/FileInput";
import { useResumeSlice } from "../hooks/useResume";
import { useUserSlice } from "../../authorization/hooks/useUser";
import BaseModal from "../../../components/ui/modals/BaseModal";

interface UploadResumeModalProps {
  open: boolean;
  handler: () => void;
  onSuccess?: () => void;
}

const UploadResumeModal = ({
  open,
  handler,
  onSuccess,
}: UploadResumeModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResumeId, setUploadedResumeId] = useState<string | null>(null);

  const { uploadResume } = useResumeSlice();
  const { user } = useUserSlice();

  const { control, reset, watch } = useForm({
    defaultValues: {
      resumeFile: null,
    },
  });

  const resumeFile = watch("resumeFile");

  const handleUploadResume = async () => {
    if (!resumeFile || !user?.id) return;

    try {
      setIsUploading(true);
      await uploadResume(resumeFile, user.id, (resumeId) => {
        setUploadedResumeId(resumeId);
        reset({ resumeFile: null });
        onSuccess?.();
      });
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    reset({ resumeFile: null });
    setUploadedResumeId(null);
    handler();
  };

  return (
    <BaseModal
      size="md"
      open={open}
      handler={handleClose}
      className="bg-white dark:bg-[#424242] shadow-xl"
      preventOutsideClose={false}
    >
      <DialogHeader className="text-center justify-center text-xl font-bold text-gray-800 dark:text-white" {...materialProps<ComponentProps<typeof DialogHeader>>()}>
        Upload Resume
      </DialogHeader>
      <DialogBody className="px-6 overflow-y-auto" {...materialProps<ComponentProps<typeof DialogBody>>()}>
        {!uploadedResumeId ? (
          <>
            <FileInput
              name="resumeFile"
              label="Upload Resume"
              control={control}
              accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              placeholder="Choose a PDF or DOCX file or drag and drop here"
              rules={{ required: "Please select a resume file" }}
              maxSize={10 * 1024 * 1024} // 10MB
            />
            <div className="flex justify-end">
              <Button
                onClick={handleUploadResume}
                color="teal"
                variant="filled"
                size="lg"
                className="mt-4 px-6 py-3"
                disabled={!resumeFile || isUploading}
                {...materialProps<ComponentProps<typeof Button>>()}
              >
                {isUploading ? "Uploading..." : "Upload Resume"}
              </Button>
            </div>
          </>
        ) : (
          <Card className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" {...materialProps<ComponentProps<typeof Card>>()}>
            <CardBody {...materialProps<ComponentProps<typeof CardBody>>()}>
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-green-600 mr-2" />
                <Typography variant="h6" color="green" {...materialProps<ComponentProps<typeof Typography>>()}>
                  Resume uploaded successfully
                </Typography>
              </div>
              <Button
                onClick={handleClose}
                color="teal"
                variant="filled"
                fullWidth
                size="lg"
                className="py-3"
                {...materialProps<ComponentProps<typeof Button>>()}
              >
                Close
              </Button>
            </CardBody>
          </Card>
        )}
      </DialogBody>
      <DialogFooter
        className="flex justify-end items-center p-4 border-t dark:border-gray-700"
        {...materialProps<ComponentProps<typeof DialogFooter>>()}
      >
        {!uploadedResumeId && (
          <Button
            variant="outlined"
            color="red"
            onClick={handleClose}
            className="px-6"
            size="md"
            {...materialProps<ComponentProps<typeof Button>>()}
          >
            Cancel
          </Button>
        )}
      </DialogFooter>
    </BaseModal>
  );
};

export default UploadResumeModal;
