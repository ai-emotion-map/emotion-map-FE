"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]); // Changed to array
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Changed to array
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newSelectedImages: File[] = [];
    const newSelectedPreviewUrls: string[] = [];
    let currentTotalSize = images.reduce((acc, file) => acc + file.size, 0);

    const MAX_IMAGES = 3;
    const MAX_SIZE_MB = 20;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    // Check total number of images
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장의 이미지만 업로드할 수 있습니다.`);
      e.target.value = ''; // Clear the input
      return;
    }

    // Check total size
    let selectedFilesTotalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (currentTotalSize + selectedFilesTotalSize > MAX_SIZE_BYTES) {
      alert(`총 이미지 크기는 ${MAX_SIZE_MB}MB를 초과할 수 없습니다.`);
      e.target.value = ''; // Clear the input
      return;
    }

    files.forEach(file => {
      newSelectedImages.push(file);
      newSelectedPreviewUrls.push(URL.createObjectURL(file));
    });

    setImages(prevImages => [...prevImages, ...newSelectedImages]);
    setPreviewUrls(prevUrls => [...prevUrls, ...newSelectedPreviewUrls]);

    e.target.value = ''; // Clear the input to allow re-uploading same files
    console.log("이미지 업로드 됨!");
  };

  // Effect to revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []); // Empty dependency array means this runs only on mount and cleanup on unmount.

  const handleSubmit = () => {
    console.log("입력된 글:", text);
    console.log("첨부 이미지:", images); // Changed from 'image' to 'images'
    // 여기서 AI 감정 분석 API 호출 가능
    router.push('/analysis');
  };

  return (
    <div className="flex flex-col h-full">
      {/* 제목 */}
      <h1 className="text-xl font-semibold mb-4">emomap</h1>

      {/* 입력 박스 */}
      <div className="relative flex-grow "> {/* Added min-h-[400px] */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="편하게 적어보아요"
          className="w-full h-full p-4 rounded-2xl outline-none resize-none bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 placeholder-gray-400 min-h-[500px]"
        />

        {/* 이미지 업로드 아이콘 */}
        <label className="absolute bottom-3 right-3 cursor-pointer">
          <ImageIcon size={24} className="text-green-400" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            multiple // Added multiple attribute
          />
        </label>
      </div>

      {/* 이미지 미리보기 */}
      {previewUrls.length > 0 && ( // Changed condition
        <div className="mt-4 flex space-x-2 overflow-x-auto"> {/* Added flex, space-x-2, overflow-x-auto */}
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Image preview ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
          ))}
        </div>
      )}

      {/* 버튼 */}
      <button
        className="mt-6 bg-green-400 hover:bg-green-500 text-white font-medium py-3 rounded-xl"
        onClick={handleSubmit}
      >
        AI가 읽은 감정 보기
      </button>
    </div>
  );
};

export default Page;
