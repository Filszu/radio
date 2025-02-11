import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: 11.02.2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to PartyVote! This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, https://partyvote.ciac.me. By using our services, you agree to the terms outlined in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>
          We may collect the following types of information:
          <ul className="list-disc ml-8">
            <li>Personal Information: Name, email address, and payment details for subscription services.</li>
            <li>Usage Data: Information about how you interact with our website, such as IP address, browser type, and pages visited.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>
          We use your information to:
          <ul className="list-disc ml-8">
            <li>Provide and maintain our services.</li>
            <li>Process subscription payments.</li>
            <li>Improve our website and user experience.</li>
            <li>Communicate with you about updates and promotions.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Subscription Payments</h2>
        <p>
          When you subscribe to our services, you agree to the following terms:
          <ul className="list-disc ml-8">
            <li>Payments are processed through a secure third-party payment gateway.</li>
            <li>Subscriptions are billed on a recurring basis (monthly/annual) unless canceled.</li>
            <li>You can cancel your subscription at any time, but no refunds will be provided for the current billing cycle.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@ciac.me" className="text-blue-500">admin@ciac.me</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;