import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";

import Flashcard from "./Flashcard";
import Pagination from "./Pagination";
import ProgressBar from "./ProgressBar";
import "./Display.scss";

const svStyles = {
  root: {
    background: "#fff",
    border: "4px solid #eee",
    minHeight: "300px",
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
  }
};

function Display({ data }) {
  const [index, setIndex] = useState(0);

  // Reset the index when the data changes, i.e. is shuffled.
  useEffect(() => setIndex(0), [data]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setIndex(prevIndex => Math.max(prevIndex-1, 0));
      } else if (e.key === "ArrowRight") {
        setIndex(prevIndex => {
          return data.length ? Math.min(prevIndex+1, data.length-1) : 0;
        });
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, index]);

  return (
    <div className="Display">
      <div>
        <ProgressBar
          progress={index / (data.length-1)}
        />
        <SwipeableViews
          index={index}
          style={svStyles.root}
          containerStyle={svStyles.container}
          onChangeIndex={setIndex}
          disabled={data.length === 0}
          enableMouseEvents
        >
          {data.map((x, i) => <Flashcard key={i} {...x} />)}
        </SwipeableViews>
        <Pagination
          index={index}
          setIndex={setIndex}
          length={data.length}
        />
      </div>
    </div>
  );
}

export default Display;
