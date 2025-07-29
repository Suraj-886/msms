// src/components/MSMEForm/sections/TechnologyInnovation.jsx
import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function TechnologyInnovation({ formData, handleChange, continued }) {
  const handleExportChange = (index, field, value) => {
    const updatedExportData = [...formData.exportData];
    updatedExportData[index][field] = value;
    handleChange({
      target: {
        name: "exportData",
        value: updatedExportData,
      },
    });
  };

  if (!continued) {
    return (
      <div className={govtFormStyle.sectionContainer}>
        <h3 className={govtFormStyle.sectionTitle}>6. प्रौद्योगिकी एवं नवाचार</h3>

        <div className="mb-6">
          <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                क्या उत्पाद में नवीनतम तकनीक का उपयोग किया गया है?
              </label>
              <select
                value={formData.techUsed}
                onChange={(e) =>
                  handleChange({
                    target: { name: "techUsed", value: e.target.value },
                  })
                }
                className={govtFormStyle.selectField}
              >
                <option value="">चयन करें</option>
                <option>हाँ</option>
                <option>नहीं</option>
              </select>
            </div>
            {formData.techUsed === "हाँ" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  विवरण
                </label>
                <textarea
                  value={formData.techDesc}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "techDesc", value: e.target.value },
                    })
                  }
                  rows="3"
                  className={govtFormStyle.inputField}
                ></textarea>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                क्या उत्पाद विकास की क्षमता है?
              </label>
              <select
                value={formData.prodDev}
                onChange={(e) =>
                  handleChange({
                    target: { name: "prodDev", value: e.target.value },
                  })
                }
                className={govtFormStyle.selectField}
              >
                <option value="">चयन करें</option>
                <option>हाँ</option>
                <option>नहीं</option>
              </select>
            </div>
            {formData.prodDev === "हाँ" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  विवरण
                </label>
                <textarea
                  value={formData.prodDevDesc}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "prodDevDesc",
                        value: e.target.value,
                      },
                    })
                  }
                  rows="3"
                  className={govtFormStyle.inputField}
                ></textarea>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">
            विगत तीन वर्षों में निर्यात की जानकारी
          </h4>
          <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      क्र.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      उत्पाद का नाम
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      देश
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      वर्ष
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      निर्यात की मात्रा
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      प्रतिशत (कुल उत्पादन से)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.exportData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.product}
                          onChange={(e) =>
                            handleExportChange(index, "product", e.target.value)
                          }
                          className={govtFormStyle.inputField}
                          placeholder="उत्पाद नाम"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.country}
                          onChange={(e) =>
                            handleExportChange(index, "country", e.target.value)
                          }
                          className={govtFormStyle.inputField}
                          placeholder="देश का नाम"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={item.year}
                          onChange={(e) =>
                            handleExportChange(index, "year", e.target.value)
                          }
                          className={govtFormStyle.inputField}
                        >
                          <option value="">वर्ष चुनें</option>
                          {Array.from(
                            { length: new Date().getFullYear() - 1999 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) =>
                            handleExportChange(index, "quantity", e.target.value)
                          }
                          className={govtFormStyle.inputField}
                          placeholder="मात्रा"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={item.percent}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              value === "" ||
                              (Number(value) >= 0 && Number(value) <= 100)
                            ) {
                              handleExportChange(
                                index,
                                "percent",
                                value === ""
                                  ? ""
                                  : Math.min(100, Math.max(0, Number(value)))
                              );
                            }
                          }}
                          className={govtFormStyle.inputField}
                          placeholder="%"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={govtFormStyle.sectionContainer}>
      <h3 className={govtFormStyle.sectionTitle}>
        6. प्रौद्योगिकी एवं नवाचार (जारी)
      </h3>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">गुणवत्ता प्रमाणन का विवरण :</h4>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                क्या इकाई द्वारा गुणवत्ता प्रमाण पत्र प्राप्त किया गया है?
              </label>
              <select
                value={formData.qualityCert}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "qualityCert",
                      value: e.target.value,
                    },
                  })
                }
                className={govtFormStyle.selectField}
              >
                <option value="">चयन करें</option>
                <option>हाँ</option>
                <option>नहीं</option>
              </select>
            </div>
            {formData.qualityCert === "हाँ" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  विवरण
                </label>
                <input
                  type="text"
                  value={formData.qualityCertDesc}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "qualityCertDesc",
                        value: e.target.value,
                      },
                    })
                  }
                  className={govtFormStyle.inputField}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                क्या इकाई द्वारा गुणवत्ता मानकों का उपयोग किया गया है?
              </label>
              <select
                value={formData.qualityStandard}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "qualityStandard",
                      value: e.target.value,
                    },
                  })
                }
                className={govtFormStyle.selectField}
              >
                <option value="">चयन करें</option>
                <option>हाँ</option>
                <option>नहीं</option>
              </select>
            </div>
            {formData.qualityStandard === "हाँ" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  विवरण
                </label>
                <input
                  type="text"
                  value={formData.qualityStandardDesc}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "qualityStandardDesc",
                        value: e.target.value,
                      },
                    })
                  }
                  className={govtFormStyle.inputField}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyInnovation;