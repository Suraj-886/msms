import React from "react";
import { govtFormStyle } from "../utils/formStyles";
import { validateField } from "../utils/validation";

function FinancialPerformance({ formData, setFormData, errors }) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1999 }, // From 2000 to current year
    (_, i) => currentYear - i
  );

  const handleFinancialDataChange = (arrayName, index, field, value) => {
    // Validate percentage fields (0-100)
    if (field === 'percent' && value !== "" && (Number(value) < 0 || Number(value) > 100)) {
      return;
    }
    
    // Validate numeric fields (positive numbers only)
    if ((field === 'value' || field === 'percent') && value !== "" && !validateField('numeric', value)) {
      return;
    }

    const newData = [...formData[arrayName]];
    newData[index] = {
      ...newData[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      [arrayName]: newData,
    }));
  };

  const financialSections = [
    {
      title: "12. विगत तीन वर्षों में बिक्री, लाभ एवं लाभ का प्रतिशत",
      data: formData.profit,
      name: "profit",
      valueLabel: "लाभ",
    },
    {
      title: "13. विगत तीन वर्षों में शुद्ध लाभ एवं लाभ का प्रतिशत",
      data: formData.netProfit,
      name: "netProfit",
      valueLabel: "शुद्ध लाभ",
    },
  ];

  return (
    <div className={`${govtFormStyle.sectionContainer} print:break-inside-avoid`}>
      <h3 className={govtFormStyle.sectionTitle}>5. वित्तीय प्रदर्शन</h3>

      {financialSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8 last:mb-0">
          <h4 className="text-lg font-semibold mb-3 text-gray-700 bg-gray-50 p-3 rounded-md">
            {section.title}
          </h4>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    क्र.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    वर्ष
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {section.valueLabel} (₹)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {section.valueLabel} (%)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    रिमार्क
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {section.data.map((item, index) => {
                  const rowErrorPrefix = `${section.name}[${index}]`;
                  return (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 transition-colors"
                      aria-labelledby={`${section.name}-row-${index}`}
                    >
                      <td 
                        id={`${section.name}-row-${index}`}
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center sr-only"
                      >
                        {section.valueLabel} - वर्ष {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={item.year || ""}
                          onChange={(e) => handleFinancialDataChange(section.name, index, "year", e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors[`${rowErrorPrefix}.year`] ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          aria-label="वर्ष"
                          aria-invalid={!!errors[`${rowErrorPrefix}.year`]}
                        >
                          <option value="">वर्ष चुनें</option>
                          {yearOptions.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {errors[`${rowErrorPrefix}.year`] && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors[`${rowErrorPrefix}.year`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="relative">
                          <span className="absolute left-3 top-2">₹</span>
                          <input
                            type="number"
                            min="0"
                            value={item.value || ""}
                            onChange={(e) => handleFinancialDataChange(section.name, index, "value", e.target.value)}
                            className={`w-full pl-8 pr-3 py-2 border ${
                              errors[`${rowErrorPrefix}.value`] ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="राशि"
                            aria-label={`${section.valueLabel} राशि`}
                            aria-invalid={!!errors[`${rowErrorPrefix}.value`]}
                            onKeyDown={(e) => {
                              if (["-", "e", "E"].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>
                        {errors[`${rowErrorPrefix}.value`] && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors[`${rowErrorPrefix}.value`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={item.percent || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
                                handleFinancialDataChange(
                                  section.name,
                                  index,
                                  "percent",
                                  value === "" ? "" : Math.min(100, Math.max(0, Number(value)))
                                );
                              }
                            }}
                            className={`w-full px-3 py-2 border ${
                              errors[`${rowErrorPrefix}.percent`] ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="%"
                            aria-label={`${section.valueLabel} प्रतिशत`}
                            aria-invalid={!!errors[`${rowErrorPrefix}.percent`]}
                            onKeyDown={(e) => {
                              if (["-", "e", "E"].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          <span className="absolute right-3 top-2">%</span>
                        </div>
                        {errors[`${rowErrorPrefix}.percent`] && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors[`${rowErrorPrefix}.percent`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.remark || ""}
                          onChange={(e) => handleFinancialDataChange(section.name, index, "remark", e.target.value)}
                          className={`w-full px-3 py-2 border ${
                            errors[`${rowErrorPrefix}.remark`] ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="टिप्पणी"
                          aria-label="टिप्पणी"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FinancialPerformance;