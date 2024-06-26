"use client";

import { Link, usePathname } from "@/lib/navigation";
import { cn } from "@/utils/style";
import { useTranslations } from "next-intl";
import { buttonVariants } from "../ui/button";
import LogoutDialog from "./logout-dialog";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: Record<
    string,
    {
      href: string;
      title: string;
    }[]
  >;
}

export default function SidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  const t = useTranslations("settings.sidebar-nav");

  return (
    <nav
      className={cn(
        "flex h-full w-full items-start justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div className="flex h-full w-full flex-col gap-8">
        {Object.entries(items).map(([groupName, groupItems]) => (
          <div key={groupName}>
            <h2 className="text-muted-foreground mb-2 px-4 text-xs font-bold uppercase">
              {t(groupName)}
            </h2>
            <div className="flex h-full w-full space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {groupItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start"
                  )}
                >
                  {t(item.title)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <LogoutDialog />
    </nav>
  );
}
