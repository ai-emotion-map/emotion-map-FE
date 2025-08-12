"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
      console.log("이미지 업로드 됨!");
    }
  };

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 생성된 URL을 해제합니다.
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

        {/* 이미지 미리보기 */}
        {previewUrl && (
          <div className="mt-4">
            <img src={previewUrl} alt="Image preview" className="w-24 h-24 object-cover rounded-lg" />
          </div>
        )}

        {/* 버튼 */}
        <button
          className="mt-6 bg-green-400 hover:bg-green-500 text-white font-medium py-3 rounded-xl"
          onClick={handleSubmit}
        >
          AI가 읽은 감정 보기
        </button>
      </main>
    </div>
  );
};

export default Page;
