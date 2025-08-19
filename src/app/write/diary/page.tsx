"use client";

import { Suspense } from "react";
import DiaryForm from "./DiaryForm";
import Loading from "@/app/components/common/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DiaryForm />
    </Suspense>
  );
}
