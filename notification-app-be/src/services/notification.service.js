import axios from "axios";

const BASE_URL = process.env.AFFORDMED_API;

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
};

export const fetchNotifications = async (query = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers,
      params: query,
    });

    return response.data.notifications;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const fetchPriorityNotifications = async (query = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers,
      params: query,
    });

    const notifications = response.data.notifications || [];

    const priorityMap = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    notifications.sort((a, b) => {
      const p1 = priorityMap[a.Type] || 0;
      const p2 = priorityMap[b.Type] || 0;

      if (p1 !== p2) return p2 - p1;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    return notifications.slice(0, 10);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};