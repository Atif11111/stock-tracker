import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function StockPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">{symbol}</h1>
        <p className="text-gray-400 mt-1">Stock details and analysis</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-yellow-400 mb-2">{symbol}</div>
          <p className="text-gray-400 text-lg">Full stock details coming soon</p>
          <p className="text-gray-500 mt-2">
            Real-time charts, financials, and news will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}