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
            <Tag
              key={i}
              color={tag.color}
              shadowColor={tag.shadowColor}
              text={tag.text}
            />
          ))}
        </ul>

        {/* 복제본 */}
        <ul className="flex gap-3" aria-hidden="true">
          {tags.map((tag, i) => (
            <Tag
              key={i}
              color={tag.color}
              shadowColor={tag.shadowColor}
              text={tag.text}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TagTicker() {
  const tags = [
    // color="#FDFAE8" shadowColor="#E7E0A0" text="예시1"
    // color="#EEF5FC" shadowColor="#AEE4FF" text="예시2" />
    //     <Tag color="#E0F1E4" shadowColor="#9ED9A9" text="예시3" />
    //     <Tag color="#E8D8EE" shadowColor="#D8ABEE" text="예시4" />
    //     <Tag color="#FCEBF3" shadowColor="#E3BCE0" text="예시5" />
    //     <Tag color="#FEEFEE" shadowColor="#FFCCCD" text="예시6"
    { color: "#FDFAE8", shadowColor: "#E7E0A0", text: "가족 🏠" },
    { color: "#EEF5FC", shadowColor: "#AEE4FF", text: "우정 🤝" },
    { color: "#E0F1E4", shadowColor: "#9ED9A9", text: "위로/치유 🌱" },
    { color: "#E8D8EE", shadowColor: "#D8ABEE", text: "외로움 🌙" },
    { color: "#FCEBF3", shadowColor: "#E3BCE0", text: "설렘/사랑 💌" },
    { color: "#FEEFEE", shadowColor: "#FFCCCD", text: "향수 🌿" },
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
