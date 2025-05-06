import React from 'react';
import { useFormContext, FormProvider } from 'react-hook-form';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Form = ({ children, onSubmit, className, ...methods }) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

const FormItem = ({ className, ...props }) => (
  <div className={cn("space-y-2", className)} {...props} />
);

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    ref={ref}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("relative", className)} ref={ref} {...props} />
));
FormControl.displayName = "FormControl";

const FormMessage = ({ children }) => (
  <p className="text-xs text-red-600">{children}</p>
);

const FormField = ({ name, control, render }) => {
  const { register, formState: { errors } } = useFormContext();
  return render({
    field: {
      ...register(name),
      name,
    },
    error: errors[name],
  });
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
};
