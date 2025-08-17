"use client";

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Button from '../components/common/button/Button';
import NaverMap from '../components/navermap/NaverMap'; // Import NaverMap
import { MarkerData } from '../components/navermap/NaverMap'; // Import MarkerData
import Tag from '../components/common/tag/Tag'; // Import Tag component
import { TagVariant, TAG_STYLES } from '../components/common/tag/Tag'; // Import TagVariant and TAG_STYLES

const AnalysisPage = () => {
  const handleSave = () => {
    console.log("저장됨!");
  };

  // Dummy marker data for NaverMap
  const dummyMarkers: MarkerData[] = [
    { lat: 37.5665, lng: 126.9780, emotion: "가족 🏠" as TagVariant }, // Seoul
    { lat: 35.1796, lng: 129.0756, emotion: "우정 🤝" as TagVariant }, // Busan
    { lat: 33.4507, lng: 126.5706, emotion: "외로움 🌙" as TagVariant }, // Jeju
  ];

  // Get all TagVariant values
  const allTagVariants: TagVariant[] = Object.keys(TAG_STYLES) as TagVariant[];

  // Function to get random tags
  const getRandomTags = (count: number): TagVariant[] => {
    const shuffled = [...allTagVariants].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [randomTags, setRandomTags] = useState<TagVariant[]>([]);

  useEffect(() => {
    setRandomTags(getRandomTags(3)); // Generate 3 random tags on component mount
  }, []);

  return (
    <div className="flex flex-col h-full">
     

      {/* Main content */}
      <div className="flex-grow flex flex-col space-y-5 pt-5">
        {/* Map placeholder replaced with NaverMap */}
        <NaverMap markers={dummyMarkers} height="420px" /> {/* Changed height to 300px */}

        {/* Emotion tags */}
        <div className="flex justify-center space-x-4"> {/* Changed justify-between to justify-center and space-x-2 to space-x-1 */}
          {randomTags.map((tag, index) => (
            <Tag key={index} variant={tag} type="default" /> // Render Tag component
          ))}
        </div>
      </div>
        {/* Save button */}
        <Button
          onClick={handleSave}
          className="mb-3"
        >
          저장하기
        </Button>
      
    </div>
  );
};

export default AnalysisPage;
