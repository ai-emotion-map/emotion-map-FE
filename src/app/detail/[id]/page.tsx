import { Api } from "@/app/api/api";
import React from "react";
import { DetailClient } from "./client";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  // 서버에서 마커 데이터 가져오기
  const markersData = await Api.getPostById(id);
  console.log(markersData);

  return <DetailClient markersData={markersData} />;
};

export default Page;
