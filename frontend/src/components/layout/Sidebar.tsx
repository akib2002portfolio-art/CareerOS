const navigation = [
  "Dashboard",
  "Resumes",
  "Career Vault",
  "Projects",
  "Job Tracker",
  "AI Assistant",
  "Settings",
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>⚡</span>
          <span className="font-extrabold">CareerOS</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your Career Operating System</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {navigation.map((item) => {
            const isActive = item === "Dashboard";
            return (
              <li key={item}>
                <button
                  className={`w-full text-left transition-all duration-200 ${isActive ? "bg-indigo-600 text-white shadow-sm rounded-xl px-4 py-2" : "rounded-lg px-4 py-2 hover:bg-zinc-100"}`}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t mt-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5B5FEF] to-[#8B8FFF] flex items-center justify-center text-white font-mono">A</div>
            <div className="text-sm">
              <div className="font-medium">Akib Al Imran</div>
              <div className="text-xs text-zinc-500">Software Engineer</div>
            </div>
          </div>
          <div className="text-zinc-400">▾</div>
        </div>
      </div>
    </aside>
  );
}