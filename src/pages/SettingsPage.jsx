import { RequireAuth } from "../components/providers/RequireAuth.jsx";
import { AppShell } from "../components/layout/AppShell.jsx";
import { SettingsDashboard } from "../components/dashboard/SettingsDashboard.jsx";

export default function SettingsPage() {
  return (
    <RequireAuth>
      <AppShell title="Settings" description="Profile, appearance, and account preferences">
        <SettingsDashboard />
      </AppShell>
    </RequireAuth>
  );
}
