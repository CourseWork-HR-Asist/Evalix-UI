import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import {
    fetchResumes,
    fetchResumeByUserId,
    createResume,
    deleteResume,
} from "../store/resume.slice";


export const useResumeSlice = () => {
    const dispatch = useAppDispatch();
    const resumes = useAppSelector((state) => state.resumes.list);
    const loading = useAppSelector((state) => state.resumes.loading);
    const error = useAppSelector((state) => state.resumes.error);
  
    const getResumes = () => dispatch(fetchResumes());
    const getResumeByUserId = (userId: string) => dispatch(fetchResumeByUserId(userId));
    const removeResume = (id: string) => dispatch(deleteResume(id));
  
    const uploadResume = async (
      file: File,
      userId: string,
      onSuccess?: (resumeId: string) => void
    ) => {
      try {
        const response = await dispatch(createResume({ file, userId }));
        if (createResume.fulfilled.match(response)) {
          onSuccess?.(response.payload.id);
          return response.payload.id;
        } else {
          throw new Error(response.error?.message || "Upload failed");
        }
      } catch (err) {
        console.error("Error uploading resume:", err);
        throw err;
      }
    };
  
    return {
      resumes,
      loading,
      error,
      getResumes,
      getResumeByUserId,
      removeResume,
      uploadResume,
    };
  };
  