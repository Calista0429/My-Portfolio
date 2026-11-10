import Image from "next/image";

import logo from "@/assets/logo-ancient-teal.png";
import { cn } from "@/lib/utils";

// The Ancient Teal mark, in its own colours in both themes. The shape fills
// only about 74% of the square PNG's height and 88% of its width (the rest is
// transparent margin), so pick the box for the height the shape should look:
// 46 shows ~34px, 38 ~28px. alt is empty: the link or the name next to it
// already says what it is.
export function SiteLogo({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={logo}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
