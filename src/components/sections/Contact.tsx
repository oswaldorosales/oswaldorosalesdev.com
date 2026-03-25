import { Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-700 mb-12">
            Have a project in mind? Let&apos;s talk about how I can help.
          </p>

          {/* Contact Email */}
          <a
            href="mailto:contact@oswaldorosalesdev.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            <Mail className="h-6 w-6" />
            contact@oswaldorosalesdev.com
          </a>
        </div>
      </div>
    </section>
  );
}
