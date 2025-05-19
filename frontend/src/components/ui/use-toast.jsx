// /var/www/praxis/frontend/src/components/ui/use-toast.jsx
import React from 'react'; // Import React to use useCallback
import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
  // Memoize the toast function so it's stable across re-renders
  // unless its own dependencies change (it has none here other than sonnerToast).
  const toast = React.useCallback(
    ({ title, description, action, ...props }) => {
      return sonnerToast(title, {
        description,
        action,
        ...props,
      });
    },
    [] // Empty dependency array means this function is created once and memoized
  );

  // It's also common for useToast hooks to return the toast function directly
  // or ensure the returned object is stable if it contains multiple items.
  // For consistency with your current structure:
  return React.useMemo(() => ({ toast }), [toast]);
  // A simpler and often preferred way if only returning toast:
  // return toast; // Then in your component: const toast = useToast();
  // But since your component uses `const { toast } = useToast()`,
  // returning an object `{ toast }` where the function itself is memoized is key.
  // The useMemo around the return object ensures the object itself is also stable.
};

// You might also need a Toaster component in your root layout or app
// import { Toaster } from 'sonner';
// <Toaster />
