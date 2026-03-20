"use client";

import { useState } from "react";
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/lib/constants/data";
import { calculateDuration } from "@/lib/utils";
import { MarkdownText } from "@/components/ui/MarkdownText";

export function Experience() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            9+ years building enterprise applications and microservices architectures
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-300" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                    isEven ? "" : "md:grid-flow-dense"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
                  </div>

                  {/* Content */}
                  <div className={`${isEven ? "md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      {/* Company & Role */}
                      <div className="mb-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-900">
                              {exp.role}
                            </h3>
                            <p className="text-lg font-semibold text-blue-600">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                          <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                            {calculateDuration(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-700 mb-4">{exp.description}</p>

                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
                      >
                        {expandedIds.has(exp.id) ? (
                          <>
                            <ChevronUp className="h-5 w-5" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-5 w-5" />
                            Show Key Achievements
                          </>
                        )}
                      </button>

                      {/* Achievements (Collapsible) */}
                      {expandedIds.has(exp.id) && (
                        <div className="mb-4 animate-in slide-in-from-top-2 duration-300">
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-slate-700"
                              >
                                <span className="text-blue-600 mt-1.5">•</span>
                                <span>
                                  <MarkdownText text={achievement} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for timeline alignment */}
                  <div className="hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
