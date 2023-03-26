import { toast } from 'react-toastify';

export const popupToast = (text: string, id: string) => {
  return toast.info(text, {
    toastId: id,
  });
};
