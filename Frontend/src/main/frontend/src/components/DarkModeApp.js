// App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useDarkMode } from './useDarkMode';
import Toggle from './Toggle';

// The function that toggles between themes
function DarkModeApp() {

    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!componentMounted) {
        return <div />
      };

    return (
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          <Toggle theme={theme} toggleTheme={toggleTheme} />
          {/* <h1>It's a {theme === 'light' ? 'light theme' : 'dark theme'}!</h1> */}
        </>
      </ThemeProvider>
    );
  }
  

export default DarkModeApp;