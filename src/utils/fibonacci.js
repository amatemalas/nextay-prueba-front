/**
 * Returns the Fibonacci sequence up to the nth term (0-indexed).
 *
 * Uses BigInt internally to avoid precision loss for large n.
 * Returns an array of strings so the UI can display big numbers faithfully.
 *
 * @param {number} n - Number of terms to generate (must be >= 0).
 * @returns {string[]} Fibonacci sequence as string values to prevent type issues.
 */
export function fibonacciSequence(n) {
  if (!Number.isInteger(n) || n < 0) return []

  if (n === 0) return []
  if (n === 1) return ['0']

  const seq = [0n, 1n]
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2])
  }
  return seq.map((v) => v.toString())
}
