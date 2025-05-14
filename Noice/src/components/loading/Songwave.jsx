import React from "react";
import "./song.css";

const Songwave = () => {
  return (
 <div className="song-wave">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};

export default Songwave;
