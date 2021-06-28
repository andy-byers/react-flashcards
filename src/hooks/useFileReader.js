/*
 * Modified from @jcblw/react-use-file-reader
 */

import React, { useEffect, useState } from "react";

function useFileReader(method = "readAsText") {

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (file === null) {
      return;
    }
    const reader = new FileReader(file);

    reader.onerror = e => {
      setError(e.target.error);
    };
    reader.onload = e => {
      setResult(e.target.result);
    };

    try {
      // We need to reset the result state variable, otherwise if we load a file,
      // discard it, then try to load it again, we get the exact same string and
      // miss the rerender.
      setResult(null);
      reader[method](file);
    } catch (e) {
      setError(e);
    }
  }, [file]);

  return [
    {
      error,
      file,
      result,
    },
    setFile,
  ];
}

export default useFileReader;
