import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError: () => void;
}

const GoogleAuthButton = ({ onSuccess, onError }: GoogleLoginButtonProps) => {
  return (
    <div className="flex justify-center rounded-lg">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme={
          localStorage.getItem("theme") === "dark"
            ? "filled_black"
            : "filled_blue"
        }
      />
    </div>
  );
};

export default GoogleAuthButton;
