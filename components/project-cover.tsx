import Image from "next/image";

import type { Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  project: Pick<Project, "title" | "techStack" | "cover">;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// Shows the project's image whole (never cropped) on a muted panel. Projects
// without an image get a monogram of their name and their first technologies.
export function ProjectCover({
  project,
  sizes,
  priority = false,
  className,
}: ProjectCoverProps) {
  return (
    <div
      className={cn(
        // min-h-0 keeps the aspect ratio: by default a tall image would stretch the panel.
        "flex aspect-[16/10] min-h-0 items-center justify-center rounded-lg bg-muted p-3",
        className
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          sizes={sizes}
          priority={priority}
          className="h-auto max-h-full w-auto max-w-full rounded-md shadow-lg ring-1 ring-black/5 dark:ring-white/10"
        />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <span
            aria-hidden
            className="text-4xl font-bold tracking-tight text-muted-foreground"
          >
            {monogram(project.title)}
          </span>
          <ul className="flex flex-wrap justify-center gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <li
                key={tech}
                className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// "Fine-tuned BERT | ..." -> "FB", "SupportMesh | ..." -> "SM"
function monogram(title: string) {
  const name = title.split("|")[0].trim();
  const words = name.split(/\s+/);
  const letters =
    words.length > 1
      ? words.map((word) => word[0])
      : (name.match(/[A-Z]/g) ?? [name[0]]);
  return letters.slice(0, 2).join("").toUpperCase();
}
