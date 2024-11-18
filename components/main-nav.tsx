"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeid}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeid}/settings`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-medium",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
