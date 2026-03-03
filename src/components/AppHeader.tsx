import { ReactNode } from "react";
import { AppTabs } from "@/components/AppTabs";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AppHeaderProps {
  children?: ReactNode;
}

export function AppHeader({ children }: AppHeaderProps) {
  return (
    <>
      <header className="border-b bg-card shadow-sm">
        <div className="px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Painel de Laudos de Opacidade
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Usina Açucareira Guaíra — CNPJ: 07.948.124.0001/42
              </p>
            </div>
            <div className="flex items-center gap-3">
              {children}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <AppTabs />
    </>
  );
}
