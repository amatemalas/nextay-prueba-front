export async function fetchRoomTypesSummary() {
  const res = await fetch(`/api/room-types/summary`)
  if (!res.ok) throw new Error(`Summary request failed: ${res.status}`)
  const json = await res.json()
  return json.data
}

export async function fetchRoomTypesLatestRates() {
  const res = await fetch(`/api/room-types/latest-rates`)
  if (!res.ok) throw new Error(`Latest rates request failed: ${res.status}`)
  const json = await res.json()
  return json.data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.latest_rate?.price,
    valid_from: item.latest_rate?.valid_from,
  }))
}
