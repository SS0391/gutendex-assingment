import { useState, useEffect } from "react";
import BookCard from "../components/BookCard/BookCard.jsx";
import styles from "./Home.module.css";
export default function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // fetch the list from the localstorage when page renders
  // The empty dependenct array[] ensures this effect only runs once on load --> prevents an infinite loop of re-renders
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteBooks(favs);
  }, []);

  return (
    <div>
      <h2 className={styles.pageTitle}>Your favorite books!</h2>
      {favoriteBooks.length === 0 ? (
        <p>You have no favorites yet! You will find the books at the home page!</p>
      ) : (
        <div className={styles.bookGrid}>
          {favoriteBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
