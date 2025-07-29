import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function HumanResources({
  formData,
  handleChange,
  toggleFacility,
  handleFileChange,
  errors
}) {
  const facilitiesMap = {
    toilet: "शौचालय",
    canteen: "कैंटीन",
    health: "स्वास्थ्य सुविधा",
    recreation: "मनोरंजन",
    library: "पुस्तकालय",
    transport: "परिवहन"
  };

  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>7. मानव संसाधन</h3>

      <div className="mb-6">
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                17. (i) क्या इकाई द्वारा कर्मचारियों के चयन हेतु सेलेक्शन प्रणाली निर्धारित किया गया है?
                <span className="text-gray-500 text-sm ml-1">(यदि हाँ, तो विवरण दें)</span>
              </label>
              <select
                name="hireSetup"
                value={formData.hireSetup || ""}
                onChange={handleChange}
                className={`${govtFormStyle.selectField} ${
                  errors.hireSetup ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.hireSetup}
              >
                <option value="">चयन करें</option>
                <option value="हाँ">हाँ</option>
                <option value="नहीं">नहीं</option>
              </select>
              {errors.hireSetup && (
                <p className="text-red-600 text-sm mt-1">{errors.hireSetup}</p>
              )}
            </div>
            {formData.hireSetup === "हाँ" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  विवरण
                  <span className={govtFormStyle.requiredStar}>*</span>
                </label>
                <textarea
                  name="hireSetupDesc"
                  value={formData.hireSetupDesc || ""}
                  onChange={handleChange}
                  rows={2}
                  className={`${govtFormStyle.inputField} ${
                    errors.hireSetupDesc ? "border-red-500" : ""
                  }`}
                  placeholder="चयन प्रक्रिया का विवरण दें"
                  aria-required="true"
                  aria-invalid={!!errors.hireSetupDesc}
                />
                {errors.hireSetupDesc && (
                  <p className="text-red-600 text-sm mt-1">{errors.hireSetupDesc}</p>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                (ii) क्या इकाई द्वारा कर्मचारियों हेतु प्रशिक्षण आयोजित किया गया है?
                <span className="text-gray-500 text-sm ml-1">(यदि हाँ, तो विवरण दें)</span>
              </label>
              <select
                name="training"
                value={formData.training || ""}
                onChange={handleChange}
                className={`${govtFormStyle.selectField} ${
                  errors.training ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.training}
              >
                <option value="">चयन करें</option>
                <option value="हाँ">हाँ</option>
                <option value="नहीं">नहीं</option>
              </select>
              {errors.training && (
                <p className="text-red-600 text-sm mt-1">{errors.training}</p>
              )}
            </div>
            {formData.training === "हाँ" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  विवरण
                  <span className={govtFormStyle.requiredStar}>*</span>
                </label>
                <textarea
                  name="trainingDesc"
                  value={formData.trainingDesc || ""}
                  onChange={handleChange}
                  rows={2}
                  className={`${govtFormStyle.inputField} ${
                    errors.trainingDesc ? "border-red-500" : ""
                  }`}
                  placeholder="प्रशिक्षण कार्यक्रम का विवरण दें"
                  aria-required="true"
                  aria-invalid={!!errors.trainingDesc}
                />
                {errors.trainingDesc && (
                  <p className="text-red-600 text-sm mt-1">{errors.trainingDesc}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          18. कर्मचारियों को दी जाती सुविधाएं
          <span className="text-gray-500 text-sm ml-2">(सभी लागू विकल्प चुनें)</span>
        </h4>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(formData.facilities).map(([facility, value]) => (
              <div key={facility} className="flex items-center">
                <input
                  type="checkbox"
                  id={`facility-${facility}`}
                  checked={value}
                  onChange={() => toggleFacility(facility)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  aria-labelledby={`facility-label-${facility}`}
                />
                <label
                  id={`facility-label-${facility}`}
                  htmlFor={`facility-${facility}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {facilitiesMap[facility]}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          19. कर्मचारियों/श्रमिको के लिये पेंशन योजना में योगदान की जानकारी
          <span className="text-gray-500 text-sm ml-2">(संक्षिप्त विवरण दें एवं दस्तावेज संलग्न करें)</span>
        </h4>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <textarea
            name="pensionInfo"
            value={formData.pensionInfo || ""}
            onChange={handleChange}
            rows={3}
            className={`${govtFormStyle.inputField} ${
              errors.pensionInfo ? "border-red-500" : ""
            }`}
            placeholder="पेंशन योजना का नाम, योगदान विवरण और कवरेज दर्ज करें"
            aria-invalid={!!errors.pensionInfo}
          />
          {errors.pensionInfo && (
            <p className="text-red-600 text-sm mt-1">{errors.pensionInfo}</p>
          )}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              दस्तावेज संलग्न करें (PDF/JPG/PNG, अधिकतम 5MB)
              {formData.pensionInfo && <span className={govtFormStyle.requiredStar}>*</span>}
            </label>
            <input
              type="file"
              onChange={handleFileChange("pensionDocument")}
              accept=".pdf,.jpg,.jpeg,.png"
              className={`mt-1 block h-9 w-full text-sm text-gray-700 border ${
                errors.pensionDocument ? "border-red-500" : "border-gray-300"
              } rounded-md cursor-pointer focus:outline-none`}
              aria-required={!!formData.pensionInfo}
              aria-invalid={!!errors.pensionDocument}
            />
            {formData.pensionDocument ? (
              <div className="mt-2 flex items-center">
                <span className="text-sm text-green-600">
                  {formData.pensionDocument.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleChange({
                    target: { name: "pensionDocument", value: null }
                  })}
                  className="ml-2 text-red-600 hover:text-red-800"
                  aria-label="Remove pension document"
                >
                  ×
                </button>
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-500">
                कृपया पेंशन योजना से संबंधित दस्तावेज अपलोड करें
              </p>
            )}
            {errors.pensionDocument && (
              <p className="text-red-600 text-sm mt-1">{errors.pensionDocument}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumanResources;