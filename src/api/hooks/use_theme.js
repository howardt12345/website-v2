import React, { useState } from 'react';

import { theme_light, theme_dark } from '@styles';

export function useTheme() {
  const [theme, setTheme] = useState(theme_dark);

  function toggleTheme(){
    setTheme(theme === theme_light ? theme_dark : theme_light);
  }

  return [theme, toggleTheme];
}