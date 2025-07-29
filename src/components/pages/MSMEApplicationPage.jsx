// src/pages/MSMEApplicationPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MSMEForm from "../MSMEForm/MSMEForm";
import config from "../../config.json"
function MSMEAwardApplicationForm() {
  const years = ["(i)", "(ii)", "(iii)"];
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load form data from localStorage if available
  const initialFormData = JSON.parse(localStorage.getItem("msmeFormData")) || {
    // Section 1: Basic Information
    unitName: "",
    isWomenEntrepreneur: "",
    capableEntrepreneur: "",
    category: "",
    businessStructure: "",
    proprietors: [{ name: "", share: "" }],
    director: "",
    registeredEnterprise: "",
    mobile: "",
    address: "",
    phone: "",
    email: "",
    gstNumber: "",
    udyamNumber: "",

    // Section 2: Financial Information
    filedITR: "",
    itrCertificate: null,
    loan: "",
    loanDetails: "",
    property: {
      land: "",
      building: "",
      plantMachinery: "",
      otherAssets: "",
    },

    // Section 3: Machinery & Energy
    machinery: [{ name: "", imported: "", value: "" }],
    energySource: "",

    // Section 4: Production Details
    products: [{ name: "", capacity: "" }],
    perm_male: "",
    perm_female: "",
    perm_sc: "",
    perm_st: "",
    perm_obc: "",
    perm_disabled: "",
    temp_male: "",
    temp_female: "",

    productCosts: [
      { year: "", cost: "" },
      { year: "", cost: "" },
      { year: "", cost: "" },
    ],
    productionCapacity: [
      {
        product: "",
        year: "",
        capacity: "",
        actual: "",
        utilization: "",
      },
    ],

    // Section 5: Financial Performance
    profit: years.map(() => ({ value: "", percent: "", remark: "" })),
    netProfit: years.map(() => ({ value: "", percent: "", remark: "" })),

    // Section 6: Technology & Innovation
    techUsed: "",
    techDesc: "",
    prodDev: "",
    prodDevDesc: "",
    qualityCert: "",
    qualityCertDesc: "",
    qualityStandard: "",
    qualityStandardDesc: "",
    exportData: [
      { product: "", country: "", year: "", quantity: "", percent: "" },
      { product: "", country: "", year: "", quantity: "", percent: "" },
      { product: "", country: "", year: "", quantity: "", percent: "" },
    ],

    // Section 7: Human Resources
    hireSetup: "",
    hireSetupDesc: "",
    training: "",
    trainingDesc: "",
    facilities: {
      toilet: false,
      canteen: false,
      health: false,
      recreation: false,
      library: false,
      transport: false,
    },
    pensionInfo: "",
    pensionDocument: null,

    // Section 8: Environment & Compliance
    pollution: [{ name: "", year: "", cost: "" }],

    // Section 9: Business Development
    vendorDev: "",
    vendorDevDesc: "",

    // Section 10: Additional Information
    otherInfo: "",

    // Section 11: Verification
    verificationUnitName: "",
    verificationDate: "",
    applicantName: "",
    designation: "",
    signature: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    localStorage.setItem("msmeFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (formData.signature && formData.signature instanceof File) {
      URL.revokeObjectURL(URL.createObjectURL(formData.signature));
    }
  }, [formData.signature]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    localStorage.removeItem("msmeFormData");

    ["itrCertificate", "pensionDocument", "signature"].forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const dataToSend = { ...formData };
    delete dataToSend.itrCertificate;
    delete dataToSend.pensionDocument;
    delete dataToSend.signature;

    formDataToSend.append("formData", JSON.stringify(dataToSend));

    try {
      const response = await axios.post(
        // config?.URL,
        `http://msme.drunkcafe.in/api/applications`,
        // `https://9bm52696-5000.inc1.devtunnels.ms/api/applications`,
        // '/.netlify/functions/proxy',
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("आवेदन सफलतापूर्वक जमा हो गया!");
      setIsSubmitted(true);
      localStorage.setItem(
        "applicationNumber",
        response.data.applicationNumber
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed");
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4">
            आवेदन सफलतापूर्वक जमा हो गया!
          </h2>
          <p className="mb-4">
            आपके आवेदन को सफलतापूर्वक प्राप्त कर लिया गया है। आवेदन संख्या:
            {localStorage.getItem("applicationNumber")}. कृपया इसे भविष्य में
            संदर्भ के लिए सहेजें।
          </p>
          <button
            onClick={() => {
              setFormData(initialFormData);
              setIsSubmitted(false);
              localStorage.removeItem("applicationNumber");
              setCurrentPage(1);
            }}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            नया आवेदन शुरू करें
          </button>
        </div>
      </div>
    );
  }

  return (
    <MSMEForm 
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      errors={errors}
      setErrors={setErrors}
    />
  );
}

export default MSMEAwardApplicationForm;