import axios from "axios";

type WeatherConditionsProps = { text: string; emoji: string };
type WeatherData = {
  current_weather: { temperature: number; weathercode: number };
};

const weatherConditions: Record<number, WeatherConditionsProps> = {
  0: { text: "맑음", emoji: "☀️" },
  1: { text: "약간 흐림", emoji: "🌤️" },
  2: { text: "부분적으로 구름 많음", emoji: "⛅" },
  3: { text: "흐림", emoji: "☁️" },
  45: { text: "안개", emoji: "😶‍🌫️" },
  48: { text: "안개와 이슬", emoji: "😶‍🌫️💧" },
  51: { text: "약한 이슬비", emoji: "🌦️" },
  53: { text: "이슬비", emoji: "🌦️" },
  55: { text: "강한 이슬비", emoji: "🌧️" },
  61: { text: "약한 비", emoji: "🌧️" },
  63: { text: "비", emoji: "🌧️" },
  65: { text: "강한 비", emoji: "🌧️🌧️" },
  71: { text: "약한 눈", emoji: "🌨️" },
  73: { text: "눈", emoji: "🌨️" },
  75: { text: "강한 눈", emoji: "❄️" },
  95: { text: "천둥번개", emoji: "⛈️" },
  99: { text: "천둥번개와 우박", emoji: "🌩️❄️" },
};

export default async function Weather() {
  let weather: WeatherData | null = null;
  try {
    const res = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=37.6123&longitude=127.0174&current_weather=true"
    );
    weather = res.data;
  } catch (err) {
    console.error("Weather API 호출 실패:", err);
  }

  if (!weather)
    return (
      <span className="px-2 py-1 text-sm text-white bg-main-green rounded-xl">
        날씨 정보 없음
      </span>
    );

  const code = weather.current_weather.weathercode;
  return (
    <span className="px-2 py-1 text-sm text-white bg-main-green rounded-xl">
      {weatherConditions[code]?.emoji} {weatherConditions[code]?.text} /{" "}
      {weather.current_weather.temperature}°C
    </span>
  );
}
