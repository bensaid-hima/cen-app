const API_KEY = 'ef41003e19bcd2c694f1b11831f1df4c'
const BASE_URL = 'https://gnews.io/api/v4/search'

export async function fetchHighlights() {
  try {
    const response = await fetch(
      `${BASE_URL}?q=education&lang=en&country=us&max=10&apikey=${API_KEY}`
    )

    if (!response.ok) throw new Error('Failed to fetch highlights')

    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error('❌ Error fetching highlights:', error)
    return []
  }
}
