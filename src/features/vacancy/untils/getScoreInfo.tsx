
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XCircleIcon,
  } from "@heroicons/react/24/outline";
  
  export const getScoreInfo = (score: string) => {
    const numScore = parseInt(score, 10);
  
    if (numScore >= 70) {
      return {
        color: "green" as const,
        icon: <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />,
      };
    } else if (numScore >= 40) {
      return {
        color: "amber" as const,
        icon: <ExclamationCircleIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
      };
    } else {
      return {
        color: "red" as const,
        icon: <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />,
      };
    }
  };
  