import { RefreshCw, Search, Menu, PanelLeftOpen } from "lucide-react";
import { ModeToggle } from "../ui/ModeToggle.jsx";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { Separator } from "../ui/Separator.jsx";
import { cn } from "../../lib/utils.js";
import { useAppShell } from "../layout/AppShell.jsx";

const visibilityFilters = [
  { value: "all", label: "All" },
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const statusFilters = [
  { value: "ALL", label: "All" },
  { value: "READY", label: "Ready" },
  { value: "INDEXING", label: "Indexing" },
  { value: "PENDING", label: "New" },
  { value: "FAILED", label: "Failed" },
];

function FilterPill({ active, onClick, count, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all select-none cursor-pointer",
        active
          ? "border-foreground/20 bg-foreground text-background shadow-xs"
          : "border-dashed border-border bg-background/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-accent/40"
      )}
    >
      <span>{children}</span>
      {count != null && (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.2 text-[10px] font-semibold leading-none",
            active ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function DashboardHeader({
  search,
  onSearchChange,
  visibility,
  onVisibilityChange,
  status,
  onStatusChange,
  totalCount,
  readyCount,
  statusCounts,
  onSync,
  isSyncing,
}) {
  const { openSidebar, collapsed, toggleCollapsed } = useAppShell();

  return (
    <header className="sticky top-0 z-30 w-full shrink-0 self-start border-b bg-background/95 backdrop-blur-md shadow-xs">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={openSidebar}
              className="md:hidden -ml-1 rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label="Open sidebar menu"
            >
              <Menu className="size-5" />
            </button>

            {/* Desktop re-open trigger if sidebar is collapsed */}
            {collapsed && (
              <button
                type="button"
                onClick={toggleCollapsed}
                className="hidden md:inline-flex -ml-1 rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="size-4" />
              </button>
            )}

            <div className="min-w-0">
              <h1 className="font-heading text-xl font-semibold tracking-tight">Repositories</h1>
              <p className="text-sm text-muted-foreground">
                {totalCount != null
                  ? `${totalCount} connected · ${readyCount ?? 0} ready`
                  : "Sync and index a repo to start chatting"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative min-w-[220px] flex-1 sm:min-w-[280px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search repositories…"
                className="border-dashed bg-background pl-9 shadow-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-dashed shadow-xs" onClick={onSync} disabled={isSyncing}>
                <RefreshCw className={cn("size-4", isSyncing && "animate-spin")} />
                Sync
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>

        <Separator className="opacity-60" />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground">Visibility</span>
            {visibilityFilters.map((filter) => (
              <FilterPill
                key={filter.value}
                active={visibility === filter.value}
                onClick={() => onVisibilityChange(filter.value)}
              >
                {filter.label}
              </FilterPill>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground">Status</span>
            {statusFilters.map((filter) => (
              <FilterPill
                key={filter.value}
                active={status === filter.value}
                count={statusCounts?.[filter.value]}
                onClick={() => onStatusChange(filter.value)}
              >
                {filter.label}
              </FilterPill>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
