import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Terms() {
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: April 30, 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-10">1. Acceptance of Terms</h2>
          <p className="text-foreground/80 leading-relaxed">
            By accessing or using the Trizen Ventures website, founder portal, or any of our services (collectively, the "Platform"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform.
          </p>

          <h2 className="text-2xl font-semibold mt-10">2. Eligibility</h2>
          <p className="text-foreground/80 leading-relaxed">
            The Trizen program is open to students currently enrolled in a recognised higher-education institution in India (typically 3rd year, 4th year, or final-year students). By applying, you represent that you meet these eligibility criteria.
          </p>

          <h2 className="text-2xl font-semibold mt-10">3. Program Participation</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>Acceptance into a cohort is at Trizen's sole discretion.</li>
            <li>Participants are expected to commit a minimum of 20 hours per week during the cohort.</li>
            <li>Trizen reserves the right to remove a participant from the program for non-compliance with program guidelines.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">4. Equity &amp; Financial Terms</h2>
          <p className="text-foreground/80 leading-relaxed">
            Trizen receives 6% common equity in exchange for the program benefits, including the initial cheque and the founder stipend. Specific financial arrangements will be documented in a separate investment agreement signed by both parties before the cohort begins.
          </p>

          <h2 className="text-2xl font-semibold mt-10">5. Intellectual Property</h2>
          <p className="text-foreground/80 leading-relaxed">
            You retain full ownership of the intellectual property you create during the program. Trizen does not claim any IP rights over your startup's technology, product, or brand. Materials provided by Trizen (curriculum, templates, tools) remain the property of Trizen Ventures.
          </p>

          <h2 className="text-2xl font-semibold mt-10">6. Confidentiality</h2>
          <p className="text-foreground/80 leading-relaxed">
            Both parties agree to treat confidential information shared during the program — including business plans, financial data, and proprietary methodologies — with reasonable care and not disclose it to third parties without prior written consent.
          </p>

          <h2 className="text-2xl font-semibold mt-10">7. User Content</h2>
          <p className="text-foreground/80 leading-relaxed">
            You are responsible for all content you submit through the Platform (applications, pitch decks, demo videos, etc.). You warrant that you have the right to share such content and that it does not infringe on any third-party rights.
          </p>

          <h2 className="text-2xl font-semibold mt-10">8. Disclaimers</h2>
          <p className="text-foreground/80 leading-relaxed">
            The Platform is provided "as is" and "as available." Trizen makes no warranties, express or implied, regarding the availability, accuracy, or reliability of the Platform. Participation in the program does not guarantee fundraising success or any specific business outcome.
          </p>

          <h2 className="text-2xl font-semibold mt-10">9. Limitation of Liability</h2>
          <p className="text-foreground/80 leading-relaxed">
            To the fullest extent permitted by law, Trizen Ventures shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of the Platform or participation in the program.
          </p>

          <h2 className="text-2xl font-semibold mt-10">10. Governing Law</h2>
          <p className="text-foreground/80 leading-relaxed">
            These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
          </p>

          <h2 className="text-2xl font-semibold mt-10">11. Changes to Terms</h2>
          <p className="text-foreground/80 leading-relaxed">
            We may revise these Terms at any time. Material changes will be communicated via email or a notice on the Platform. Your continued use of the Platform after such changes constitutes acceptance.
          </p>

          <h2 className="text-2xl font-semibold mt-10">12. Contact</h2>
          <p className="text-foreground/80 leading-relaxed">
            For questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@trizen.vc" className="text-accent hover:underline">legal@trizen.vc</a>.
          </p>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container py-8 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
          <p>© 2026 Trizen Ventures. All rights reserved.</p>
          <div className="flex gap-6">
            <button type="button" className="hover:text-foreground" onClick={() => navigate("/privacy")}>Privacy</button>
            <span className="text-foreground font-medium">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
