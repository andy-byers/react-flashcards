import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BiX } from "react-icons/bi";
import { ImShuffle } from "react-icons/im";
import useFileReader from "./hooks/useFileReader";

import Display from "./components/Display";
import Dropzone from "./components/Dropzone";
import "./App.scss";

function shuffle(arr) {
  for (var i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <div className="header">
        <span className="title">react-flashcards</span>
        <span>
          {/* Dropzone component for accepting JSON flashcard files. */}
          <Dropzone
            onDrop={data => setData(prevData => [...prevData, ...data])}
            count={data.length}
          />
          {/* Shuffle button. */}
          <button
            onClick={e => {
              if (data === null) {
                return;
              }
              setData(prevData => {
                var nextData = [...prevData];
                shuffle(nextData);
                return nextData;
              });
            }}
          >
            <ImShuffle color="#041027" size="20" />
          </button>
          {/* "X" button to remove all the flashcards. */}
          <button onClick={e => setData([])} >
            <BiX color="#041027" size="30" />
          </button>
        </span>
      </div>
      <Display data={data} />
    </div>
  );
}

export default App;
