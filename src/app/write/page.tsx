"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Home, MapPin, Pencil, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("입력된 글:", text);
    console.log("첨부 이미지:", image);
    // 여기서 AI 감정 분석 API 호출 가능
    router.push('/analysis');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <main className="flex-grow flex flex-col p-4">
        {/* 제목 */}
        <h1 className="text-xl font-semibold mb-4">emomap</h1>

        {/* 입력 박스 */}
        <div className="relative flex-grow">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="편하게 적어보아요"
            className="w-full h-full p-4 rounded-2xl outline-none resize-none bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 placeholder-gray-400"
          />

          {/* 이미지 업로드 아이콘 */}
          <label className="absolute bottom-3 right-3 cursor-pointer">
            <ImageIcon size={24} className="text-green-400" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* 버튼 */}
        <button
          className="mt-6 bg-green-400 hover:bg-green-500 text-white font-medium py-3 rounded-xl"
          onClick={handleSubmit}
        >
          AI가 읽은 감정 보기
        </button>
      </main>

      {/* Bottom navigation */}
      <footer className="flex justify-around items-center p-4">
        <Copy size={28} className="text-green-400" />
        <MapPin size={28} className="text-green-400" />
        <Home size={28} className="text-green-400" />
        <Pencil size={28} className="text-green-400" />
      </footer>
    </div>
  );
};

export default Page;
