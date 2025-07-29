// src/components/MSMEForm/sections/Verification.jsx
import React from "react";
import { govtFormStyle } from "../utils/formStyles";

function Verification({ formData, handleChange, handleFileChange }) {
  return (
    <div className={govtFormStyle.sectionContainer}>
      <h2 className="text-xl font-bold text-center underline">
        सत्यापन
      </h2>

      <div className="mt-6 p-4 border rounded-lg bg-white space-y-6 text-justify leading-7 text-[17px]">
        <p>
          मैं, सत्यापित करता हूँ कि म.प्र. सूक्ष्म, लघु और मध्यम उद्योग
          राज्य स्तरीय पुरस्कार योजना अंतर्गत{" "}
          <input
            type="text"
            name="verificationUnitName"
            value={formData.unitName}
            onChange={handleChange}
            className="border-b border-black w-72 mx-2 focus:outline-none"
            placeholder="(इकाई का नाम)"
          />{" "}
          के आवेदन पत्र के बिंदु क्रमांक 1 से 22 तक दी गई समस्त जानकारी
          एवं पुष्टि हेतु संलग्न समस्त अभिलेख सही है और इकाई की ओर से
          उक्त जानकारी देने के लिये मैं अधिकृत हूँ। इकाई किसी तरह के कर
          अपवंचन श्रेणी में नहीं आती है। इकाई द्वारा श्रम कानूनों, बाल
          श्रमिक कानूनों का उल्लंघन नहीं किया गया है। इकाई अपने
          कर्मचारियों/श्रमिकों के लिये पेंशन योजना के प्रावधानों का
          उल्लंघन नहीं कर रही है। इकाई भारत सरकार/राज्य शासन के नियमों
          एवं वैधानिक औपचारिकताओं का उल्लंघन नहीं कर रही है और न ही इकाई
          में किसी तरह की आपराधिक गतिविधि संचालित है। उपरोक्त में से कोई
          भी जानकारी गलत पाये जाने पर मेरा आवेदन/पुरस्कार निरस्त मान्य
          किया जाये।
        </p>

        <div>
          <strong>संलग्न :- </strong>सत्यापन की सूची
        </div>

        <div className="flex items-center gap-3 mt-2">
          <label className="whitespace-nowrap">दिनांक :</label>
          <input
            type="date"
            name="verificationDate"
            value={
              formData.verificationDate ||
              new Date().toISOString().split("T")[0]
            }
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-1"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="mt-8 text-right space-y-2">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <span>(आवेदक के हस्ताक्षर)</span>
              <div className="relative">
                {formData.signature &&
                formData.signature instanceof File ? (
                  <>
                    <img
                      src={URL.createObjectURL(formData.signature)}
                      alt="Signature"
                      className="h-20 w-40 border border-gray-300 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "signature", value: null },
                        })
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer">
                    <div className="h-20 w-40 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                      हस्ताक्षर अपलोड करें
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange("signature")}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              (JPG/PNG, अधिकतम आकार: 2MB)
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="inline-block w-24 font-semibold">
                नाम :
              </span>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                className="border-b border-black w-60 focus:outline-none"
              />
            </div>
            <div>
              <span className="inline-block w-24 font-semibold">
                पद :
              </span>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border-b border-black w-60 focus:outline-none"
              />
            </div>
            <div>
              <span className="inline-block w-24 font-semibold">
                मोबाइल नंबर :
              </span>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="border-b border-black w-60 focus:outline-none"
              />
            </div>
            <div>
              <span className="inline-block w-24 font-semibold">
                ई-मेल :
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-b border-black w-60 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;