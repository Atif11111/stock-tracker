"use client"

import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchStocks } from "@/lib/actions/finnhub.actions"

export default function SearchCommand({ renderAs = "button", label = "Search stocks", initialStocks = [] }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks)
  const router = useRouter()

  const isSearchMode = !!searchTerm.trim()
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSearch = async () => {
    if (!isSearchMode) return setStocks(initialStocks)

    setLoading(true)
    try {
      const results = await searchStocks(searchTerm.trim())
      setStocks(results)
    } catch {
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 300)

  useEffect(() => {
    debouncedSearch()
  }, [searchTerm])

  const handleSelectStock = (symbol: string) => {
    setOpen(false)
    setSearchTerm("")
    setStocks(initialStocks)
    router.push(`/stocks/${symbol}`)
  }

  if (!open) {
    return (
      <>
        {renderAs === "text" ? (
          <span onClick={() => setOpen(true)} className="search-text">
            {label}
          </span>
        ) : (
          <Button onClick={() => setOpen(true)} className="search-btn">
            <Search className="h-4 w-4" />
            {label}
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl">
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center border-b border-gray-700 px-4">
            <Search className="h-4 w-4 text-gray-500 mr-3" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stocks..."
              className="flex-1 h-14 bg-transparent text-gray-200 placeholder:text-gray-500 outline-none text-base"
            />
            {loading && <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />}
            <button
              onClick={() => setOpen(false)}
              className="ml-3 p-1 rounded-md hover:bg-gray-700 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center text-gray-500">Loading stocks...</div>
            ) : displayStocks?.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                {isSearchMode ? "No results found" : "No stocks available"}
              </div>
            ) : (
              <div>
                <div className="px-4 py-2 text-xs text-gray-500 bg-gray-800/50 border-b border-gray-700">
                  {isSearchMode ? "Search results" : "Popular stocks"} ({displayStocks?.length || 0})
                </div>
                {displayStocks?.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleSelectStock(stock.symbol)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-colors text-left border-b border-gray-700/50 last:border-b-0"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-200 truncate">
                        {stock.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stock.symbol} • {stock.exchange} • {stock.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}