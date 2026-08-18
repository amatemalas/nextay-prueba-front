async function handleErrorResponse(res) {
  let message = `Error ${res.status}`
  try {
    const body = await res.json()
    if (body.message) message = body.message
  } catch {
    // response body is not JSON — keep the default message
  }
  throw new Error(message)
}

export async function fetchRoomTypesSummary() {
  const res = await fetch(`/api/room-types/summary`)
  if (!res.ok) await handleErrorResponse(res)
  const json = await res.json()
  return json.data
}

export async function fetchRoomTypesLatestRates() {
  const res = await fetch(`/api/room-types/latest-rates`)
  if (!res.ok) await handleErrorResponse(res)
  const json = await res.json()
  return json.data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.latest_rate?.price,
    valid_from: item.latest_rate?.valid_from,
  }))
}
