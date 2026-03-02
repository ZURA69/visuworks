import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-base placeholder:text-white/30 focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
