import React from "react";
import SearchSong from "../components/Searchsong";

function Home({ handlePlay }) {
  return (
    <div className="containerWrapper">
      <h1>Home</h1>
      <SearchSong handlePlay={handlePlay} />
    </div>
  );
}

export default Home;
