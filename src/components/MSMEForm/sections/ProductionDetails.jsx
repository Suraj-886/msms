// src/components/MSMEForm/sections/ProductionDetails.jsx
import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function ProductionDetails({ formData, handleChange, handleArrayChange, addArrayItem, removeArrayItem, continued }) {
  const temp_total = () => {
    const male = parseInt(formData.temp_male) || 0;
    const female = parseInt(formData.temp_female) || 0;
    return male + female;
  };

  const perm_total = () => {
    const male = parseInt(formData.perm_male) || 0;
    const female = parseInt(formData.perm_female) || 0;
    return male + female;
  };

  if (!continued) {
    return (
      <div className={govtFormStyle.sectionContainer}>
        <h3 className={govtFormStyle.sectionTitle}>4. उत्पादन विवरण</h3>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">उत्पाद का विवरण</h4>
          {formData.products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-sm mb-3 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    उत्पाद का नाम
                  </label>
                  <input
                    value={product.name}
                    onChange={(e) => handleArrayChange("products", index, "name", e.target.value)}
                    className={govtFormStyle.inputField}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    वार्षिक उत्पादन क्षमता
                  </label>
                  <input
                    value={product.capacity}
                    onChange={(e) => handleArrayChange("products", index, "capacity", e.target.value)}
                    className={govtFormStyle.inputField}
                  />
                </div>
                <div className="flex items-end">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("products", index)}
                      className="text-red-600 text-sm hover:text-red-800 flex items-center"
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
            onClick={() => addArrayItem("products", { name: "", capacity: "" })}
            className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            उत्पाद जोड़ें
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">प्रदत्त रोजगार</h4>
          <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
            <table className="w-full border-collapse border border-gray-300 text-center shadow-md">
              <thead>
                <tr className={govtFormStyle.tableHeader}>
                  <th className="border border-gray-300 p-2 w-1/12">क्र.</th>
                  <th className="border border-gray-300 p-2 w-7/12">विवरण</th>
                  <th className="border border-gray-300 p-2 w-4/12">संख्या</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="8" className="border border-gray-300 p-2 align-top">(अ)</td>
                  <td colSpan="2" className="border border-gray-300 p-2 text-left font-bold bg-gray-50">
                    स्थायी कर्मचारी
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(i) पुरुष</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="perm_male"
                      value={formData.perm_male}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(ii) महिला</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="perm_female"
                      value={formData.perm_female}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left font-bold">योग</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      name="perm_total"
                      value={perm_total()}
                      readOnly
                      className="px-2 py-1 border border-gray-300 rounded text-center bg-gray-100 font-medium"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(iii) अनुसूचित जाति (अजा)</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="perm_sc"
                      value={formData.perm_sc}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(iv) अनुसूचित जनजाति (अजजा)</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="perm_st"
                      value={formData.perm_st}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(v) अन्य पिछड़ा वर्ग (OBC)</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="perm_obc"
                      value={formData.perm_obc}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(vi) अन्य प्रकार से सक्षम</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="perm_disabled"
                      value={formData.perm_disabled}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>

                <tr>
                  <td rowSpan="4" className="border border-gray-300 p-2 align-top">(ब)</td>
                  <td colSpan="2" className="border border-gray-300 p-2 text-left font-bold bg-gray-50">
                    अस्थायी कर्मचारी
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(i) पुरुष</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="temp_male"
                      value={formData.temp_male}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">(ii) महिला</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="temp_female"
                      value={formData.temp_female}
                      onChange={handleChange}
                      className="px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      min="0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left font-bold">योग</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      name="temp_total"
                      value={temp_total()}
                      readOnly
                      className="px-2 py-1 border border-gray-300 rounded text-center bg-gray-100 font-medium"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={govtFormStyle.sectionContainer}>
      <h3 className={govtFormStyle.sectionTitle}>4. उत्पादन विवरण (जारी)</h3>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          विगत तीन वर्षों में वार्षिक उत्पादन लागत 
        </h4>
        <div className="bg-white p-4 rounded shadow-sm mb-3 border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className={govtFormStyle.tableHeader}>
                <th className="p-2 border border-gray-300">क्र.</th>
                <th className="p-2 border border-gray-300">वर्ष</th>
                <th className="p-2 border border-gray-300">
                  वार्षिक उत्पादन लागत (रु.)
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.productCosts.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <select
                      name="year"
                      value={item.year}
                      onChange={(e) => handleArrayChange("productCosts", index, "year", e.target.value)}
                      className={`${govtFormStyle.inputField} bg-gray-100 w-full`}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 2000 + 1 },
                        (_, i) => 2000 + i
                      )
                        .reverse()
                        .map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      name="cost"
                      value={item.cost}
                      onChange={(e) => handleArrayChange("productCosts", index, "cost", e.target.value)}
                      className={govtFormStyle.inputField}
                      placeholder="लागत रकम दर्ज करें"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">
          विगत तीन वर्षों में स्थापित क्षमता और उसमें किया गया उत्पादन 
        </h4>
        {formData.productionCapacity.map((pc, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-sm mb-3 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  उत्पाद का नाम
                </label>
                <input
                  value={pc.product}
                  onChange={(e) => handleArrayChange("productionCapacity", index, "product", e.target.value)}
                  className={govtFormStyle.inputField}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  वर्ष
                </label>
                <select
                  value={pc.year}
                  onChange={(e) => handleArrayChange("productionCapacity", index, "year", e.target.value)}
                  className={govtFormStyle.inputField}
                >
                  <option value="">Select Year</option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1999 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  उत्पादन क्षमता
                </label>
                <input
                  value={pc.capacity}
                  onChange={(e) => handleArrayChange("productionCapacity", index, "capacity", e.target.value)}
                  className={govtFormStyle.inputField}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  वास्तविक उत्पादन
                </label>
                <input
                  value={pc.actual}
                  onChange={(e) => handleArrayChange("productionCapacity", index, "actual", e.target.value)}
                  className={govtFormStyle.inputField}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  प्रतिशत
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={pc.utilization}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (!isNaN(value) &&
                        Number(value) >= 0 &&
                        Number(value) <= 100)
                    ) {
                      handleArrayChange(
                        "productionCapacity",
                        index,
                        "utilization",
                        value === ""
                          ? ""
                          : Math.min(100, Math.max(0, Number(value)))
        )}
                  }}
                  className={govtFormStyle.inputField}
                  placeholder="प्रतिशत"
                />
              </div>
              <div className="flex items-end">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("productionCapacity", index)}
                    className="text-red-600 text-sm hover:text-red-800 flex items-center"
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
          onClick={() =>
            addArrayItem("productionCapacity", {
              product: "",
              year: "",
              capacity: "",
              actual: "",
              utilization: "",
            })
          }
          className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          लाइन जोड़ें
        </button>
      </div>
    </div>
  );
}

export default ProductionDetails;