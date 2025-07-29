// src/components/MSMEForm/HelpSection.jsx
import React from "react";

function HelpSection() {
  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">सहायता</h3>
      <p className="text-sm text-gray-700 mb-2">
        <strong>संपर्क नंबर:</strong> 0755-XXXXXXXX
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>ईमेल:</strong> msme-help@mp.gov.in
      </p>
      <p className="text-sm text-gray-700">
        किसी भी प्रश्न या सहायता के लिए कृपया उपरोक्त संपर्क विवरण का उपयोग करें।
      </p>
    </div>
  );
}

export default HelpSection;