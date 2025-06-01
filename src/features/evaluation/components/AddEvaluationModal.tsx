import { useState, useEffect } from "react";
import type { ComponentProps } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Card,
  CardBody,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
// FromSelect removed as we're now using FormApiSelect
import FormApiSelect from "../../../components/form/FormApiSelect";
import FileInput from "../../../components/form/FileInput";
import { useResumeSlice } from "../../resume/hooks/useResume";
import { useEvaluationSlice } from "../hooks/useEvaluation";
import { useUserSlice } from "../../authorization/hooks/useUser";
import BaseModal from "../../../components/ui/modals/BaseModal";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";

interface AddEvaluationModalProps {
  open: boolean;
  handler: () => void;
  vacancyId: string;
  onSuccess?: () => void;
}

const AddEvaluationModal = ({
  open,
  handler,
  vacancyId,
  onSuccess,
}: AddEvaluationModalProps) => {
  const [resumeSource, setResumeSource] = useState<"upload" | "existing">(
    "upload"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResumeId, setUploadedResumeId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { loading, uploadResume } = useResumeSlice();
  const { addEvaluation } = useEvaluationSlice();
  const { user } = useUserSlice();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      resumeId: "",
      resumeFile: null,
    },
  });

  const resumeFile = watch("resumeFile");
  const selectedResumeId = watch("resumeId");

  // We don't need to fetch resumes separately as FormApiSelect does this for us
  // Removed fetchResumes callback

  useEffect(() => {
    if (open) {
      // No need to fetch resumes as FormApiSelect handles this
      reset();
      setUploadedResumeId(null);
      setIsAnalyzing(false);
      setResumeSource("upload");
    }
  }, [open, reset]);

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

  const startAnalysis = async (resumeId: string) => {
    if (!resumeId || !vacancyId) return;

    try {
      setIsAnalyzing(true);
      await addEvaluation({ resumeId, vacancyId });
      handler(); // Close modal
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating evaluation:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSubmitExisting = handleSubmit(async (data) => {
    await startAnalysis(data.resumeId);
  });

  return (
    <BaseModal
      size="md"
      open={open}
      handler={handler}
      className="bg-white shadow-xl dark:bg-[#2A2A2A]"
    >
      <DialogHeader
        className="text-center justify-center text-xl font-bold text-gray-800 dark:text-gray-100"
        {...materialProps<ComponentProps<typeof DialogHeader>>()}
      >
        Add Evaluation
      </DialogHeader>
      <DialogBody
        className="px-6 overflow-y-auto"
        {...materialProps<ComponentProps<typeof DialogBody>>()}
      >
        <div className="mb-6 dark:text-gray-200">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-3 dark:text-gray-300"
            {...materialProps<ComponentProps<typeof Typography>>()}
          >
            Resume Source
          </Typography>
          <div className="flex flex-col gap-4 dark:text-gray-300">
            <div className="flex items-center">
              <Radio
                name="resumeSource"
                color="teal"
                checked={resumeSource === "upload"}
                onChange={() => setResumeSource("upload")}
                label="Upload New Resume"
                containerProps={{
                  className: "p-1",
                }}
                labelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
                {...materialProps<ComponentProps<typeof Radio>>()}
              />
            </div>
            <div className="flex items-center">
              <Radio
                name="resumeSource"
                color="teal"
                checked={resumeSource === "existing"}
                onChange={() => setResumeSource("existing")}
                label="Select Existing Resume"
                containerProps={{
                  className: "p-1",
                }}
                labelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
                {...materialProps<ComponentProps<typeof Radio>>()}
              />
            </div>
          </div>
        </div>

        {resumeSource === "upload" && (
          <div className="mt-4">
            {!uploadedResumeId ? (
              <>
                <FileInput
                  name="resumeFile"
                  label="Upload Resume"
                  control={control}
                  accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  placeholder="Choose a PDF or DOCX file or drag and drop here"
                  rules={{
                    required:
                      resumeSource === "upload"
                        ? "Please select a resume file"
                        : false,
                  }}
                  maxSize={10 * 1024 * 1024} // 10MB
                />
              </>
            ) : (
              <Card
                className="p-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                {...materialProps<ComponentProps<typeof Card>>()}
              >
                <CardBody {...materialProps<ComponentProps<typeof CardBody>>()}>
                  <div className="flex items-center dark:text-gray-200">
                    <DocumentTextIcon className="h-6 w-6 text-green-600 dark:text-green-500 mr-2" />
                    <Typography
                      variant="h6"
                      color="green"
                      {...materialProps<ComponentProps<typeof Typography>>()}
                    >
                      Resume uploaded successfully
                    </Typography>
                  </div>
                  {/* Start Analysis button moved to footer */}
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {resumeSource === "existing" && (
          <div className="mt-4 dark:text-gray-300">
            <div className="mb-4">
              <FormApiSelect
                name="resumeId"
                label="Select Resume"
                control={control}
                placeholder="Select a resume"
                path={`/resumes/v1/resume/get-by-user-id/${user?.id}`}
                rules={{
                  required:
                    resumeSource === "existing"
                      ? "Please select a resume"
                      : false,
                }}
                mapOption={(resume) => ({
                  label: resume.fileName || "Unnamed Resume",
                  value: resume.id,
                })}
              />
            </div>
            {loading && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Loading resumes...
              </p>
            )}
            {/* Start Analysis button moved to footer */}
          </div>
        )}
      </DialogBody>
      <DialogFooter
        className="flex justify-between items-center p-4 border-t dark:border-[#333333]"
        {...materialProps<ComponentProps<typeof DialogFooter>>()}
      >
        <Button
          variant="outlined"
          color="red"
          onClick={handler}
          className="px-6"
          size="md"
          {...materialProps<ComponentProps<typeof Button>>()}
        >
          Close
        </Button>
        {resumeSource === "upload" && !uploadedResumeId && (
          <Button
            onClick={handleUploadResume}
            color="teal"
            variant="filled"
            size="md"
            className="px-6"
            disabled={!resumeFile || isUploading}
            {...materialProps<ComponentProps<typeof Button>>()}
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
        )}
        {resumeSource === "upload" && uploadedResumeId && (
          <Button
            onClick={() => startAnalysis(uploadedResumeId)}
            color="teal"
            variant="filled"
            size="md"
            className="px-6"
            disabled={isAnalyzing}
            {...materialProps<ComponentProps<typeof Button>>()}
          >
            {isAnalyzing ? "Analyzing..." : "Start Analysis"}
          </Button>
        )}
        {resumeSource === "existing" && (
          <Button
            onClick={onSubmitExisting}
            color="teal"
            variant="filled"
            size="md"
            className="px-6"
            disabled={!selectedResumeId || isAnalyzing}
            {...materialProps<ComponentProps<typeof Button>>()}
          >
            {isAnalyzing ? "Analyzing..." : "Start Analysis"}
          </Button>
        )}
      </DialogFooter>
    </BaseModal>
  );
};

export default AddEvaluationModal;
