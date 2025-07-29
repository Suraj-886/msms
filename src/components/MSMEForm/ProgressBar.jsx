// src/components/MSMEForm/ProgressBar.jsx
import React from "react";

function ProgressBar({ progressPercentage, currentPage }) {
  return (
    <>
      <div className="mb-6 bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="text-center mb-6 text-gray-600">
        पृष्ठ {currentPage} / 11 - {Math.round((currentPage / 11) * 100)}% पूर्ण
      </div>
    </>
  );
}

export default ProgressBar;