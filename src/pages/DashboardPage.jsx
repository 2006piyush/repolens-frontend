import { RequireAuth } from "../components/providers/RequireAuth.jsx";
import { AppShell } from "../components/layout/AppShell.jsx";
import { RepoDashboard } from "../components/dashboard/RepoDashboard.jsx";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <AppShell hideHeader>
        <RepoDashboard />
      </AppShell>
    </RequireAuth>
  );
}
