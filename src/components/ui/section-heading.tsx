import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-300">
          {eyebrow.toUpperCase()}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}
