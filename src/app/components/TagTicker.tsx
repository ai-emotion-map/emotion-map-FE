import Tag, { TagProps } from "./common/tag/Tag";

type TagRowProps = {
  tags: TagProps[];
  direction?: "left" | "right";
  speed?: string;
};

function TagRow({ tags, direction = "left", speed = "30s" }: TagRowProps) {
  return (
    <div
      className="relative w-full overflow-hidden py-1
                 [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)]"
    >
      <div
        className={`flex w-max gap-2 ${direction === "left" ? "animate-scrollLeft" : "animate-scrollRight"}`}
        style={{ animationDuration: speed }}
      >
        {/* 원본 */}
        <ul className="flex gap-3">
          {tags.map((tag, i) => (
            <Tag key={i} variant={tag.variant} />
          ))}
        </ul>

        {/* 복제본 */}
        <ul className="flex gap-3" aria-hidden="true">
          {tags.map((tag, i) => (
            <Tag key={i} variant={tag.variant} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TagTicker() {
  const tags: TagProps[] = [
    { variant: "가족 🏠" },
    { variant: "우정 🤝" },
    { variant: "위로/치유 🌱" },
    { variant: "외로움 🌙" },
    { variant: "설렘/사랑 💌" },
    { variant: "향수 🌿" },
  ];

  return (
    <div>
      {/* 위: 왼쪽으로 */}
      <TagRow tags={tags} direction="left" speed="30s" />
      {/* 아래: 오른쪽으로, 속도도 살짝 다르게 */}
      <TagRow tags={tags} direction="right" speed="30s" />
    </div>
  );
}
