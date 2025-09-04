"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

const Page: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadKey, setUploadKey] = useState(0);  // Key to reset FileUpload

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  const handleClear = () => {
    setFiles([]);
    setUploadKey((prev) => prev + 1);  // Change key to remount FileUpload
  };

  const handleSubmit = () => {
    console.log("Submitting files:", files);
    // Your submit logic here
  };

  return (
    <div className="w-[80vw] ml-[25vw] max-w-xl min-h-96 border shadow-xl border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-8 flex flex-col gap-4">
      <FileUpload key={uploadKey} onChange={handleFileUpload} />

      <div className="flex gap-2 justify-end">
        <button
          className="px-4 py-2 bg-white border-2 text-black rounded hover:bg-gray-100"
          onClick={handleClear}
          disabled={files.length === 0}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:bg-gray-700"
          onClick={handleSubmit}
          disabled={files.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
