import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = false, ...props }, ref) => (
  <div
    role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    ref={ref}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };

// How to use this component:
// <Separator />
