import { getSkillsByCategory } from "@/lib/constants/data";
import type { SkillCategory } from "@/types";

const categoryIcons: Record<SkillCategory, string> = {
  Languages: "💻",
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  Infrastructure: "☁️",
  Tools: "🛠️",
};

const categories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Infrastructure",
  "Tools",
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive expertise across the full development stack
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categorySkills = getSkillsByCategory(category);

            return (
              <div
                key={category}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{categoryIcons[category]}</span>
                  <h3 className="text-xl font-bold text-slate-900">{category}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="text-slate-700 font-medium">{skill.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          skill.level === "Expert"
                            ? "bg-green-100 text-green-700"
                            : skill.level === "Advanced"
                            ? "bg-blue-100 text-blue-700"
                            : skill.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🏛️</div>
              <h4 className="font-bold text-slate-900 mb-1">Architectural Thinking</h4>
              <p className="text-sm text-slate-600">IBM • November 2020</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-bold text-slate-900 mb-1">
                IBM Automation Essentials
              </h4>
              <p className="text-sm text-slate-600">IBM • June 2020</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🏦</div>
              <h4 className="font-bold text-slate-900 mb-1">
                Banking Industry Jumpstart
              </h4>
              <p className="text-sm text-slate-600">IBM • December 2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
