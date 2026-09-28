import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gutendex.com",
});

export const fetchBooks = async (urlParams) => {
  if (typeof urlParams === "string" && urlParams.startsWith("http")) {
    const response = await axios.get(urlParams);

    return response.data;
  }

  const response = await apiClient.get("/books", { params: urlParams });
  return response.data;
};

export const fetchBookDetails = async (id) => {
  const response = await apiClient.get("/books", { params: { ids: id } });

  return response.data.results[0];
};
