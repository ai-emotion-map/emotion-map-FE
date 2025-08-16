"use client";

import React from 'react';

const AnalysisPage = () => {
  const handleSave = () => {
    console.log("저장됨!");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">emomap</h1>
      </header>

      {/* Main content */}
      <div className="flex-grow flex flex-col space-y-4 pt-4">
        {/* Map placeholder */}
        <div className="h-[548px] flex items-center justify-center bg-gray-200 rounded-2xl">
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
          className="w-full py-4 bg-main-green hover:bg-hover-green text-white rounded-2xl "
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;
