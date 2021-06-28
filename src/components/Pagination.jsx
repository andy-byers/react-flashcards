import React, { useEffect, useState } from "react";
import "./Pagination.scss";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Pagination({ index, setIndex, length }) {
  return (
    <div className="Pagination">
      <button
        onClick={e => setIndex(prevIndex => prevIndex-1)}
        disabled={index <= 0}
      >
        <MdNavigateBefore
          size="25"
          color="#041027"
        />
      </button>
      <span>
        {length ? `${index+1}/${length}` : `0/0`}
      </span>
      <button
        onClick={e => setIndex(prevIndex => prevIndex+1)}
        disabled={index >= length-1}
      >
        <MdNavigateNext
          size="25"
          color="#041027"
        />
      </button>
    </div>
  );
}

export default Pagination;
