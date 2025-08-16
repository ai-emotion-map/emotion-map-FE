import React from "react";

type reviewProps = {
  content: string;
  name: string;
  date: string;
};

const Review = ({ content, name, date }: reviewProps) => {
  return (
    <div className="flex flex-col gap-2 p-5 w-[300px] rounded-3xl bg-background h-32">
      <div className="flex text-sm">
        <p>
          {name} | {date}
        </p>
      </div>
      <p className="text-[13px] text-center">{content}</p>
    </div>
  );
};

export default Review;
