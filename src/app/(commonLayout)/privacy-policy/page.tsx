"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <span className="font-semibold">Pizzerianovellus</span>, accessible from 
        <a href="https://pizzerianovellus.com" className="text-pink-500 underline ml-1">
          https://pizzerianovellus.com
        </a>, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Personal details such as name, email, phone number, and address.</li>
        <li>Order information including items ordered and payment details.</li>
        <li>Cookies and usage data to improve our website and services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>To process and fulfill your orders.</li>
        <li>To communicate important updates or promotions.</li>
        <li>To improve our website and user experience.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Payment Information</h2>
      <p className="mb-4">
        We offer payments via <span className="font-semibold">Stripe</span> (online payment) and <span className="font-semibold">Cash on Delivery (COD)</span>. All payment information is processed securely through Stripe, and Pizzerianovellus does not store your credit card details on our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to enhance user experience, remember preferences, and analyze site traffic. You can choose to disable cookies in your browser settings, but some features may not work properly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal information to third parties. We may share data with our delivery partners, payment processors, or as required by law.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Data Security</h2>
      <p className="mb-4">
        We take appropriate measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Users are encouraged to review it periodically. Continued use of our services constitutes acceptance of any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us at 
        <a href="mailto:support@pizzerianovellus.com" className="text-pink-500 underline ml-1">
          support@pizzerianovellus.com
        </a>.
      </p>
      <p className="mb-4">
        Our location: <span className="font-semibold">Via Carlo Marchesetti 21/2A, 34142, Trieste, Italia</span>
      </p>
      <p className="mb-4">
        Website: <a href="https://pizzerianovellus.com" className="text-pink-500 underline">https://pizzerianovellus.com</a>
      </p>

    </div>
  );
}