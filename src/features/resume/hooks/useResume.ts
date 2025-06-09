import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import {
    fetchResumes,
    fetchResumeByUserId,
    createResume,
    deleteResume,
} from "../store/resume.slice";
import { Resume } from "../service/type";

export const useResumeSlice = () => {
    const dispatch = useAppDispatch();
    const resumes = useAppSelector((state: { resumes: { list: Resume[] } }) => state.resumes.list);
    const loading = useAppSelector((state: { resumes: { loading: boolean } }) => state.resumes.loading);
    const error = useAppSelector((state: { resumes: { error: string | null } }) => state.resumes.error);
  
    const getResumes = () => dispatch(fetchResumes());
    const getResumeByUserId = (userId: string) => dispatch(fetchResumeByUserId(userId));
    const removeResume = (id: string) => dispatch(deleteResume(id));
    const getResumesByUserId = (userId: string) => resumes.filter((resume: Resume) => resume.userId === userId); 
  
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
      getResumesByUserId,
      uploadResume,
    };
  };
  