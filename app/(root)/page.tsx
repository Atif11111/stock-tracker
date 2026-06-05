import TradingViewWidget from "@/components/TradingViewWidget";
import {
  MARKET_OVERVIEW_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = (): React.JSX.Element => {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
          <div className="h-full rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg shadow-black/10 overflow-hidden hover:border-gray-600/50 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
            <div className="px-6 py-4 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Market Overview
              </h2>
              <p className="text-xs text-gray-500 mt-1">Global market indices & sectors</p>
            </div>
            <div className="p-6">
              <TradingViewWidget
                scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
                config={MARKET_OVERVIEW_WIDGET_CONFIG}
              />
            </div>
          </div>
        </section>

        <section className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
          <div className="h-full rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg shadow-black/10 overflow-hidden hover:border-gray-600/50 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
            <div className="px-6 py-4 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                Stock Heatmap
              </h2>
              <p className="text-xs text-gray-500 mt-1">Real-time market visualization</p>
            </div>
            <div className="p-6">
              <TradingViewWidget
                scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                config={MARKET_OVERVIEW_WIDGET_CONFIG}
              />
            </div>
          </div>
        </section>
      </div>

      <section className="transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
        <div className="w-full rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg shadow-black/10 overflow-hidden hover:border-gray-600/50 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              Market Quotes
            </h2>
            <p className="text-xs text-gray-500 mt-1">Live stock prices & tickers</p>
          </div>
          <div className="p-6">
            <TradingViewWidget
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
            />
          </div>
        </div>
      </section>

      <section className="transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
        <div className="w-full rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm shadow-lg shadow-black/10 overflow-hidden hover:border-gray-600/50 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              Latest News
            </h2>
            <p className="text-xs text-gray-500 mt-1">Stay updated with market news</p>
          </div>
          <div className="p-6">
            <TradingViewWidget
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;