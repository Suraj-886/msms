// src/components/MSMEForm/NavigationButtons.jsx
import React from "react";
import { govtFormStyle } from "./utils/formStyles";

function NavigationButtons({
  currentPage,
  nextPage,
  prevPage,
  validateForm,
  isSubmitting ,
}) {
  const handleNext = () => {
    if (validateForm(currentPage)) {
      nextPage();
    }
  };

  return (
    <div className="flex justify-between p-6 bg-gray-50 border-t">
      {currentPage > 1 ? (
        <button
          type="button"
          onClick={prevPage}
          className={govtFormStyle.buttonSecondary}
          disabled={isSubmitting}
        >
          पिछला पृष्ठ
        </button>
      ) : (
        <div></div>
      )}

      {currentPage < 11 ? (
        <button
          type="button"
          onClick={handleNext}
          className={govtFormStyle.buttonPrimary}
          disabled={isSubmitting}
        >
          {isSubmitting ? "प्रोसेसिंग..." : "अगला पृष्ठ"}
        </button>
      ) : (
        <button
          type="submit"
          className={govtFormStyle.buttonPrimary}
          disabled={isSubmitting}
        >
          {isSubmitting ? "जमा हो रहा है..." : "आवेदन जमा करें"}
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;