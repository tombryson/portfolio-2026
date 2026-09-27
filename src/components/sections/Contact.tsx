import { SectionReveal } from "@/components/ui/SectionReveal";
import { Mail, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="portfolio-section border-t border-[#202020]/30">
      <SectionReveal>
        <div className="grid gap-10 border border-[#202020] bg-[#ffe54c] p-6 shadow-[6px_6px_0_#202020] sm:p-10 lg:grid-cols-2 lg:items-end lg:gap-14">
          <div>
            <h2 className="section-title">What can I do for you?</h2>
          </div>
          <div>
            <a href="mailto:thomas.bryson@outlook.com" className="contact-button">
              <Mail size={18} aria-hidden="true" />
              thomas.bryson@outlook.com
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div className="mt-5">
              <a
                href="https://github.com/tombryson"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                You can also find me on GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
