import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title mt-4 text-balance">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
