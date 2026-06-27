import { useEffect, useState } from "react";
import api from "../api/notificationApi";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getNotifications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/notifications");

      if (response.data.notifications) {
        setNotifications(response.data.notifications);
      } else {
        setNotifications(response.data);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    refresh: getNotifications,
  };
};

export default useNotifications;