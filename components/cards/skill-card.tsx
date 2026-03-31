import type { SkillGroup } from "@/types";

type SkillCardProps = {
  group: SkillGroup;
};

export function SkillCard({ group }: SkillCardProps) {
  return (
    <article className="surface card-hover h-full p-6">
      <h3 className="text-xl font-semibold text-white">{group.title}</h3>
      <p className="mt-3 text-sm text-slate-300">{group.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
