import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">Last updated: 11.02.2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using https://partyvote.ciac.me, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Subscription Services</h2>
        <p>
          Our website offers subscription-based services. By subscribing, you agree to the following:
          <ul className="list-disc ml-8">
            <li>You will be billed on a recurring basis (monthly/annual) until you cancel your subscription.</li>
            <li>Payments are non-refundable for the current billing cycle.</li>
            <li>You are responsible for ensuring your payment information is accurate and up-to-date.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
        <p>
          You agree to:
          <ul className="list-disc ml-8">
            <li>Use our services only for lawful purposes.</li>
            <li>Not engage in any activity that disrupts or interferes with our website.</li>
            <li>Provide accurate and complete information when creating an account or subscribing.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
        <p>
          PartyVote is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Governing Law</h2>
        <p>
          These Terms of Service are governed by the laws of Poland. Any disputes will be resolved in the courts of [Your Jurisdiction].
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at <a href="mailto:admin@ciac.me" className="text-blue-500">admin@ciac.me</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;