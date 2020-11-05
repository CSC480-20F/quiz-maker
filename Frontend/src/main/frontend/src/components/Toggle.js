// Toggle.js
import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { HiMoon } from "react-icons/hi"; //https://react-icons.github.io/react-icons/icons?name=hi

const ToggleDark = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (

    <HiMoon id="toggle-icon"
    onClick={toggleTheme} style={{ fontSize:'20px', cursor:'pointer'}}>
    </HiMoon>
    

  );
};

ToggleDark.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default ToggleDark;
