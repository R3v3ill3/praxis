import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const FormItem = ({ className, ...props }) => (
  <div className={cn("space-y-2", className)} {...props} />
);

export { FormItem };
