import TradingViewWidget from "@/components/TradingViewWidget";
import {
  MARKET_OVERVIEW_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = (): React.JSX.Element => {
  return (
    <>
      <section className="flex flex-col gap-10">
        <div className="w-full px-4 py-6 rounded-lg bg-gray-800 border border-gray-700 center-ed">
          <TradingViewWidget
            title="Market Data"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
          />
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="w-full px-4 py-6 rounded-lg bg-gray-800 border border-gray-700 center-ed">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
          />
        </div>
      </section>

     <section className="flex flex-col gap-10">
        <div className="w-full px-4 py-6 rounded-lg bg-gray-800 border border-gray-700 center-ed">
          <TradingViewWidget
            title="Top News"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
          />
        </div>
      </section>
     <section className="flex flex-col gap-10">
        <div className="w-full px-4 py-6 rounded-lg bg-gray-800 border border-gray-700 center-ed">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
          />
        </div>
      </section>
    </>
  );
};

export default Home;