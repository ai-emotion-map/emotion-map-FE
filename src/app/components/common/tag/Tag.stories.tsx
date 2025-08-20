import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Example/Tag",
  component: Tag,
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const DefaultTag: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Tag variant="가족 🏠" />
        <Tag variant="우정 🤝" type="small" />
        <Tag variant="위로/치유 🌱" />
      </div>
    );
  },
};
