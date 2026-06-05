'use client';
import { useEffect, useRef } from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        if (containerRef.current.dataset.loaded) return;

        const widgetContainer = document.createElement("div");
        widgetContainer.className = "tradingview-widget-container__widget";
        widgetContainer.style.cssText = `width: 100%; height: ${height}px; overflow: hidden;`;

        const widgetInner = document.createElement("div");
        widgetInner.className = "tradingview-widget-container__widget-inner";
        widgetInner.style.cssText = "width: 100%; height: 100%;";

        widgetContainer.appendChild(widgetInner);
        containerRef.current.appendChild(widgetContainer);

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.innerHTML = JSON.stringify({
            ...config,
            width: "100%",
            height: height,
        });

        containerRef.current.appendChild(script);
        containerRef.current.dataset.loaded = 'true';

        return () => {
            if(containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;
            }
        }
    }, [scriptUrl, config, height])

    return containerRef;
}
export default useTradingViewWidget