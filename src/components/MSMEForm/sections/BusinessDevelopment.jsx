import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function BusinessDevelopment({ formData, handleChange, errors }) {
  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>9. व्यावसायिक विकास</h3>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          21. क्या वेण्डर डेवलपमेंट कार्यक्रम का आयोजन किया गया है?
          <span className="text-gray-500 text-sm ml-2">(यदि हाँ, तो विवरण दें)</span>
        </h4>
        
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                आयोजन किया गया?
              </label>
              <select
                name="vendorDev"
                value={formData.vendorDev || ""}
                onChange={handleChange}
                className={`${govtFormStyle.selectField} ${
                  errors.vendorDev ? "border-red-500" : ""
                }`}
                aria-label="वेण्डर डेवलपमेंट कार्यक्रम आयोजन"
                aria-describedby={errors.vendorDev ? "vendorDevError" : undefined}
              >
                <option value="">चयन करें</option>
                <option value="हाँ">हाँ</option>
                <option value="नहीं">नहीं</option>
              </select>
              {errors.vendorDev && (
                <p id="vendorDevError" className="text-red-600 text-sm mt-1">
                  {errors.vendorDev}
                </p>
              )}
            </div>

            {formData.vendorDev === "हाँ" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  कार्यक्रम विवरण
                  <span className={govtFormStyle.requiredStar}>*</span>
                </label>
                <textarea
                  name="vendorDevDesc"
                  value={formData.vendorDevDesc || ""}
                  onChange={handleChange}
                  rows={3}
                  className={`${govtFormStyle.inputField} ${
                    errors.vendorDevDesc ? "border-red-500" : ""
                  }`}
                  placeholder="कार्यक्रम का विवरण, तिथि, और परिणाम दर्ज करें"
                  aria-label="वेण्डर डेवलपमेंट कार्यक्रम विवरण"
                  aria-required="true"
                  aria-invalid={!!errors.vendorDevDesc}
                  aria-describedby={errors.vendorDevDesc ? "vendorDevDescError" : undefined}
                />
                {errors.vendorDevDesc && (
                  <p id="vendorDevDescError" className="text-red-600 text-sm mt-1">
                    {errors.vendorDevDesc}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  उदाहरण: "15 जनवरी 2023 को आपूर्तिकर्ता प्रशिक्षण कार्यक्रम आयोजित किया गया, जिसमें 12 वेंडर्स ने भाग लिया"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDevelopment;