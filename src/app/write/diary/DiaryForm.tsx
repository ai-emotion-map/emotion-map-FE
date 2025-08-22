"use client";

import React, { useState, useCallback } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/common/button/Button";
import LayerPopup from "../../components/common/layerPopup/LayerPopup";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/util/cropImage";

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

const DiaryForm = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [isCropPopupOpen, setIsCropPopupOpen] = useState(false); // 크롭 모달
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false); // 작성 완료 모달
  const [isEmptyTextPopupOpen, setIsEmptyTextPopupOpen] = useState(false); // 내용 없음 모달
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false); // 작성 취소 모달

  // 크롭 관련 상태
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const router = useRouter();
  
  //
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setCropImageSrc(URL.createObjectURL(file));
    setIsCropPopupOpen(true); // 크롭 모달 열기
    e.target.value = "";
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = useCallback(async () => {
    if (!cropImageSrc || !croppedAreaPixels) return;
    try {
      const croppedImageUrl = await getCroppedImg(
        cropImageSrc,
        croppedAreaPixels
      );
      const blob = await (await fetch(croppedImageUrl)).blob();
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });

      setImages((prev) => [...prev, file]);
      setPreviewUrls((prev) => [...prev, croppedImageUrl]);

      // 크롭 모달 닫기 및 초기화
      setCropImageSrc(null);
      setIsCropPopupOpen(false);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } catch (error) {
      console.error(error);
    }
  }, [cropImageSrc, croppedAreaPixels]);

  const handleRemoveImage = (indexToRemove: number) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setPreviewUrls((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      setIsEmptyTextPopupOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("lat", lat ?? "");
    formData.append("lng", lng ?? "");
    images.forEach((file) => {
      formData.append("images", file);
    });

    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    setIsSubmitPopupOpen(true);
  };

  return (
    <div className="relative flex flex-col min-h-full">
      <form
        className="flex flex-col min-h-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex-1 overflow-y-auto min-h-[530px] pb-4">
          <div className="relative flex flex-col">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="편하게 적어보아요"
              className={`w-full p-3 rounded-2xl outline-none resize-none bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 placeholder-gray-400 transition-all duration-300
                ${previewUrls.length > 0 ? "min-h-[400px]" : "min-h-[530px]"}`}
              maxLength={500}
            />
            <label className="absolute cursor-pointer bottom-3 right-3">
              <ImageIcon size={24} className="text-main-green" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <div className="absolute text-sm text-gray-400 bottom-3 right-12">
              ({text.length}/500)
            </div>
          </div>

          {/* 이미지 미리보기 */}
          {previewUrls.length > 0 && (
            <div className="flex pt-4 mt-2 space-x-2 overflow-x-auto">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Image preview ${index + 1}`}
                    width={96}
                    height={120} // 4:5 비율
                    className="object-cover w-24 rounded-lg h-30"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    type="button"
                    className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <input type="hidden" name="lat" value={lat ?? ""} />
        <input type="hidden" name="lng" value={lng ?? ""} />

        <div className="absolute left-0 right-0 bottom-3 flex flex-row justify-center gap-x-4 px-4">
          {/* 왼쪽 취소 버튼 */}
          <button
            type="button"
            onClick={() => setIsCancelPopupOpen(true)}
            className="rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 text-sm whitespace-nowrap"
          >
            작성 취소
          </button>

          {/* 오른쪽 AI 버튼 */}
          <Button type="submit" className="whitespace-nowrap">AI가 읽은 감정 보기</Button>
        </div>
      </form>

      {/* 크롭 모달 */}
      {isCropPopupOpen && cropImageSrc && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md h-[500px] bg-white rounded-lg overflow-hidden">
            <Cropper
              image={cropImageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 5} // 4:5 비율 고정
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
              <Button onClick={handleCropConfirm}>확인</Button>
              <Button onClick={() => setIsCropPopupOpen(false)} color="gray">
                취소
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 작성 완료 모달 */}
      <LayerPopup
        open={isSubmitPopupOpen}
        onOpenChange={setIsSubmitPopupOpen}
        title="작성 완료"
        description="작성을 완료하시겠습니까?"
        onConfirm={() => router.push("/analysis")}
        type="cancelConfirm"
      />

      {/* 내용 없음 모달 */}
      <LayerPopup
        open={isEmptyTextPopupOpen}

        onOpenChange={setIsEmptyTextPopupOpen}
        title="내용 없음"
        description="내용을 입력해주세요."
        onConfirm={() => setIsEmptyTextPopupOpen(false)}
        type="confirm"
      />

      {/* 작성 취소 모달 */}
      <LayerPopup
        open={isCancelPopupOpen}
        onOpenChange={setIsCancelPopupOpen}
        title="작성을 취소하시겠습니까?"
        description="작성된 내용은 저장되지 않습니다."
        onConfirm={() => router.back()}
        type="cancelConfirm"
      />
    </div>
  );
};

export default DiaryForm;
