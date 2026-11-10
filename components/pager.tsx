"use client";

import { ChevronRight } from "lucide-react";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, localizePath } from "@/i18n/routing";

const Pager = ({
  prevHref,
  nextHref,
  prevTitle,
  nextTitle,
}: {
  prevHref?: string;
  nextHref: string;
  prevTitle?: string;
  nextTitle: string;
}) => {
  const pathname = usePathname();
  // Page names stay English; the links stay in the current language.
  const locale = localeFromPathname(pathname);
  const prev = prevHref && localizePath(prevHref, locale);
  return (
    <div className="flex flex-row items-center justify-between w-full mt-8">
      {prev && prev !== pathname && (
        <Button variant="ghost" asChild>
          <Link href={prev}>
            <ChevronLeft />
            {prevTitle}
          </Link>
        </Button>
      )}

      <Button variant="ghost" className="ml-auto" asChild>
        <Link href={localizePath(nextHref, locale)}>
          {nextTitle}
          <ChevronRight />
        </Link>
      </Button>
    </div>
  );
};
export default Pager;
