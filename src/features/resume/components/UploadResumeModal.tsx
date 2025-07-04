import { useState, useEffect } from "react";
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

interface IUploadResumeForm {
  resumeFile: FileList | null;
}

const UploadResumeModal = ({
  open,
  handler,
  onSuccess,
}: UploadResumeModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResumeId, setUploadedResumeId] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { uploadResume } = useResumeSlice();
  const { user } = useUserSlice();

  const { control, reset, watch } = useForm<IUploadResumeForm>({
    defaultValues: {
      resumeFile: null,
    },
  });

  const resumeFile = watch("resumeFile");

  useEffect(() => {
    const file = resumeFile?.[0];
    if (file && file.type !== "application/pdf") {
      setFileError("Please upload a PDF file only.");
    } else {
      setFileError(null);
    }
  }, [resumeFile]);

  const handleUploadResume = async () => {
    const file = resumeFile?.[0];
    if (!file || !user?.id || fileError) return;

    try {
      setIsUploading(true);
      await uploadResume(file, user.id, (resumeId) => {
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
    setFileError(null);
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
      <DialogHeader
        className="text-center justify-center text-xl font-bold text-gray-800 dark:text-white"
        {...materialProps<ComponentProps<typeof DialogHeader>>()}
      >
        Upload Resume
      </DialogHeader>
      <DialogBody
        className="px-6 overflow-y-auto"
        {...materialProps<ComponentProps<typeof DialogBody>>()}
      >
        {!uploadedResumeId ? (
          <>
            <FileInput
              name="resumeFile"
              label="Upload Resume"
              control={control}
              accept="application/pdf"
              placeholder="Choose a PDF file or drag and drop here"
              rules={{ required: "Please select a resume file" }}
              maxSize={10 * 1024 * 1024} // 10MB
            />
            {fileError && (
              <Typography color="red" className="mt-2 text-sm font-medium">
                {fileError}
              </Typography>
            )}
            <div className="flex justify-end">
              <Button
                onClick={handleUploadResume}
                color="teal"
                variant="filled"
                size="lg"
                className="mt-4 px-6 py-3"
                disabled={!resumeFile?.length || isUploading || !!fileError}
                {...materialProps<ComponentProps<typeof Button>>()}
              >
                {isUploading ? "Uploading..." : "Upload Resume"}
              </Button>
            </div>
          </>
        ) : (
          <Card
            className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            {...materialProps<ComponentProps<typeof Card>>()}
          >
            <CardBody {...materialProps<ComponentProps<typeof CardBody>>()}>
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-green-600 mr-2" />
                <Typography
                  variant="h6"
                  color="green"
                  {...materialProps<ComponentProps<typeof Typography>>()}
                >
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
