export type BackendTag =
  // back용
  | "가족"
  | "우정"
  | "위로/치유"
  | "외로움"
  | "설렘/사랑"
  | "향수"
  | "기쁨/신남"
  | "화남/분노";

export type TagVariant =
  // front용
  | "가족 🏠"
  | "우정 🤝"
  | "위로/치유 🌱"
  | "외로움 🌙"
  | "설렘/사랑 💌"
  | "향수 🌿"
  | "기쁨/신남 🎉"
  | "화남/분노 😡"
  | "기본";

export const TAG_MAP: Record<BackendTag, TagVariant> = {
  // 서버에서 받아와서 렌더링 할 때
  가족: "가족 🏠",
  우정: "우정 🤝",
  "위로/치유": "위로/치유 🌱",
  외로움: "외로움 🌙",
  "설렘/사랑": "설렘/사랑 💌",
  향수: "향수 🌿",
  "기쁨/신남": "기쁨/신남 🎉",
  "화남/분노": "화남/분노 😡",
};

export const REVERSE_TAG_MAP: Record<TagVariant, BackendTag> =
  // 프론트에서 서버로 보낼 때
  Object.fromEntries(
    Object.entries(TAG_MAP).map(([backend, frontend]) => [frontend, backend])
  ) as Record<TagVariant, BackendTag>;

export const TAG_STYLES: Record<
  TagVariant,
  { color: string; shadowColor: string }
> = {
  "가족 🏠": { color: "#FDFAE8", shadowColor: "#E7E0A0" },
  "우정 🤝": { color: "#EEF5FC", shadowColor: "#AEE4FF" },
  "위로/치유 🌱": { color: "#E0F1E4", shadowColor: "#9ED9A9" },
  "외로움 🌙": { color: "#E8D8EE", shadowColor: "#D8ABEE" },
  "설렘/사랑 💌": { color: "#FCEBF3", shadowColor: "#E3BCE0" },
  "향수 🌿": { color: "#FEEFEE", shadowColor: "#FFCCCD" },
  "기쁨/신남 🎉": { color: "#E1FFFD", shadowColor: "#BDFFFB" },
  "화남/분노 😡": { color: "#D3AC84", shadowColor: "#FCA5A5" },
  기본: { color: "#B9B9B9", shadowColor: "#757575" },
};

export type TagProps = {
  variant: TagVariant;
  type?: "default" | "small" | "cancel" | "add";
  onClick?: () => void;
  isActive?: boolean;
  cancleOnclick?: () => void;
  addOnClick?: () => void;
};
