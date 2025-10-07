import axios from "axios";
import { useState } from "react";

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  function searchLyrics() {
    if (artist === "" || song === "") {
      return;
    }

    setLoading(true);
    setLyrics("");

    axios
      .get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((res) => {
        setLyrics(res.data.lyrics);
      })
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        setLyrics("There was a problem retrieving the song lyrics.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <h1>Lyrics Finder</h1>
      <input type="text" placeholder="Artist name..." onChange={(e) => setArtist(e.target.value)} />
      <input type="text" placeholder="Song name..." onChange={(e) => setSong(e.target.value)} />
      <button onClick={() => searchLyrics()}>Search</button>

      {loading && <p>Loading the lyrics...</p>}

      <pre>{lyrics}</pre>
    </div>
  );
}

export default App;
