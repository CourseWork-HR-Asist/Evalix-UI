import { Typography, Card } from "@material-tailwind/react";
import { CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import GoogleAuthButton from "./components/GoogleAuthButton";
import { jwtDecode } from "jwt-decode";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="max-w-3xl w-full p-8 md:p-12 rounded-3xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
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
              onSuccess={(credentialResponse: CredentialResponse) => {
                console.log(credentialResponse);
                if (credentialResponse.credential) {
                  const decodedToken = jwtDecode(credentialResponse.credential);
                  console.log(decodedToken);
                } else {
                  console.error("Credential is undefined");
                }
              }}
              onError={() => {
                console.error("Login failed");
              }}
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
