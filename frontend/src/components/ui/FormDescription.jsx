import React, { forwardRef } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const FormDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
FormDescription.displayName = "FormDescription";

export { FormDescription };
