"use client";

import React, { useState } from "react";
import NaverMap from "../components/navermap/NaverMap";
import Button from "../components/common/button/Button";
import { Search } from "lucide-react";
import LayerPopup from "../components/common/layerPopup/LayerPopup";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Added import for Next.js Image component
import Button from "../components/common/button/Button"; // Add import for Button component
import LayerPopup from "../components/common/layerPopup/LayerPopup"; // Add import for LayerPopup component

const Page = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]); // Changed to array
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Changed to array
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newSelectedImages: File[] = [];
    const newSelectedPreviewUrls: string[] = [];
    const currentTotalSize = images.reduce((acc, file) => acc + file.size, 0); // Changed let to const

    const MAX_IMAGES = 3;
    const MAX_SIZE_MB = 20;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    // Check total number of images
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장의 이미지만 업로드할 수 있습니다.`);
      e.target.value = ""; // Clear the input
      return;
    }

    // Check total size
    const selectedFilesTotalSize = files.reduce(
      (acc, file) => acc + file.size,
      0
    ); // Changed let to const
    if (currentTotalSize + selectedFilesTotalSize > MAX_SIZE_BYTES) {
      alert(`총 이미지 크기는 ${MAX_SIZE_MB}MB를 초과할 수 없습니다.`);
      e.target.value = ""; // Clear the input
      return;
    }

    files.forEach((file) => {
      newSelectedImages.push(file);
      newSelectedPreviewUrls.push(URL.createObjectURL(file));
    });

    setImages((prevImages) => [...prevImages, ...newSelectedImages]);
    setPreviewUrls((prevUrls) => [...prevUrls, ...newSelectedPreviewUrls]);

    e.target.value = ""; // Clear the input to allow re-uploading same files
    console.log("이미지 업로드 됨!");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []); // Empty dependency array means this runs only on mount and cleanup on unmount.

  const handleSubmit = () => {
    console.log("입력된 글:", text);
    console.log("첨부 이미지:", images);
    // 여기서 AI 감정 분석 API 호출 가능
    // router.push('/analysis'); // Remove direct navigation
    setIsPopupOpen(true); // Open the popup
  };

  return (
    <div className="relative flex flex-col h-full">
      {" "}
      {/* Changed min-h-screen to h-full and added relative */}
      <div className="flex-grow overflow-y-auto pb-[70px]">
        {" "}
        {/* Added pb-4 to content area */}
        {/* 입력 박스 */}
        <div className="relative flex-grow flex flex-col max-h-[calc(100vh-200px)]">
          {" "}
          {/* Added flex flex-col */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="편하게 적어보아요"
            className="w-full flex-grow p-4 rounded-2xl outline-none resize-none bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 placeholder-gray-400 min-h-[400px]" // Changed h-full to flex-grow
          />
          {/* 이미지 업로드 아이콘 */}
          <label className="absolute cursor-pointer bottom-3 right-3">
            <ImageIcon size={24} className="text-green-400" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple // Added multiple attribute
            />
          </label>
          {/* 이미지 미리보기 */}
          {previewUrls.length > 0 && (
            <div className="flex mt-4 space-x-2">
              {" "}
              {/* Added flex, space-x-2, overflow-x-auto */}
              {previewUrls.map((url, index) => (
                <Image // Changed img to Image
                  key={index}
                  src={url}
                  alt={`Image preview ${index + 1}`}
                  width={96} // Added width
                  height={96} // Added height
                  className="object-cover w-24 h-24 rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
        {/* 버튼 */}
        <Button // Changed from button to Button
          className="absolute bottom-0 left-0 right-0 py-4"
          onClick={handleSubmit}
        >
          AI가 읽은 감정 보기
        </Button>
        <LayerPopup
          open={isPopupOpen}
          onOpenChange={setIsPopupOpen}
          title="감정 분석 완료"
          description="감정 분석이 완료되었습니다. 분석 페이지로 이동하시겠습니까?"
          onConfirm={() => router.push("/analysis")}
          type="cancelConfirm"
        />
      </div>
    </div>
  );
};

export default Page;
