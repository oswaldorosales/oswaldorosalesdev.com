import { Mail, Building2 } from "lucide-react";
import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-700 mb-10">
            Have a project in mind? Let&apos;s talk about how I can help.
          </p>

          {/* US Entity Badge */}
          <div className="inline-flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl px-6 py-5 mb-10 text-left">
            <Building2 className="h-6 w-6 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-900 mb-1">
                Available for US contracts via{" "}
                <Link
                  href="https://speedofbytes.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Speed of Bytes, Inc
                </Link>
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                US-registered corporation — I can invoice US companies directly
                in USD, provide a W-9, and engage as an independent contractor
                without administrative friction.
              </p>
            </div>
          </div>

          {/* Mexico Entity Badge */}
          <div className="inline-flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl px-6 py-5 mb-10 text-left">
            <Building2 className="h-6 w-6 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-900 mb-1">
                Available for Mexican contracts as an independent professional
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Registered as a freelance professional in Mexico — I can issue
                valid invoices (CFDI) in MXN for Mexican companies and comply
                with SAT requirements.
              </p>
            </div>
          </div>

          {/* Contact Email */}
          <div className="flex justify-center">
            <a
              href="mailto:contact@oswaldorosalesdev.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
            >
              <Mail className="h-6 w-6" />
              contact@oswaldorosalesdev.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
