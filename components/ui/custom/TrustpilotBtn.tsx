"use client";
import { useEffect } from "react";

const TrustBox = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="">
      <div
        className="trustpilot-widget rounded-lg"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="67c44e950f06558c32236e93"
        data-style-height="52px"
        data-style-width="100%"
        
      >
        <a
          href="https://www.trustpilot.com/review/partyvote.ciac.me"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
};

export default TrustBox;
