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
        <Tag color="#FDFAE8" shadowColor="#E7E0A0" text="예시1" />
        <Tag color="#EEF5FC" shadowColor="#AEE4FF" text="예시2" />
        <Tag color="#E0F1E4" shadowColor="#9ED9A9" text="예시3" />
        <Tag color="#E8D8EE" shadowColor="#D8ABEE" text="예시4" />
        <Tag color="#FCEBF3" shadowColor="#E3BCE0" text="예시5" />
        <Tag color="#FEEFEE" shadowColor="#FFCCCD" text="예시6" />
      </div>
    );
  },
};
