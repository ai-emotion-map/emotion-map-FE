import { BackendTag } from "./../components/common/tag/tag.types";

export interface searchMarker {
  id: number;
  lat: number;
  lng: number;
  roadAddress: string;
  placeName: string | null;
  content: string;
  tags: BackendTag[];
  createdAt: string;
}
