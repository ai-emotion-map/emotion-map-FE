"use client";

import React from 'react';

const AnalysisPage = () => {
  const handleSave = () => {
    console.log("저장됨!");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="p-4">
        <h1 className="text-2xl font-bold">emomap</h1>
      </header>

      {/* Main content */}
      <div className="flex-grow flex flex-col p-4 space-y-4">
        {/* Map placeholder */}
        <div className="flex-grow flex items-center justify-center bg-gray-200 rounded-2xl">
          <span className="text-gray-500">지도</span>
        </div>

        {/* Emotion tags */}
        <div className="flex justify-between space-x-2">
          <div className="w-1/3 h-12 bg-green-100 rounded-lg"></div>
          <div className="w-1/3 h-12 bg-green-100 rounded-lg"></div>
          <div className="w-1/3 h-12 bg-green-100 rounded-lg"></div>
        </div>

        {/* Save button */}
        <button 
          onClick={handleSave}
          className="w-full py-4 bg-green-400 text-white rounded-2xl font-semibold"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;
