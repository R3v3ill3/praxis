import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className={cn("animate-pulse bg-secondary/50 rounded-md", className)}
    ref={ref}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";

export { Skeleton };

// How to use this component:
// <Skeleton className="h-4 w-32" />
