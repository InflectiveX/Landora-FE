import { useState, useEffect } from 'react';

// Hook for managing loading states
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    loading,
    startLoading,
    stopLoading,
    setLoading
  };
};

// Hook for managing form states
export const useFormState = <T extends Record<string, any>>(initialValues: T = {} as T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>({} as Record<keyof T, string | null>);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const setError = (name: keyof T, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const clearErrors = () => setErrors({} as Record<keyof T, string | null>);
  const resetForm = () => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string | null>);
  };

  return {
    values,
    errors,
    handleChange,
    setError,
    clearErrors,
    resetForm,
    setValues
  };
};

// Hook for local storage
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Hook for managing modal states
export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};
