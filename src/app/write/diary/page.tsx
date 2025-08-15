"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newSelectedImages: File[] = [];
    const newSelectedPreviewUrls: string[] = [];
    const currentTotalSize = images.reduce((acc, file) => acc + file.size, 0);

    const MAX_IMAGES = 3;
    const MAX_SIZE_MB = 20;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장의 이미지만 업로드할 수 있습니다.`);
      e.target.value = "";
      return;
    }

    const selectedFilesTotalSize = files.reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (currentTotalSize + selectedFilesTotalSize > MAX_SIZE_BYTES) {
      alert(`총 이미지 크기는 ${MAX_SIZE_MB}MB를 초과할 수 없습니다.`);
      e.target.value = "";
      return;
    }

    files.forEach((file) => {
      newSelectedImages.push(file);
      newSelectedPreviewUrls.push(URL.createObjectURL(file));
    });

    setImages((prevImages) => [...prevImages, ...newSelectedImages]);
    setPreviewUrls((prevUrls) => [...prevUrls, ...newSelectedPreviewUrls]);

    e.target.value = "";
    console.log("이미지 업로드 됨!");
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleSubmit = () => {
    console.log("입력된 글:", text);
    console.log("첨부 이미지:", images);
    router.push("/analysis");
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pb-[70px]">
        <h1 className="mb-4 text-xl font-semibold">emomap</h1>

        <div className="relative flex-grow flex flex-col max-h-[calc(100vh-200px)]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="편하게 적어보아요"
            className="w-full flex-grow p-4 rounded-2xl outline-none resize-none bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 placeholder-gray-400 min-h-[450px]"
          />

          <label className="absolute cursor-pointer bottom-3 right-3">
            <ImageIcon size={24} className="text-green-400" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </label>
        </div>

        {previewUrls.length > 0 && (
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {previewUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Image preview ${index + 1}`}
                width={96}
                height={96}
                className="object-cover w-24 h-24 rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="absolute bottom-0 left-0 right-0 py-3 mx-4 mb-0 font-medium text-white bg-green-400 hover:bg-green-500 rounded-xl"
        onClick={handleSubmit}
      >
        AI가 읽은 감정 보기
      </button>
    </div>
  );
};

export default Page;
