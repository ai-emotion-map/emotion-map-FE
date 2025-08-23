import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json({ error: "keyword required" }, { status: 400 });
  }

  const clientId = process.env.NAVER_CLIENT_ID!;
  const clientSecret = process.env.NAVER_CLIENT_SECRET!;
  console.log(clientId, clientSecret);

  const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    keyword
  )}&display=10`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "네이버맵 API 에러" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data.items);
}
