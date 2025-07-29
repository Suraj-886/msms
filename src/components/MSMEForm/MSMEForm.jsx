import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormHeader from "./FormHeader";
import ProgressBar from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";
import HelpSection from "./HelpSection";
import BasicInfo from "./sections/BasicInfo";
import FinancialInfo from "./sections/FinancialInfo";
import MachineryEnergy from "./sections/MachineryEnergy";
import ProductionDetails from "./sections/ProductionDetails";
import FinancialPerformance from "./sections/FinancialPerformance";
import TechnologyInnovation from "./sections/TechnologyInnovation";
import HumanResources from "./sections/HumanResources";
import EnvironmentCompliance from "./sections/EnvironmentCompliance";
import BusinessDevelopment from "./sections/BusinessDevelopment";
import AdditionalInfo from "./sections/AdditionalInfo";
import Verification from "./sections/Verification";
import { govtFormStyle } from "./utils/formStyles";

function MSMEForm({ formData, setFormData, handleSubmit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const progressPercentage = (currentPage / 11) * 100;

  // Validate form based on current page
  const validateForm = (page) => {
    const newErrors = {};
    
    if (page === 1) {
      if (!formData.unitName.trim()) newErrors.unitName = "इकाई का नाम आवश्यक है";
      if (!formData.mobile.trim()) newErrors.mobile = "मोबाइल नंबर आवश्यक है";
      else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile = "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें";
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "मान्य ईमेल दर्ज करें";
      }
    }
    
    if (page === 2 && !formData.udyamNumber.trim()) {
      newErrors.udyamNumber = "उद्यम पंजीयन संख्या आवश्यक है";
    }
    
    if (page === 11 && !formData.signature) {
      newErrors.signature = "कृपया हस्ताक्षर अपलोड करें";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" || name === "phone") {
      const onlyNums = value.replace(/\D/g, "");
      if (onlyNums.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value,
      };
      return {
        ...prev,
        [arrayName]: updatedArray,
      };
    });
  };

  const addArrayItem = (arrayName, template) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const toggleFacility = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility],
      },
    }));
  };

  const handleFileChange = (fieldName) => (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.target.files[0],
      }));
      // Clear file error when file is selected
      if (errors[fieldName]) {
        setErrors(prev => ({...prev, [fieldName]: undefined}));
      }
    }
  };

  const nextPage = () => {
    if (validateForm(currentPage)) {
      setCurrentPage((prev) => Math.min(prev + 1, 11));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(currentPage)) return;
    
    setIsSubmitting(true);
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonProps = {
    formData,
    errors,
    handleChange,
    handleNestedChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    toggleFacility,
    handleFileChange,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ProgressBar progressPercentage={progressPercentage} currentPage={currentPage} />
      
      <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="bg-white shadow-lg rounded-lg overflow-hidden">
        <FormHeader />
        
        <div className="p-6">
          {currentPage === 1 && <BasicInfo {...commonProps} />}
          {currentPage === 2 && <FinancialInfo {...commonProps} />}
          {currentPage === 3 && <MachineryEnergy {...commonProps} />}
          {currentPage === 4 && <ProductionDetails {...commonProps} />}
          {currentPage === 5 && <ProductionDetails {...commonProps} continued />}
          {currentPage === 6 && <FinancialPerformance {...commonProps} />}
          {currentPage === 7 && <TechnologyInnovation {...commonProps} />}
          {currentPage === 8 && <TechnologyInnovation {...commonProps} continued />}
          {currentPage === 9 && <HumanResources {...commonProps} />}
          {currentPage === 10 && (
            <>
              <EnvironmentCompliance {...commonProps} />
              <BusinessDevelopment {...commonProps} />
              <AdditionalInfo {...commonProps} />
            </>
          )}
          {currentPage === 11 && <Verification {...commonProps} />}
        </div>

        <NavigationButtons 
          currentPage={currentPage} 
          nextPage={nextPage} 
          prevPage={prevPage}
          validateForm={validateForm}
          isSubmitting={isSubmitting}
        />
      </form>

      <HelpSection />
    </div>
  );
}

export default MSMEForm;