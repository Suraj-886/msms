import React from "react";
import { govtFormStyle } from "../utils/formStyles";
import { validateField } from "../utils/validation";

function FinancialInfo({
  formData,
  handleChange,
  handleNestedChange,
  handleFileChange,
  errors
}) {
  const propertyTotal = (
    Number(formData.property.land || 0) +
    Number(formData.property.building || 0) +
    Number(formData.property.plantMachinery || 0) +
    Number(formData.property.otherAssets || 0)
  ).toLocaleString("en-IN");

  const handlePropertyChange = (field, value) => {
    if (validateField('numeric', value)) {
      handleNestedChange(
        "property",
        field,
        value === "" ? "" : Math.max(0, Number(value))
      );
    }
  };

  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>2. वित्तीय जानकारी</h3>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          2. वैध ईवीएम भाग-2 / यूएएम / स्थायी पंजीयन क्रमांक
          <span className={govtFormStyle.requiredStar}>*</span>
        </label>
        <input
          type="text"
          name="udyamNumber"
          value={formData.udyamNumber || ""}
          onChange={handleChange}
          className={`${govtFormStyle.inputField} ${
            errors.udyamNumber ? "border-red-500" : ""
          }`}
          required
          aria-required="true"
          aria-invalid={!!errors.udyamNumber}
          aria-describedby={errors.udyamNumber ? "udyamNumberError" : undefined}
        />
        {errors.udyamNumber && (
          <p id="udyamNumberError" className="text-red-600 text-sm mt-1">
            {errors.udyamNumber}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          3. क्या विगत तीन वर्षों में आयकर रिटर्न जमा किया गया है?
          <span className="text-gray-500 text-sm ml-1">(यदि हाँ, तो छायाप्रति संलग्न करें)</span>
        </label>
        <select
          name="filedITR"
          value={formData.filedITR || ""}
          onChange={handleChange}
          className={`${govtFormStyle.selectField} ${
            errors.filedITR ? "border-red-500" : ""
          }`}
          aria-invalid={!!errors.filedITR}
        >
          <option value="">चयन करें</option>
          <option value="हाँ">हाँ</option>
          <option value="नहीं">नहीं</option>
        </select>
        {errors.filedITR && (
          <p className="text-red-600 text-sm mt-1">{errors.filedITR}</p>
        )}
      </div>

      {formData.filedITR === "हाँ" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            आयकर रिटर्न प्रमाण पत्र (PDF/JPG/PNG, अधिकतम 5MB)
            <span className={govtFormStyle.requiredStar}>*</span>
          </label>
          <input
            type="file"
            onChange={handleFileChange("itrCertificate")}
            accept=".pdf,.jpg,.jpeg,.png"
            className={`mt-1 block w-full text-sm text-gray-700 border ${
              errors.itrCertificate ? "border-red-500" : "border-gray-300"
            } rounded-md cursor-pointer focus:outline-none`}
            aria-required="true"
            aria-invalid={!!errors.itrCertificate}
          />
          {formData.itrCertificate ? (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-green-600">
                {formData.itrCertificate.name}
              </span>
              <button
                type="button"
                onClick={() => handleFileChange("itrCertificate")({ target: { files: [] } })}
                className="ml-2 text-red-600 hover:text-red-800"
                aria-label="Remove ITR certificate"
              >
                ×
              </button>
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              कृपया पिछले 3 वर्षों का ITR प्रमाण पत्र अपलोड करें
            </p>
          )}
          {errors.itrCertificate && (
            <p className="text-red-600 text-sm mt-1">{errors.itrCertificate}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            4. क्या इकाई स्थापना/विस्तार हेतु ऋण लिया गया है?
            <span className="text-gray-500 text-sm ml-1">(यदि हाँ, तो विवरण दें)</span>
          </label>
          <select
            name="loan"
            value={formData.loan || ""}
            onChange={handleChange}
            className={`${govtFormStyle.selectField} ${
              errors.loan ? "border-red-500" : ""
            }`}
            aria-invalid={!!errors.loan}
          >
            <option value="">चयन करें</option>
            <option value="हाँ">हाँ</option>
            <option value="नहीं">नहीं</option>
          </select>
          {errors.loan && (
            <p className="text-red-600 text-sm mt-1">{errors.loan}</p>
          )}
        </div>
        {formData.loan === "हाँ" && (
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              विवरण एवं अनुदान/ऋण राशि
              <span className={govtFormStyle.requiredStar}>*</span>
            </label>
            <textarea
              name="loanDetails"
              value={formData.loanDetails || ""}
              onChange={handleChange}
              rows="2"
              className={`${govtFormStyle.inputField} ${
                errors.loanDetails ? "border-red-500" : ""
              }`}
              placeholder="ऋणदाता का नाम, राशि, अवधि और उद्देश्य दर्ज करें"
              aria-required="true"
              aria-invalid={!!errors.loanDetails}
            />
            {errors.loanDetails && (
              <p className="text-red-600 text-sm mt-1">{errors.loanDetails}</p>
            )}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          5. स्थायी संपत्ति का विवरण (₹ में)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "भू‑भूमि", field: "land" },
            { label: "भवन", field: "building" },
            { label: "प्लांट एवं मशीनरी", field: "plantMachinery" },
            { label: "अन्य परिसंपत्ति", field: "otherAssets" },
          ].map((item, i) => (
            <div key={i}>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {item.label}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md text-gray-700">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="राशि"
                  value={formData.property[item.field] || ""}
                  onChange={(e) => handlePropertyChange(item.field, e.target.value)}
                  min="0"
                  className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${
                    errors[`property.${item.field}`] ? "border-red-500" : "border-gray-300"
                  } focus:ring-blue-500 focus:border-blue-500`}
                  onKeyDown={(e) => {
                    if (["-", "e", "E"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  aria-invalid={!!errors[`property.${item.field}`]}
                />
              </div>
              {errors[`property.${item.field}`] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[`property.${item.field}`]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-right font-semibold text-gray-800">
          कुल राशि: ₹ {propertyTotal}
        </div>
      </div>
    </div>
  );
}

export default FinancialInfo;