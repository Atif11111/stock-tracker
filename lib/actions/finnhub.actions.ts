"use server"

export async function searchStocks(query: string): Promise<StockWithWatchlistStatus[]> {
  if (!query || query.trim().length === 0) return [];

  try {
    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) throw new Error("Finnhub API key not configured");

    const res = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${apiKey}`
    );
    if (!res.ok) return [];
    const data: FinnhubSearchResponse = await res.json();

    return data.result.slice(0, 20).map((item) => ({
      symbol: item.symbol,
      name: item.description,
      exchange: item.displaySymbol ?? item.symbol,
      type: item.type,
      isInWatchlist: false,
    }));
  } catch {
    return [];
  }
}