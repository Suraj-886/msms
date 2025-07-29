import React from "react";
import { govtFormStyle } from "./utils/formStyles";

function FormHeader({ logoUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" }) {
  return (
    <header className={`${govtFormStyle.header} print:bg-white print:text-black`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-4">
        <div className="flex-shrink-0">
          <img
            src={logoUrl}
            alt="Indian Flag"
            className="h-12 md:h-12 w-auto object-contain"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-flag.png";
            }}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold">मध्य प्रदेश सरकार</h1>
          <h2 className="text-lg md:text-xl">सूक्ष्म, लघु एवं मध्यम उद्यम विभाग</h2>
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-center mt-4 md:mt-4 print:mt-2">
        म.प्र. एमएसएमई राज्य स्तरीय पुरस्कार योजना आवेदन
      </h3>
    </header>
  );
}
export default FormHeader;