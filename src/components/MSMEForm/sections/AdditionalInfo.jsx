import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function AdditionalInfo({ formData, handleChange, errors }) {
  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>10. अतिरिक्त जानकारी</h3>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          22. अन्य कोई जानकारी, जो आवश्यक समझें
          <span className="text-gray-500 text-sm ml-2">(वैकल्पिक)</span>
        </h4>
        
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <textarea
            name="otherInfo"
            value={formData.otherInfo || ""}
            onChange={handleChange}
            rows={4}
            maxLength={1000}
            placeholder="उत्पादन प्रक्रिया, विशेष उपलब्धियाँ, या अन्य प्रासंगिक जानकारी दें..."
            className={`${govtFormStyle.inputField} ${
              errors.otherInfo ? "border-red-500" : ""
            }`}
            aria-label="अतिरिक्त जानकारी"
            aria-describedby="otherInfoHelp"
          />
          <div id="otherInfoHelp" className="text-xs text-gray-500 mt-1">
            अधिकतम 1000 अक्षर (वर्तमान: {formData.otherInfo?.length || 0})
          </div>
          {errors.otherInfo && (
            <p className="text-red-600 text-sm mt-1">{errors.otherInfo}</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdditionalInfo;