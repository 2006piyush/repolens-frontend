import { RequireAuth } from "../components/providers/RequireAuth.jsx";
import { AppShell } from "../components/layout/AppShell.jsx";
import { OverviewDashboard } from "../components/dashboard/OverviewDashboard.jsx";

export default function OverviewPage() {
  return (
    <RequireAuth>
      <AppShell title="Overview" description="Workspace stats and recent repository activity">
        <OverviewDashboard />
      </AppShell>
    </RequireAuth>
  );
}
