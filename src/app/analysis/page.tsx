import { Suspense } from "react";
import AnalysisClientPage from "./AnalysisClientPage";
import Loading from "@/app/components/common/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AnalysisClientPage />
    </Suspense>
  );
}
