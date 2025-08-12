import React, { useState } from "react";
import { X } from "lucide-react";

export default function ProfilePhotoModal({ onSave }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSave(selectedFile); // Pass file to parent for backend upload
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Add Your Profile Photo
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Upload a clear picture so others can recognize you.
        </p>

        {/* Preview */}
        <div className="flex justify-center mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              No photo
            </div>
          )}
        </div>

        {/* File Input */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
            Choose File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className={`flex-1 px-4 py-2 rounded-lg text-white ${
              selectedFile
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Save Photo
          </button>
        </div>
      </div>
    </div>
  );
}
