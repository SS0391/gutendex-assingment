import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = ["Fiction", "Mystery", "Thriller", "Romance", "Fantasy", "Morality", "Society", "Power", "Justice", "Adventure", "Tragedy", "War", "Philosophy"];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logo}>
          The Gutendex Book App
        </Link>
        <form onSubmit={handleSearchSubmit} className={styles.formSearch}>
          <input type="text" placeholder="Look for a title" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        <Link to="/favorites" className={styles.linkFavs}>
          Favorites
        </Link>
      </div>
      <nav className={styles.navMenu}>
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat.toLowerCase()}`} className={styles.navLinks}>
            {cat}
          </Link>
        ))}
      </nav>
    </header>
  );
}
