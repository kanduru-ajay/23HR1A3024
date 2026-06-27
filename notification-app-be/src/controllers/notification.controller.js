import {
  fetchNotifications,
  fetchPriorityNotifications,
} from "../services/notification.service.js";

export const getNotifications = async (req, res) => {
  try {
    const data = await fetchNotifications(req.query);

    res.status(200).json({
      success: true,
      notifications: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPriorityNotifications = async (req, res) => {
  try {
    const data = await fetchPriorityNotifications(req.query);

    res.status(200).json({
      success: true,
      notifications: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

