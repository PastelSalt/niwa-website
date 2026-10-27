import { useTheme } from "./theme-provider";

export function Sidebar() {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: "Inbox", href: "/app/inbox" },
    { label: "Projects", href: "/app/projects" },
    { label: "Focus", href: "/app/focus" },
    { label: "Search", href: "/app/search" },
    { label: "Settings", href: "/app/settings" },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
      <div className="p-4">
        <div className="text-lg font-semibold tracking-tight">niwa</div>
        <div className="text-xs text-muted-foreground mt-1">A garden for your ideas.</div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </aside>
  );
}
