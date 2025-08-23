import { Api } from "@/app/api/api";
import React from "react";
import { DetailClient } from "./client";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const id = Number(params.id);

  // 서버에서 마커 데이터 가져오기
  const markersData = await Api.getPostById(id);
  console.log(markersData);

  return <DetailClient markersData={markersData} />;
};

export default Page;
