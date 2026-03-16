
import React from 'react';

// This component is no longer used in the navigation-based UI.
// Returning null removes it from the component tree.
export const SearchForm: React.FC<{ onSearch: (query: string) => void; isLoading: boolean; }> = () => {
  return null;
};
