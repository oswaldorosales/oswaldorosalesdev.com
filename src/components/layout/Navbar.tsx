"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/">
            <img
              src="/logo.svg"
              alt="Oswaldo Rosales - Home"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/#contact"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-center"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
