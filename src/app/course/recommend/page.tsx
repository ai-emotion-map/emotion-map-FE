import { Suspense } from "react";
import RecommendCourseClient from "./client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RecommendCourseClient />
    </Suspense>
  );
}
