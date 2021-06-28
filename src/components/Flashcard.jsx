import React, { useEffect, useRef, useState } from "react";

import "./Flashcard.scss";

function isOverflownY({ current }) {
  if (!current) {
    return false;
  }
  return current.scrollHeight > current.clientHeight;
}

function getRelativePosition(ref, e) {
  const rect = ref.current.getBoundingClientRect();
  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;
  return { x, y };
}

function Flashcard({ term, definition }) {
  const [revealed, setRevealed] = useState(false);
  const [cursor, setCursor] = useState(null);
  const divs = [useRef(null), useRef(null)];
  const ref = useRef(null);

  useEffect(() => {
    function onMouseDown(e) {
      setCursor(getRelativePosition(ref, e));
    }
    function onMouseUp(e) {
      if (cursor === null) {
        return;
      }
      const { x: x1, y: y1 } = getRelativePosition(ref, e);
      const { x: x0, y: y0 } = cursor;
      const distSquared = Math.pow(x1-x0, 2) + Math.pow(y1-y0, 2);

      // Only flip the card if the drag distance is less than sqrt(2) pixels.
      // This prevents the card from flipping when dragging to the next card.
      if (distSquared <= 2) {
        setRevealed(prevRevealed => !prevRevealed);
      }
      setCursor(null);
    }
    // Add the listeners.
    ref.current.addEventListener("mousedown", onMouseDown);
    ref.current.addEventListener("mouseup", onMouseUp);

    // Remove the listeners.
    return () => {
      if (ref.current !== null) {
        ref.current.removeEventListener("mousedown", onMouseDown);
        ref.current.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [cursor]);

  // Try to determine if the front or back text is overflowing the div. If so, we
  // can't have align-items: center, otherwise we can't see the top of the text.
  const styles = divs.map(div => isOverflownY(div) ? {} : { alignItems: "center" });

  return (
    <div
      ref={ref}
      className="Flashcard"
      style={{ transform: `rotateY(${revealed * 180}deg)` }}
    >
      <div
        ref={divs[0]}
        className="front"
        style={styles[0]}
      >
        <div>{term}</div>
      </div>
      <div
        ref={divs[1]}
        className="back"
        style={styles[1]}
      >
        <div>{definition}</div>
      </div>
    </div>
  );
}

export default Flashcard;
