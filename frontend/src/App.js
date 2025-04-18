import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleRecommend = (movieName = selected) => {
    if (!movieName) return;
    setLoading(true);
    fetch(`http://localhost:8000/recommend?movie_title=${encodeURIComponent(movieName)}`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.titles.map((title, index) => ({
          title,
          poster: data.posters[index],
        }));
        setRecommendations(results);
        setSelected(movieName);
        setHistory((prev) => {
          const updated = [movieName, ...prev.filter((m) => m !== movieName)];
          return updated.slice(0, 10);
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="app">
      <h1 className="main-title">🎬 Movie Recommender</h1>

      <div className="control-panel">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">🎞️ Pick a movie to begin...</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>
        <button onClick={() => handleRecommend()}>🚀 Recommend</button>
      </div>

      {history.length > 0 && (
        <div className="dropdown-history">
          <label>⏳ Your Watch History:</label>
          <select onChange={(e) => handleRecommend(e.target.value)}>
            <option value="">🔁 Revisit a movie</option>
            {history.map((movie, idx) => (
              <option key={idx} value={movie}>
                {movie}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && <div className="loader">🎥 Generating magic...</div>}

      {recommendations.length > 0 && (
        <>
          <h2 className="section-title">✨ Your Personalized Picks</h2>
          <div className="movie-grid">
            {recommendations.map((rec, index) => (
              <div key={index} className="movie-card fade-in">
                <img src={rec.poster} alt={rec.title} />
                <p>{rec.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
