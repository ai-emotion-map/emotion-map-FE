import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import LayerPopup from "./LayerPopup";

const meta: Meta<typeof LayerPopup> = {
  title: "Example/LayerPopup",
  component: LayerPopup,
};

export default meta;
type Story = StoryObj<typeof LayerPopup>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      console.log("Confirmed!");
    };

    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <button onClick={() => setIsOpen(true)}>Open Popup</button>
        <LayerPopup
          open={isOpen}
          onOpenChange={setIsOpen}
          title="팝업 제목"
          description="팝업 설명 텍스트입니다."
          onConfirm={handleConfirm}
          type="confirm"
        />
      </div>
    );
  },
};
