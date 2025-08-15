import NaverMap from "./components/navermap/NaverMap";

export default function Home() {
  return (
    <>
      <p>홈 페이지</p>
      <NaverMap lat={37.5665} lng={126.978} zoom={12} />
    </>
  );
}
