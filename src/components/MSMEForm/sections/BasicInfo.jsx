import React from "react";
import { govtFormStyle } from "../utils/formStyles";
import { validateField } from "../utils/validation";

function BasicInfo({
  formData,
  handleChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  errors
}) {
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const onlyNums = value.replace(/\D/g, "");
    if (onlyNums.length <= 10) {
      handleChange({ target: { name, value: onlyNums } });
    }
  };

  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>1. मूल जानकारी</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            इकाई का नाम <span className={govtFormStyle.requiredStar}>*</span>
          </label>
          <input
            type="text"
            name="unitName"
            value={formData.unitName || ""}
            onChange={handleChange}
            className={`${govtFormStyle.inputField} ${
              errors.unitName ? "border-red-500" : ""
            }`}
            required
            aria-required="true"
            aria-invalid={!!errors.unitName}
            aria-describedby={errors.unitName ? "unitNameError" : undefined}
          />
          {errors.unitName && (
            <p id="unitNameError" className="text-red-600 text-sm mt-1">
              {errors.unitName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            क्या यह इकाई महिला उद्यमिता द्वारा स्थापित एवं संचालित है?
            <span className="text-gray-500 text-sm ml-1">(51% या अधिक हिस्सेदारी)</span>
          </label>
          <select
            name="isWomenEntrepreneur"
            value={formData.isWomenEntrepreneur || ""}
            onChange={handleChange}
            className={govtFormStyle.selectField}
            aria-label="महिला उद्यमिता स्थापित"
          >
            <option value="">चयन करें</option>
            <option value="हाँ">हाँ</option>
            <option value="नहीं">नहीं</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            क्या इकाई अन्य प्रकार से सक्षम उद्यमी द्वारा संचालित है?
            <span className="text-gray-500 text-sm ml-1">(51% या अधिक साझेदारी)</span>
          </label>
          <select
            name="capableEntrepreneur"
            value={formData.capableEntrepreneur || ""}
            onChange={handleChange}
            className={govtFormStyle.selectField}
            aria-label="सक्षम उद्यमी द्वारा संचालित"
          >
            <option value="">चयन करें</option>
            <option value="हाँ">हाँ</option>
            <option value="नहीं">नहीं</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            इकाई की श्रेणी <span className="text-gray-500 text-sm ml-1">(51% या अधिक साझेदारी)</span>
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className={govtFormStyle.selectField}
            aria-label="इकाई की श्रेणी"
          >
            <option value="">चयन करें</option>
            <option value="सामान्य">सामान्य</option>
            <option value="अजा">अजा</option>
            <option value="अजजा">अजजा</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          इकाई का प्रकार <span className={govtFormStyle.requiredStar}>*</span>
        </label>
        <select
          name="businessStructure"
          value={formData.businessStructure || ""}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.businessStructure ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
          aria-required="true"
          aria-invalid={!!errors.businessStructure}
        >
          <option value="">चयन करें</option>
          <option value="प्रोपराइटर">प्रोपराइटर</option>
          <option value="संस्था">संस्था</option>
          <option value="पार्टनरशिप">पार्टनरशिप</option>
          <option value="कंपनी">कंपनी</option>
          <option value="अन्य">अन्य</option>
        </select>
        {errors.businessStructure && (
          <p className="text-red-600 text-sm mt-1">{errors.businessStructure}</p>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          प्रोपराइटर/पार्टनर/डायरेक्टर विवरण
        </h4>
        {formData.proprietors.map((proprietor, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-sm mb-3 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {index === 0 ? "मुख्य " : ""}प्रोपराइटर/पार्टनर का नाम
                  {index === 0 && <span className={govtFormStyle.requiredStar}>*</span>}
                </label>
                <input
                  value={proprietor.name || ""}
                  onChange={(e) => handleArrayChange("proprietors", index, "name", e.target.value)}
                  className={`${govtFormStyle.inputField} ${
                    errors[`proprietors[${index}].name`] ? "border-red-500" : ""
                  }`}
                  required={index === 0}
                  aria-required={index === 0 ? "true" : undefined}
                />
                {errors[`proprietors[${index}].name`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`proprietors[${index}].name`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  हिस्सेदारी का प्रतिशत (%)
                  {index === 0 && <span className={govtFormStyle.requiredStar}>*</span>}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={proprietor.share || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (validateField('percentage', value)) {
                        handleArrayChange(
                          "proprietors",
                          index,
                          "share",
                          value === "" ? "" : Math.min(100, Math.max(0, Number(value)))
        )}
                    }}
                    min="0"
                    max="100"
                    step="1"
                    className={`${govtFormStyle.inputField} ${
                      errors[`proprietors[${index}].share`] ? "border-red-500" : ""
                    }`}
                    required={index === 0}
                    aria-required={index === 0 ? "true" : undefined}
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
                {errors[`proprietors[${index}].share`] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[`proprietors[${index}].share`]}
                  </p>
                )}
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeArrayItem("proprietors", index)}
                className="mt-2 text-red-600 text-sm hover:text-red-800 flex items-center"
                aria-label={`Remove proprietor ${index + 1}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                हटाएँ
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("proprietors", { name: "", share: "" })}
          className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          aria-label="Add new proprietor"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          नया प्रोपराइटर जोड़ें
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            इकाई स्वामि/भागीदार/संचालक/मुखत्यार का नाम एवं पद
          </label>
          <input
            type="text"
            name="director"
            value={formData.director || ""}
            onChange={handleChange}
            className={govtFormStyle.inputField}
            aria-label="संचालक का नाम एवं पद"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            मोबाइल नंबर <span className={govtFormStyle.requiredStar}>*</span>
          </label>
          <input
            inputMode="numeric"
            type="tel"
            name="mobile"
            value={formData.mobile || ""}
            onChange={handleNumericChange}
            maxLength="10"
            pattern="[0-9]{10}"
            className={`${govtFormStyle.inputField} ${
              errors.mobile ? "border-red-500" : ""
            }`}
            required
            aria-required="true"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "mobileError" : undefined}
          />
          {errors.mobile && (
            <p id="mobileError" className="text-red-600 text-sm mt-1">
              {errors.mobile}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            विनिर्माण उद्यम का प्रकार 
          </label>
          <select
            name="registeredEnterprise"
            value={formData.registeredEnterprise || ""}
            onChange={handleChange}
            className={govtFormStyle.selectField}
            aria-label="विनिर्माण उद्यम का प्रकार"
          >
            <option value="">चयन करें</option>
            <option value="सूक्ष्म">सूक्ष्म</option>
            <option value="लघु">लघु</option>
            <option value="मध्यम">मध्यम</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            टेलीफोन नंबर
          </label>
          <input
            inputMode="numeric"
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleNumericChange}
            maxLength="10"
            pattern="[0-9]{10}"
            className={govtFormStyle.inputField}
            aria-label="टेलीफोन नंबर"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            ई-मेल
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className={`${govtFormStyle.inputField} ${
              errors.email ? "border-red-500" : ""
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "emailError" : undefined}
          />
          {errors.email && (
            <p id="emailError" className="text-red-600 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            जीएसटी क्रमांक
          </label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber || ""}
            onChange={handleChange}
            className={govtFormStyle.inputField}
            aria-label="जीएसटी क्रमांक"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          इकाई पता <span className={govtFormStyle.requiredStar}>*</span>
        </label>
        <textarea
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          rows="3"
          className={`${govtFormStyle.inputField} ${
            errors.address ? "border-red-500" : ""
          }`}
          required
          aria-required="true"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? "addressError" : undefined}
        ></textarea>
        {errors.address && (
          <p id="addressError" className="text-red-600 text-sm mt-1">
            {errors.address}
          </p>
        )}
      </div>
    </div>
  );
}

export default BasicInfo;