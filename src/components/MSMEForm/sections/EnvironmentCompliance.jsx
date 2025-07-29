import React from "react";
import { govtFormStyle } from "../utils/formStyles";
import { validateField } from "../utils/validation";

function EnvironmentCompliance({
  formData,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  errors
}) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1999 }, // From 2000 to current year
    (_, i) => currentYear - i
  );

  const handleCostChange = (index, value) => {
    if (validateField('numeric', value)) {
      handleArrayChange(
        "pollution",
        index,
        "cost",
        value === "" ? "" : Math.abs(Number(value))
    )}
  };

  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>8. पर्यावरण एवं अनुपालन</h3>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          20. प्रदूषण नियंत्रण मानकों का उपयोग
          <span className="text-gray-500 text-sm ml-2">(यदि लागू हो)</span>
        </h4>
        
        {formData.pollution.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded shadow-sm mb-3 border border-gray-200"
            aria-labelledby={`pollutionHeading-${index}`}
          >
            <h5 id={`pollutionHeading-${index}`} className="sr-only">
              प्रदूषण नियंत्रण उपकरण {index + 1}
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label 
                  htmlFor={`pollution-name-${index}`}
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  उपकरण/तकनीक का नाम
                  {index === 0 && <span className={govtFormStyle.requiredStar}>*</span>}
                </label>
                <input
                  id={`pollution-name-${index}`}
                  value={item.name || ""}
                  onChange={(e) => handleArrayChange("pollution", index, "name", e.target.value)}
                  className={`${govtFormStyle.inputField} ${
                    errors[`pollution[${index}].name`] ? "border-red-500" : ""
                  }`}
                  required={index === 0}
                  aria-required={index === 0 ? "true" : undefined}
                  aria-invalid={!!errors[`pollution[${index}].name`]}
                />
                {errors[`pollution[${index}].name`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`pollution[${index}].name`]}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor={`pollution-year-${index}`}
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  स्थापना वर्ष
                </label>
                <select
                  id={`pollution-year-${index}`}
                  value={item.year || ""}
                  onChange={(e) => handleArrayChange("pollution", index, "year", e.target.value)}
                  className={`${govtFormStyle.inputField} ${
                    errors[`pollution[${index}].year`] ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors[`pollution[${index}].year`]}
                >
                  <option value="">वर्ष चुनें</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors[`pollution[${index}].year`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`pollution[${index}].year`]}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor={`pollution-cost-${index}`}
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  लागत (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">₹</span>
                  <input
                    id={`pollution-cost-${index}`}
                    type="number"
                    value={item.cost || ""}
                    onChange={(e) => handleCostChange(index, e.target.value)}
                    min="0"
                    className={`${govtFormStyle.inputField} pl-8 ${
                      errors[`pollution[${index}].cost`] ? "border-red-500" : ""
                    }`}
                    aria-invalid={!!errors[`pollution[${index}].cost`]}
                    onKeyDown={(e) => {
                      if (["-", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {errors[`pollution[${index}].cost`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`pollution[${index}].cost`]}
                  </p>
                )}
              </div>

              <div className="flex items-end justify-end">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("pollution", index)}
                    className="text-red-600 text-sm hover:text-red-800 flex items-center"
                    aria-label={`Remove pollution control equipment ${index + 1}`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    हटाएँ
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addArrayItem("pollution", { name: "", year: "", cost: "" })}
          className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          aria-label="Add new pollution control equipment"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          नया उपकरण जोड़ें
        </button>
      </div>
    </div>
  );
}

export default EnvironmentCompliance;