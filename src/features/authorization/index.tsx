import { Typography, Card } from "@material-tailwind/react";
import { CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import GoogleAuthButton from "./components/GoogleAuthButton";
import { useUserSlice } from "./hooks/useUser";
import {useNavigate} from "react-router-dom";
export default function AuthPage() {

  const { googleAuth } = useUserSlice();
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    
    const result = await googleAuth({token: credentialResponse.credential!});
    if(result?.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  };

  const onError = () => {
    console.error("Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="max-w-3xl w-full p-8 md:p-12 rounded-3xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h2"
              className="text-center mb-4 text-gray-800 dark:text-gray-200 text-3xl font-semibold"
            >
              Welcome
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <GoogleAuthButton
                onSuccess={onSuccess}
                onError={onError}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="small"
              className="text-center text-gray-600 dark:text-gray-400 mt-4"
            >
              Yes, we have only one method of entry. Is there a problem?
            </Typography>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
