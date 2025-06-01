import { Typography } from "@material-tailwind/react";
import { UserProfileProps } from "./types";

export const UserProfile = ({
  firstName,
  role,
  className = "",
  showRole = true,
}: UserProfileProps) => {

  return (
    <div>
      <div className={`flex flex-col items-end ${className}`}>
        <Typography
          variant="small"
          className="font-semibold text-gray-900 dark:text-white"
        >
          {firstName}
        </Typography>
        {showRole && role && (
          <Typography
            variant="paragraph"
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {role}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
