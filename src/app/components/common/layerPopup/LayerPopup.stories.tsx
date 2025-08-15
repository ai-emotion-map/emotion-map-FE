import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import LayerPopup from "./LayerPopup";

const meta: Meta<typeof LayerPopup> = {
  title: "Example/LayerPopup",
  component: LayerPopup,
};
export default meta;
type Story = StoryObj<typeof LayerPopup>;

// 1. 기본 취소 + 확인
export const CancelConfirm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleConfirm = () => console.log("확인 클릭됨");

    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <button onClick={() => setIsOpen(true)}>Open Cancel+Confirm</button>
        <LayerPopup
          open={isOpen}
          onOpenChange={setIsOpen}
          title="삭제하시겠습니까?"
          description="이 작업은 되돌릴 수 없습니다."
          onConfirm={handleConfirm}
          type="cancelConfirm"
        />
      </div>
    );
  },
};

// 2. 확인 버튼만
export const ConfirmOnly: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <button onClick={() => setIsOpen(true)}>Open Confirm Only</button>
        <LayerPopup
          open={isOpen}
          onOpenChange={setIsOpen}
          title="저장되었습니다"
          description="변경 사항이 성공적으로 저장되었습니다."
          type="confirm"
        />
      </div>
    );
  },
};

// 3. 확인 버튼 누르면 페이지 이동
export const ConfirmRedirect: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleConfirm = () => {
      window.location.href = "https://example.com";
    };

    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <button onClick={() => setIsOpen(true)}>Open Redirect Popup</button>
        <LayerPopup
          open={isOpen}
          onOpenChange={setIsOpen}
          title="페이지 이동"
          description="확인을 누르면 다른 페이지로 이동합니다."
          onConfirm={handleConfirm}
          type="cancelConfirm"
        />
      </div>
    );
  },
};

// 4. 긴 설명 팝업
export const LongDescription: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const longText = `이 팝업은 매우 긴 설명을 포함합니다. 
여기에 여러 줄의 텍스트를 추가하여 레이아웃이 어떻게 반응하는지 확인할 수 있습니다.
줄바꿈도 지원되고, 내용이 길어지면 스크롤이 생길 수 있습니다.`;

    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <button onClick={() => setIsOpen(true)}>Open Long Description</button>
        <LayerPopup
          open={isOpen}
          onOpenChange={setIsOpen}
          title="긴 설명 팝업"
          description={longText}
          type="cancelConfirm"
        />
      </div>
    );
  },
};
