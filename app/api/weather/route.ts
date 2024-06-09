export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
 const city = searchParams.get("city")

  if (!lat || !lon) {
    return Response.json({ message: "Missing parameters" }, { status: 400 })
  }

  const res = await fetch(
    `http://localhost:8000/api/weather?city=${city}&lat=${lat}&lon=${lon}&units=metric`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return Response.json(data)
}
