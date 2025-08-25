"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../components/common/button/Button";

const Page = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-150px)] text-center text-gray-500">
      <div className="space-y-6">
        <h1>⚠️ 직접 접근할 수 없는 페이지입니다 ⚠️</h1>
        <p>
          잠시 후 홈으로 이동합니다... <b>{seconds}</b>초
        </p>
        <Button onClick={() => router.push("/")}>홈으로</Button>
      </div>
    </div>
  );
};

export default Page;
