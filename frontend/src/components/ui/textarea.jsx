import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder:text-white/25 focus:border-white/20 focus:ring-1 focus:ring-white/20 focus:outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
