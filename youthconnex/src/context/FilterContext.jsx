import { createContext, useContext, useState, useCallback } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [radius, setRadius] = useState(10);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setCategory(null);
    setRadius(10);
  }, []);

  const value = {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    radius,
    setRadius,
    clearFilters
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
