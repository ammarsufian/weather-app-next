import { getWeatherData } from "@/actions/getWeatherData"
import CurrentWeather from "@/components/widgets/CurrentWeather"
import HourlyForecast from "@/components/widgets/HourlyForecast"
import Map from "@/components/widgets/Map"
import OtherLargeCities from "@/components/widgets/OtherLargeCities"
import TenDayForecast from "@/components/widgets/TenDayForecast"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import { DEFAULT_LOCATION } from "@/lib/config"
import { HourlyForecastData } from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
  description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
}

export default async function Home() {
  const { lat, lon } = DEFAULT_LOCATION.coord

  const WeatherDataRequest: HourlyForecastData = await getWeatherData({
    lat,
    lon,
  })
  const [weather_data] = await Promise.all([WeatherDataRequest])

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
