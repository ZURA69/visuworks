import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full bg-black/[0.02] border border-black/[0.08] px-4 py-3 text-[#1A1A1A] text-sm placeholder:text-[#1A1A1A]/25 focus:border-black/20 focus:ring-1 focus:ring-black/20 focus:outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
