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
    <div className="min-h-[100vh] h-auto text-center sm:text-center">
      <h1 className="text-[#ff7a8a] text-4xl font-bold mt-10 mb-5">Lyrics Finder</h1>
      <input
        className="w-50 border-2 focus:outline-[#d46976] rounded-sm mr-2 p-1 "
        type="text"
        placeholder="Artist name..."
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        className="w-50 border-2 focus:outline-[#d46976] rounded-sm mr-2 p-1"
        type="text"
        placeholder="Song name..."
        onChange={(e) => setSong(e.target.value)}
      />
      <button
        className="w-20 cursor-pointer bg-[#d46976] text-amber-100 p-1.5 rounded-sm outline-0 "
        onClick={() => searchLyrics()}
      >
        Search
      </button>
      <hr className="mt-5 w-3/6 m-auto" />
      {loading && <p>Loading the lyrics...</p>}
      <pre className="text-lg mt-3 text-[#686868]">{lyrics}</pre>
    </div>
  );
}

export default App;
