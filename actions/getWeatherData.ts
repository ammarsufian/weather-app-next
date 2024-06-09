export const getWeatherData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const data = await fetch(
    `http://localhost:8000/api/weather?city=amman&lat=31.9132721&lon=35.9914376&units=metric`
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
