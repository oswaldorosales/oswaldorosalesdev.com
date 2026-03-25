'use client';

import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/constants/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{personalInfo.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {personalInfo.title} based in {personalInfo.location}. Building scalable
              applications and sharing knowledge with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.resume}
                  className="hover:text-white transition-colors"
                  download
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-400">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using
            Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
