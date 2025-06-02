import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Chip,
  Tooltip,
} from "@material-tailwind/react";

import BaseModal from "../../../components/ui/modals/BaseModal";
import { Evaluation } from "../../evaluation/service/type";
import { getScoreInfo } from "../untils/getScoreInfo";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface EvaluationDetailModalProps {
  open: boolean;
  handler: () => void;
  evaluation: Evaluation | null;
}

export function EvaluationDetailModal({
  open,
  handler,
  evaluation,
}: EvaluationDetailModalProps) {
  if (!evaluation) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handler();
  };

  return (
    <BaseModal
      open={open}
      handler={handler}
      size="md"
      preventOutsideClose={false}
    >
      <div onClick={handleModalClick}>
        <DialogHeader
          placeholder=""
          className="flex-col items-start dark:text-gray-300"
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Evaluation Details
        </DialogHeader>
        <DialogBody
          placeholder=""
          className="p-4"
          divider={false}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="space-y-4">
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 dark:text-gray-300"
              >
                Resume
              </Typography>
              <div className="flex items-center gap-2">
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="font-normal dark:text-gray-300"
                >
                  {evaluation.resume?.originalFileName || "Unknown"}
                </Typography>
                {evaluation.resume?.url && (
                  <Tooltip content="Download Resume">
                    <a
                      href={evaluation.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
                    </a>
                  </Tooltip>
                )}
              </div>
            </div>

            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 dark:text-gray-300"
              >
                Score
              </Typography>
              <div className="flex items-center gap-2">
                {getScoreInfo(evaluation.score).icon}
                <Chip
                  value={evaluation.score}
                  size="sm"
                  variant="filled"
                  color={getScoreInfo(evaluation.score).color}
                />
              </div>
            </div>

            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 dark:text-gray-300"
              >
                Comment
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="font-normal whitespace-pre-wrap dark:text-gray-300"
              >
                {evaluation.comment}
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter
          placeholder=""
          className="space-x-2"
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            placeholder=""
            variant="text"
            color="blue-gray"
            onClick={handleCloseClick}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Close
          </Button>
        </DialogFooter>
      </div>
    </BaseModal>
  );
}

export default EvaluationDetailModal;
