import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container h-16 flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
        </div>
      </header>

      <main className="container py-16 max-w-3xl prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: April 30, 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-10">1. Information We Collect</h2>
          <p className="text-foreground/80 leading-relaxed">
            When you apply to or interact with Trizen Ventures, we may collect the following categories of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li><strong>Personal identifiers</strong> — name, email address, phone number, college/university affiliation.</li>
            <li><strong>Application data</strong> — startup idea, team details, pitch materials, and any documents you upload.</li>
            <li><strong>Usage data</strong> — pages visited, features used within the founder portal, and session duration.</li>
            <li><strong>Device &amp; browser data</strong> — IP address, browser type, operating system, and screen resolution.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">2. How We Use Your Information</h2>
          <p className="text-foreground/80 leading-relaxed">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>Evaluate your application and eligibility for the program.</li>
            <li>Provide access to the founder portal, mentorship sessions, and program resources.</li>
            <li>Communicate with you about cohort updates, deadlines, and events.</li>
            <li>Improve our platform, curriculum, and overall user experience.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">3. Information Sharing</h2>
          <p className="text-foreground/80 leading-relaxed">
            We do not sell your personal data. We may share information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li><strong>Mentors &amp; partners</strong> — to facilitate mentorship and investor introductions (with your consent).</li>
            <li><strong>Service providers</strong> — hosting, analytics, and communication tools that support our operations.</li>
            <li><strong>Legal authorities</strong> — when required by law, regulation, or legal process.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">4. Data Security</h2>
          <p className="text-foreground/80 leading-relaxed">
            We implement industry-standard security measures including encryption in transit (TLS), secure storage, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-10">5. Data Retention</h2>
          <p className="text-foreground/80 leading-relaxed">
            We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. You may request deletion of your data at any time by contacting us.
          </p>

          <h2 className="text-2xl font-semibold mt-10">6. Your Rights</h2>
          <p className="text-foreground/80 leading-relaxed">
            Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@trizen.vc" className="text-accent hover:underline">privacy@trizen.vc</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-10">7. Cookies</h2>
          <p className="text-foreground/80 leading-relaxed">
            We use essential cookies to keep you signed in and remember your preferences. We do not use third-party advertising cookies. Analytics cookies are used only in aggregate to improve the platform.
          </p>

          <h2 className="text-2xl font-semibold mt-10">8. Changes to This Policy</h2>
          <p className="text-foreground/80 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-10">9. Contact Us</h2>
          <p className="text-foreground/80 leading-relaxed">
            If you have questions about this Privacy Policy, please reach out at{" "}
            <a href="mailto:privacy@trizen.vc" className="text-accent hover:underline">privacy@trizen.vc</a>.
          </p>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container py-8 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
          <p>© 2026 Trizen Ventures. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-foreground font-medium">Privacy</span>
            <button type="button" className="hover:text-foreground" onClick={() => navigate("/terms")}>Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
