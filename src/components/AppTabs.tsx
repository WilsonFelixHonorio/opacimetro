import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Laudos", path: "/" },
  { label: "Veículos", path: "/veiculos" },
];

export function AppTabs() {
  const { pathname } = useLocation();

  return (
    <nav className="flex gap-1 border-b bg-card px-6">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
            pathname === tab.path
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
