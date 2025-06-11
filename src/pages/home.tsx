import { useState } from "react";
import "./home.css";

function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleShorten = async () => {
    setError(null);
    setShortUrl(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shortener`, {
        method: "POST",
        body: JSON.stringify({ url: inputUrl }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "Something went wrong");
      }

      const data = await response.json();
      setShortUrl(`${window.location.origin}/${data.shortenedUrl}`);
      setInputUrl("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="principal-container">
      <div className="home-container">
        <h1 className="home-title">Link Shortener</h1>
        <p className="home-description">
          Just type in a URL below and click the button to get started.
        </p>
        <input
          type="text"
          className="home-input"
          placeholder="Type something..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button className="home-button" onClick={handleShorten}>
          Click Me!
        </button>

        {error && <p className="error-message">{error}</p>}

        {shortUrl && (
          <div className="result-container">
            <p>Your shortened link:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;