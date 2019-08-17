import React, { useState } from "react";

import "./App.css";
import { MusicContainer } from "./MusicContainer";
import { Pagination } from "./Pagination";
import { getTrendingSongs } from "./services/songs-service";
import { TRENDING_URL } from "./utils/constants";

function App() {
  const [songs, updateSong] = useState([]);
  const [initialLoad, updateInitialLoad] = useState(false);
  if (!initialLoad) {
    getTrendingSongs(TRENDING_URL, updateSong, console.error);
    updateInitialLoad(true);
  }

  return (
    <div className="music-list-container">
      {songs.map((song, index) => {
        return <MusicContainer song={song} key={index} />;
      })}
      <Pagination
        getSongs={() =>
          getTrendingSongs(TRENDING_URL, updateSong, console.error)
        }
      />
    </div>
  );
}

export default App;
