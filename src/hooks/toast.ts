import { toast } from "react-toastify";

const useToast = () => {
  const successful = (message: string, text: string) => {
    toast(`✅ ${message}: ${text}`, {
      closeOnClick: true,
      position: "bottom-right",
      type: "success",
    });
  };

  const error = (message: string, data: unknown) => {
    const error = data as { message: string };
    toast(`❌ ${message}: ${error.message}`, {
      closeOnClick: true,
      position: "bottom-right",
      type: "error",
    });
  };

  return { successful, error };
};

export default useToast;
