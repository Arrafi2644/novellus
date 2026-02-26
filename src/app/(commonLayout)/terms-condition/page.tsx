"use client";

import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <span className="font-semibold">Pizzerianovellus</span>! By using our website and services, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using <span className="font-semibold">Pizzerianovellus</span> (<a href="https://pizzerianovellus.com" className="text-pink-500 underline">https://pizzerianovellus.com</a>), you agree to these Terms and Conditions. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. Services</h2>
      <p className="mb-4">
        Pizzerianovellus provides an online platform to order delicious pizzas from our restaurant. We deliver fresh, hot pizzas to your doorstep.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. User Responsibilities</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Provide accurate and complete information when placing orders.</li>
        <li>Maintain the security of your account credentials.</li>
        <li>Use the platform only for lawful purposes.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Payments</h2>
      <p className="mb-4">
        All payments for orders can be made using either:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li><span className="font-semibold">Stripe:</span> Online payment through credit/debit cards or supported wallets.</li>
        <li><span className="font-semibold">Cash on Delivery (COD):</span> Pay in cash when the order is delivered to your address.</li>
      </ul>
      <p className="mb-4">
        Pizzerianovellus is not responsible for failed transactions due to third-party payment services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Refunds and Cancellations</h2>
      <p className="mb-4">
        Refunds and cancellations are subject to our restaurant policies. We will assist in facilitating refunds but are not directly liable for order issues once dispatched.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
      <p className="mb-4">
        Pizzerianovellus is not liable for any indirect, incidental, or consequential damages arising from the use of the platform, including delays, incorrect orders, or quality issues.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms and Conditions from time to time. Users are encouraged to review the terms regularly. Continued use of the platform constitutes acceptance of any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contact & Location</h2>
      <p className="mb-4">
        For any questions or concerns regarding these Terms, please contact us at 
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