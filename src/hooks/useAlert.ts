import { useDispatch } from "react-redux";
import { showAlert, hideAlert } from "@reducers/alert";
import { IAlert } from "@custom-types/alert";

// Custom hook to trigger alert
export function useAlert() {
  const dispatch = useDispatch();

  // Trigger an alert with title and color
  const triggerAlert = (alert: IAlert) => {
    dispatch(showAlert(alert));

    // Hide the alert after a timeout
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };

  return triggerAlert;
}
