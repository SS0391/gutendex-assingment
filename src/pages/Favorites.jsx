import { useState, useEffect } from "react";
import BookCard from "../components/BookCard/BookCard.jsx";

export default function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // fetch the list from the localstorage when page renders

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteBooks(favs);
  });

  return (
    <div>
      <h2>Your favorite books!</h2>
      {favoriteBooks.length === 0 ? (
        <p>You have no favorites yet! You will find the books at the home page!</p>
      ) : (
        <div>
          {favoriteBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
