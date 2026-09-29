# The Gutendex Book Application

A modern, responsive, and user-friendly web application built with **React** and **Vite** that integrates with the [Gutendex API](https://gutendex.com). The application allows users to browse a vast catalog of public domain books, search for specific titles, explore unique literary categories, and manage a personal list of favorite books.

The visual style of the application features a warm, cozy color palette inspired by **The Lord of the Rings** (classic library and parchment aesthetics).

## Features

- **Search Functionality:** Real-time search for book titles integrated directly with URL query parameters.
- **Category Browsing:** A custom navigation menu featuring 13 distinct genres (Fiction, Mystery, Thriller, Philosophy, etc.) making precise queries against the Gutendex topic filter.
- **Server-side Pagination:** Seamless browsing through thousands of results using the API's built-in next/previous endpoints.
- **Book Details Page:** Comprehensive information for each book, including title, authors, subjects, languages, total download counts, and a direct link to read the book digitally.
- **Favorites Management:** A persistent favorites list stored in `localStorage` allowing users to save and remove books, even after a page refresh.
- **Responsive Design:** Built using CSS Modules and standard CSS Grid/Flexbox layouts to guarantee a beautiful experience across mobile, tablet, and desktop screens.

## Tech Stack & Architecture

- **Frontend Framework:** React 18+ (initialized with Vite)
- **Routing:** React Router v6 (`createBrowserRouter`, `RouterProvider`, and dynamic routing parameters)
- **Data Fetching & Caching:** TanStack Query v5 (React Query) for state synchronization, error/loading handling, and automatic response caching.
- **HTTP Client:** Axios (configured with a safe client base URL and custom handlers to bypass pagination CORS issues).
- **Styling:** CSS Modules for scoped, non-conflicting component styles combined with global CSS custom properties (`:root`).

## Installation & Setup

Follow these steps to run the project locally on your machine:

1. **Clone or extract the project files.**
2. **Navigate into the project directory:**
   ```bash
   cd gutendex-book-app
   ```
3. **Install the required dependencies:**
   ```bash
   npm install
   ```
4. **Start the local development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```text
src/
├── components/
│   ├── BookCard/
│   └── Header/
├── layouts/
│   └── RootLayout/
├── pages/
│   ├── Home/
│   ├── Category/
│   ├── BookDetails/
│   └── Favorites/
├── services/
│   └── api.js
├── App.jsx
├── index.css
└── main.jsx
```

## Technical Enhancements Included

- **CORS & Mixed Content Fix:** The API architecture dynamically intercepts pagination strings, rewriting `http` to secure `https` to prevent web browser blocks. It splits raw parameter objects from text strings to keep queries reliable.
- **Performance Optimization:** Prevented memory leaks and browser freezing by securing the `localStorage` hooks inside scoped React life-cycle triggers, fully removing un-optimized multi-render loops.

### Issues with the APP

- The page is a bit slow, because of the Gutendex API

## Reasons this is made

- Made for learning purpose
