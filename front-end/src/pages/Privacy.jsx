import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our app.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-2">
            We may collect the following types of data:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Basic account details such as name and email.</li>
            <li>Usage data including generated hooks and preferences.</li>
            <li>Device information for analytics and performance purposes.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>To provide and improve our app services.</li>
            <li>To personalize your hook generation experience.</li>
            <li>To enhance app performance and understand user behavior.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            3. Data Protection
          </h2>
          <p className="text-gray-600">
            We use industry-standard security measures to protect your data. We do not sell, rent, or share your personal information with third parties.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            4. Cookies & Tracking
          </h2>
          <p className="text-gray-600 mb-2">
            We use cookies to enhance your experience. Cookies help:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Maintain login sessions.</li>
            <li>Improve user interface responsiveness.</li>
            <li>Analyze feature usage and performance.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            5. Your Rights
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>You may request deletion of your data at any time.</li>
            <li>You can request to view the data we store about you.</li>
            <li>You may disable cookies from your browser settings.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            6. Updates to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy occasionally. Any updates will be reflected on this page.
          </p>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm">
          Last updated: {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}
