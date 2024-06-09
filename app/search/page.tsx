import { getWeatherData } from "@/actions/getWeatherData"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import { Metadata } from "next"
import CurrentWeather from "@/components/widgets/CurrentWeather"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: searchParamsProps
}): Promise<Metadata> {
  const { lat, lon } = searchParams
  const url = `https://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  const data = await fetch(url).then((res) => res.json())

  return {
    title: `${data.city.name} - Weather Forecast`,
    description: `${data.city.name} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
  }
}

interface searchParamsProps {
  lat: string
  lon: string
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: searchParamsProps
}) {
  const { lat, lon } = searchParams

  const weather_data = Promise.all([getWeatherData(searchParams)])

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather data={weather_data.data!} />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets data={weather_data.data!} />
        </section>
      </div>
    </>
  )
}
