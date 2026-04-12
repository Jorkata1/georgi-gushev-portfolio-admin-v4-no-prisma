import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none ring-0 transition-all duration-300 focus:border-primary/[0.45] focus:bg-white/[0.08]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
