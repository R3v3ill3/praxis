import React, { forwardRef } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const FormControl = forwardRef(({ className, ...props }, ref) => (
  <div className={cn("relative", className)} ref={ref} {...props} />
));
FormControl.displayName = "FormControl";

export { FormControl };
