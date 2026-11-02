import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Dropdown, DropdownMenuItem } from "../ui/Dropdown.jsx";
import { Button } from "../ui/Button.jsx";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Dropdown
      align="end"
      trigger={
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      }
    >
      <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
    </Dropdown>
  );
}
