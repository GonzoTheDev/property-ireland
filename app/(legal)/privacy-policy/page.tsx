export default function PrivacyPolicyPage() {
  return (
    <div className="prose prose-neutral mx-auto p-6">
      <h1>Privacy Policy</h1>
      <p>Effective date: {new Date().getFullYear()}</p>
      <p>
        This Privacy Policy describes how Property Ireland (&quot;we&quot;, &quot;us&quot;) processes personal
        data in connection with our property listing services available in Ireland only.
      </p>
      <h2>Controller</h2>
      <p>Property Ireland, Dublin, Ireland. Contact: privacy@property-ireland.ie</p>
      <h2>Data we process</h2>
      <ul>
        <li>Account data: name, email, password hash, profile details you provide.</li>
        <li>Listing data: property information and media you publish.</li>
        <li>Usage data: logs and device information for security and analytics.</li>
      </ul>
      <h2>Purposes and legal bases</h2>
      <ul>
        <li>Provide and secure the service: performance of a contract.</li>
        <li>Fraud prevention and abuse detection: legitimate interests.</li>
        <li>Legal compliance: comply with applicable Irish and EU law.</li>
      </ul>
      <h2>International transfers</h2>
      <p>
        Where we use processors outside the EEA, we rely on adequate safeguards such as
        Standard Contractual Clauses.
      </p>
      <h2>Retention</h2>
      <p>
        We retain account and listing data for the duration of your account and as required
        by law. You may request deletion as described below.
      </p>
      <h2>Your rights</h2>
      <p>
        You have rights under GDPR, including access, rectification, erasure, restriction,
        portability and objection. Contact privacy@property-ireland.ie.
      </p>
      <h2>Contact</h2>
      <p>privacy@property-ireland.ie</p>
    </div>
  );
}


