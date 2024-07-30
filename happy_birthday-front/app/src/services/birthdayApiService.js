import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

export const getTodaysBirthday = async () => {
  let queryUrl = `${apiBaseUrl}/api/getBirthday`;

  try {
    const response = await axios.get(queryUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching birthdays:", error);
    return false;
  }
};

export const getRandomQuote = async () => {
  let queryUrl = `${apiBaseUrl}/api/randomquote`;

  try {
    const response = await axios.get(queryUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return false;
  }
};
