/**
 * Parses a failed HTTP response and throws an Error with the server message.
 *
 * Attempts to read a JSON body for a human-readable `message` field.
 * Falls back to "Error <status>" when the body is missing or not JSON.
 *
 * @param {Response} res - The failed fetch Response (res.ok is false).
 * @throws {Error} Always throws with the extracted or default message.
 * @returns {Promise<never>}
 */
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

/**
 * Fetches the room-type summary (name, rates count, average price).
 *
 * Calls `GET /api/room-types/summary` via the Vite dev-server proxy.
 *
 * @returns {Promise<Array<{id: number, name: string, rates_count: number, average_price: number}>>}
 *   The `data` array from the JSON response.
 * @throws {Error} When the HTTP status is not OK.
 */
export async function fetchRoomTypesSummary() {
  const res = await fetch(`/api/room-types/summary`)
  if (!res.ok) await handleErrorResponse(res)
  const json = await res.json()
  return json.data
}

/**
 * Fetches the latest rate for each room type.
 *
 * Calls `GET /api/room-types/latest-rates` and maps each item into a flat
 * object with `id`, `name`, `price`, and `valid_from` fields extracted
 * from the nested `latest_rate` relationship.
 *
 * @returns {Promise<Array<{id: number, name: string, price: number|null, valid_from: string|null}>>}
 *   Mapped room-type records with their most recent rate.
 * @throws {Error} When the HTTP status is not OK.
 */
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
