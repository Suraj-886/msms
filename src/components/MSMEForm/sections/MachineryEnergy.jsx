import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function MachineryEnergy({ 
  formData, 
  handleChange, 
  handleArrayChange, 
  addArrayItem, 
  removeArrayItem, 
  errors 
}) {
  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>3. मशीनरी एवं ऊर्जा</h3>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">संयंत्र एवं मशीनरी</h4>
        
        {formData.machinery.map((machine, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-sm mb-3 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  स्थापित संयंत्र एवं मशीनरी का नाम
                  <span className={govtFormStyle.requiredStar}>*</span>
                </label>
                <input
                  value={machine.name}
                  onChange={(e) => handleArrayChange("machinery", index, "name", e.target.value)}
                  className={`${govtFormStyle.inputField} ${
                    errors.machinery && errors.machinery[index]?.name ? "border-red-500" : ""
                  }`}
                  aria-required="true"
                  aria-invalid={!!(errors.machinery && errors.machinery[index]?.name)}
                />
                {errors.machinery && errors.machinery[index]?.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.machinery[index].name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  आयातित / स्वदेशी
                  <span className={govtFormStyle.requiredStar}>*</span>
                </label>
                <select
                  value={machine.imported}
                  onChange={(e) => handleArrayChange("machinery", index, "imported", e.target.value)}
                  className={`${govtFormStyle.selectField} ${
                    errors.machinery && errors.machinery[index]?.imported ? "border-red-500" : ""
                  }`}
                  aria-required="true"
                  aria-invalid={!!(errors.machinery && errors.machinery[index]?.imported)}
                >
                  <option value="">चयन करें</option>
                  <option value="स्वदेशी">स्वदेशी</option>
                  <option value="आयातित">आयातित</option>
                </select>
                {errors.machinery && errors.machinery[index]?.imported && (
                  <p className="text-red-600 text-sm mt-1">{errors.machinery[index].imported}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  ₹ मूल्य
                  <span className={govtFormStyle.requiredStar}>*</span>
                </label>
                <input
                  type="number"
                  value={machine.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
                      handleArrayChange(
                        "machinery",
                        index,
                        "value",
                        value === "" ? "" : Math.abs(Number(value))
                      );
                    }
                  }}
                  min="0"
                  step="any"
                  className={`${govtFormStyle.inputField} ${
                    errors.machinery && errors.machinery[index]?.value ? "border-red-500" : ""
                  }`}
                  aria-required="true"
                  aria-invalid={!!(errors.machinery && errors.machinery[index]?.value)}
                />
                {errors.machinery && errors.machinery[index]?.value && (
                  <p className="text-red-600 text-sm mt-1">{errors.machinery[index].value}</p>
                )}
              </div>
              
              <div className="flex items-end">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("machinery", index)}
                    className="text-red-600 text-sm hover:text-red-800 flex items-center"
                    aria-label="Remove machinery"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          onClick={() => addArrayItem("machinery", { name: "", imported: "", value: "" })}
          className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          aria-label="Add new machinery"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          नई मशीनरी जोड़ें
        </button>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          ऊर्जा का स्रोत एवं वार्षिक खर्च
          <span className={govtFormStyle.requiredStar}>*</span>
        </h4>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <textarea
            name="energySource"
            value={formData.energySource}
            onChange={handleChange}
            rows={3}
            className={`${govtFormStyle.inputField} ${
              errors.energySource ? "border-red-500" : ""
            }`}
            placeholder="ऊर्जा का स्रोत एवं वार्षिक खर्च विवरण डालें"
            aria-required="true"
            aria-invalid={!!errors.energySource}
          />
          {errors.energySource && (
            <p className="text-red-600 text-sm mt-1">{errors.energySource}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MachineryEnergy;