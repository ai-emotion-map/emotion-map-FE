"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/common/button/Button";
import LayerPopup from '../../components/common/layerPopup/LayerPopup'; // Add import for LayerPopup component

const Page = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup
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

  const handleRemoveImage = (indexToRemove: number) => {
    // Revoke the object URL for the image being removed
    URL.revokeObjectURL(previewUrls[indexToRemove]);

    // Update images state
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));

    // Update previewUrls state
    setPreviewUrls(prevUrls => prevUrls.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleSubmit = () => {
    console.log("입력된 글:", text);
    console.log("첨부 이미지:", images);
    // router.push("/analysis"); // Remove direct navigation
    setIsPopupOpen(true); // Open the popup
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto min-h-[530px] pb-4">
        <div className="relative flex flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="편하게 적어보아요"
            className="w-full p-3 rounded-2xl outline-none resize-none bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 placeholder-gray-400 min-h-[400px]"
            maxLength={500} // Added maxLength attribute
          />

          <label className="absolute cursor-pointer bottom-3 right-3">
            <ImageIcon size={24} className="text-main-green" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </label>
          {/* Character count display */}
          <div className="absolute bottom-3 right-12 text-gray-400 text-sm">
            ({text.length}/500)
          </div>
        </div>

        {previewUrls.length > 0 && (
          <div className="flex mt-2 space-x-2 overflow-x-auto pt-4"> 
            {previewUrls.map((url, index) => (
              <div key={index} className="relative"> {/* Added relative container */}
                <Image
                  src={url}
                  alt={`Image preview ${index + 1}`}
                  width={96}
                  height={96}
                  className="object-cover w-24 h-24 rounded-lg"
                />
                {/* Delete button */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold" // Adjusted positioning
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      
      </div>
      <div className="mb-3">
        <Button onClick={handleSubmit}>AI가 읽은 감정 보기</Button>
      </div>

      <LayerPopup
        open={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        title="작성 완료"
        description="작성을 완료하시겠습니까?"
        onConfirm={() => router.push('/analysis')}
        type="cancelConfirm"
      />
    </div>
  );
};

export default Page;
