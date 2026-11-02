import { createContext, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FolderGit2, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings, X } from "lucide-react";
import { RepoLensIcon } from "../icons/RepoLensIcon.jsx";
import { ModeToggle } from "../ui/ModeToggle.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar.jsx";
import { Separator } from "../ui/Separator.jsx";
import { Dropdown, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "../ui/Dropdown.jsx";
import { cn } from "../../lib/utils.js";
import { dashboardNavGroups, isDashboardNavActive } from "../../lib/dashboardNav.js";
import { useCurrentUser, useLogout } from "../../hooks/useAuth.js";
import { useRepos } from "../../hooks/useRepos.js";

export const AppShellContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  collapsed: false,
  setCollapsed: () => {},
  toggleCollapsed: () => {},
});

export function useAppShell() {
  return useContext(AppShellContext);
}

export function BrandMark({ className, showText = true }) {
  return (
    <div className={cn("flex items-center gap-2.5 font-semibold tracking-tight", className)}>
      <RepoLensIcon className="size-8 shrink-0 rounded-[10px]" />
      {showText && <span className="font-heading text-[1.05rem] leading-none">RepoLens</span>}
    </div>
  );
}

function SidebarNav({ onNavigate }) {
  const location = useLocation();
  const reposQuery = useRepos();
  const repos = reposQuery.data ?? [];
  const recentRepos = repos.filter((repo) => repo.indexStatus === "READY").slice(0, 5);

  return (
    <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3 space-y-4">
      {dashboardNavGroups.map((group) => (
        <div key={group.label} className="space-y-1">
          <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            {group.label}
          </p>
          {group.items.map((item) => {
            const active = isDashboardNavActive(location.pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs font-semibold"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {recentRepos.length > 0 && (
        <div className="space-y-1 pt-2 border-t border-sidebar-border/50">
          <div className="flex items-center justify-between px-3 py-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Repositories
            </p>
            <Link
              to="/dashboard"
              onClick={onNavigate}
              className="text-[11px] text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              All ({repos.length})
            </Link>
          </div>
          {recentRepos.map((repo) => {
            const active = location.pathname === `/chat/${repo.id}`;
            const isReady = repo.indexStatus === "READY";
            return (
              <Link
                key={repo.id}
                to={isReady ? `/chat/${repo.id}` : "/dashboard"}
                onClick={onNavigate}
                title={repo.fullName}
                className={cn(
                  "group flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <FolderGit2 className="size-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
                  <span className="truncate">{repo.name}</span>
                </div>
                {isReady ? (
                  <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" title="Ready to chat" />
                ) : repo.indexStatus === "INDEXING" ? (
                  <span className="size-1.5 shrink-0 rounded-full bg-amber-500 animate-pulse" title="Indexing" />
                ) : repo.indexStatus === "FAILED" ? (
                  <span className="size-1.5 shrink-0 rounded-full bg-rose-500" title="Failed" />
                ) : (
                  <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/40" title="Pending" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function SidebarFooterUser({ onNavigate }) {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div className="shrink-0 border-t border-sidebar-border/70 p-2">
      <Dropdown
        align="end"
        trigger={
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-sidebar-accent transition-colors"
          >
            <Avatar className="size-8 rounded-lg shrink-0">
              <AvatarImage src={user?.avatarUrl ?? undefined} alt={user?.displayName} />
              <AvatarFallback className="rounded-lg">
                {(user?.displayName ?? "DP").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
              <span className="truncate font-medium">{user?.displayName}</span>
              <span className="truncate text-xs text-muted-foreground">@{user?.githubUsername}</span>
            </div>
          </button>
        }
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{user?.displayName}</span>
              <span className="text-xs text-muted-foreground">Connected via GitHub</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { navigate("/dashboard/settings"); onNavigate?.(); }}>
          <Settings className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout.mutate()} disabled={logout.isPending}>
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </Dropdown>
    </div>
  );
}

export function AppShell({ children, title, description, actions, hideHeader = false, fullHeight = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("repolens_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("repolens_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  const contextValue = {
    sidebarOpen,
    setSidebarOpen,
    openSidebar: () => setSidebarOpen(true),
    closeSidebar: () => setSidebarOpen(false),
    collapsed,
    setCollapsed,
    toggleCollapsed,
  };

  return (
    <AppShellContext.Provider value={contextValue}>
      <div className="flex h-svh w-full overflow-hidden bg-background">
        {/* Sidebar — desktop: pinned sticky fixed height column, ChatGPT style */}
        <aside
          className={cn(
            "sticky top-0 hidden h-svh min-h-0 shrink-0 flex-col border-r bg-sidebar md:flex select-none transition-[width] duration-200",
            collapsed ? "w-0 overflow-hidden border-r-0" : "w-64"
          )}
        >
          <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-sidebar-border/70">
            <Link to="/dashboard" className="transition-opacity hover:opacity-90">
              <BrandMark />
            </Link>
            <button
              type="button"
              onClick={toggleCollapsed}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="size-4" />
            </button>
          </div>
          <SidebarNav />
          <SidebarFooterUser />
        </aside>

        {/* Sidebar — mobile overlay drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-72 flex flex-col bg-sidebar border-r shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-sidebar-border/70">
                <BrandMark />
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              <SidebarNav onNavigate={() => setSidebarOpen(false)} />
              <SidebarFooterUser onNavigate={() => setSidebarOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main content column */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col h-full overflow-hidden">
          {!hideHeader && (
            <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md">
              <button
                type="button"
                className="md:hidden -ml-1 rounded p-1 hover:bg-accent text-muted-foreground hover:text-foreground"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
              {collapsed && (
                <button
                  type="button"
                  className="hidden md:inline-flex -ml-1 rounded p-1.5 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  onClick={toggleCollapsed}
                  title="Expand sidebar"
                  aria-label="Expand sidebar"
                >
                  <PanelLeftOpen className="size-4" />
                </button>
              )}
              <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />
              <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                  {title && <h1 className="truncate font-heading text-sm font-medium">{title}</h1>}
                  {description && <p className="truncate text-xs text-muted-foreground">{description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {actions}
                  <ModeToggle />
                </div>
              </div>
            </header>
          )}

          {/* Scrollable content container */}
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-x-hidden",
              fullHeight ? "overflow-hidden" : "overflow-y-auto"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
