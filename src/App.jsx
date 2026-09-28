import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category/:categoryName", element: <Category /> },
      { path: "book/:id", element: <BookDetails /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
