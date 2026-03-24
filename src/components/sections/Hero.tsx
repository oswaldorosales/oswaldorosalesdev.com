import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/constants/data";

export function Hero() {
  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-2">
              <p className="text-blue-400 font-medium text-lg">Hello, I&apos;m</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-300 font-semibold">
                {personalInfo.title}
              </h2>
            </div>

            {/* Profile Image - Mobile Only */}
            <div className="flex justify-center lg:hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl">
                  <picture>
                    <source
                      srcSet="/images/profile.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/images/profile.webp"
                      type="image/webp"
                    />
                    <img
                      src="/images/profile.webp"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </picture>
                </div>
              </div>
            </div>

            <p className="text-xl text-slate-400 max-w-2xl">
              {personalInfo.headline}
            </p>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 group"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={personalInfo.resume}
                download
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-all duration-200"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start pt-6">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                    aria-label={link.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Profile Image - Desktop Only */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl">
                <picture>
                  <source
                    srcSet="/images/profile.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/profile.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/profile.webp"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-slate-400 rounded-full animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
}
