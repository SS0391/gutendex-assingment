import axios from "axios";
// Create an Axios instance with API Gutendex as the base URL
const apiClient = axios.create({
  baseURL: "https://gutendex.com",
});

export const fetchBooks = async (urlOrParams) => {
  if (typeof urlOrParams === "string" && urlOrParams.startsWith("http")) {
    const secureUrl = urlOrParams.replace("http://", "https://");
    // Fix the cors issue. I used a independent axios instance without the baseURL
    const response = await axios.get(secureUrl);
    return response.data;
  }

  const response = await apiClient.get("/books/", { params: urlOrParams });
  return response.data;
};

export const fetchBookDetails = async (id) => {
  const response = await apiClient.get(`/books/${id}/`);

  return response.data;
};
