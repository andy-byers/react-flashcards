import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiStackFill } from "react-icons/ri";
import { BiDownload } from "react-icons/bi";

import useFileReader from "../hooks/useFileReader";
import "./Dropzone.scss";

function Dropzone({ onDrop, count }) {
  const [{ error, file, result }, setFile] = useFileReader();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop: files => files.forEach(file => setFile(file)) });

  useEffect(() => {
    if (error === null && result !== null) {
      var data = JSON.parse(result);

      if (!Array.isArray(data)) {
        return;
      }
      // Discard flashcards that are invalid. TODO: Eliminate for duplicates.
      data = data.filter(item => {
        const { term = null, definition: def = null } = item;
        return ((typeof def === "string") || Number.isInteger(def)) &&
               (typeof term === "string");
      });
      if (data.length) {
        onDrop(data);
      }
    }
  }, [error, result]);

  return (
    <div {...getRootProps({ className: "Dropzone" })}>
      <input {...getInputProps()}/>
      <span>{count}</span>
      <RiStackFill size="25" color="#041027" />
    </div>
  );
}

export default Dropzone;
