import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/calculator", label: "Calculator" },
    { href: "/announcements", label: "Announcements" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="hidden sm:inline">AAU Admissions</span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
