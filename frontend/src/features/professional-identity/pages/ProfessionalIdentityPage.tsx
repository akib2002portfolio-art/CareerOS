export function ProfessionalIdentityPage() {
  const sections = [
    "Personal Information",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Professional Identity
        </h1>

        <p className="mt-2 text-slate-600">
          Build your professional identity one step at a time.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Coming Soon
        </h2>

        <p className="mt-3 text-slate-600 leading-relaxed">
          This module will guide you through building your professional
          identity. Each completed step unlocks new CareerOS features and
          improves your Career Health.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Upcoming Sections
        </h2>

        <ul className="mt-4 space-y-3">
          {sections.map((section) => (
            <li
              key={section}
              className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-slate-500"
            >
              ✓ {section}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}