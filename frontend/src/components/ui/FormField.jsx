import React, { createContext, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

const FormContext = createContext({});

const FormField = ({ control, ...props }) => {
  return (
    <FormContext.Provider value={{ control }}>
      {props.children}
    </FormContext.Provider>
  );
};

export { FormField };
