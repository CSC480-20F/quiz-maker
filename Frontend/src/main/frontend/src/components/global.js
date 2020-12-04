import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  
  #dark-mode-icon {
    color: ${({ theme }) => theme.text};
  }

  html, body{
    background: ${({ theme }) => theme.body};
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: Roboto
    transition: all 2s linear; 
  }

  .header {
    color: ${({ theme }) => theme.headerColor};
  }

  .subtitle {
    color: ${({ theme }) => theme.subtitleColor};
  }

  #topnavbar {
    background: ${({ theme }) => theme.navbarBackground};
  }

  #dark-mode-button {
    background-color: ${({ theme }) => theme.createButtonColor};
    border-color: ${({ theme }) => theme.createButtonColor};
    color: ${({ theme }) => theme.createButtonText};
  }

  .dark-mode-button:hover{
    background-color: ${({ theme }) => theme.createButtonColor};
    border-color: ${({ theme }) => theme.createButtonColor};
    color: ${({ theme }) => theme.createButtonText};
  }

  #text {
    color: ${({ theme }) => theme.text};
  }

  #purple-text{
    color: ${({ theme }) => theme.goldenText};
  }

  #loading {
    color: ${({ theme }) => theme.goldenText};
  }

  .manage-panel{
    background: ${({ theme }) => theme.body};
    border: ${({ theme }) => theme.body};
  }

  #toggle-icon {
    color: ${({ theme }) => theme.goldenText};
  }

  .nav-tabs {
    border-bottom: 1px solid ${({ theme }) => theme.body};
  }

  .nav-tabs .nav-link{
    color: ${({ theme }) => theme.subtitleColor};
    background-color: ${({ theme }) => theme.body};
  }

  .nav-item.nav-link.active{
    color: ${({ theme }) => theme.subtitleColor};
    background-color: ${({ theme }) => theme.body};
    border: 2px solid ${({ theme }) => theme.subtitleColor};
  }

  #taking-quiz-title {
    color: ${({ theme }) => theme.white};
  }

  #taking-quiz-topic{
    color: ${({ theme }) => theme.white};
  }

  .this-subtitle{
    color: ${({ theme }) => theme.darkGray};
  }

  #edit-dark-mode-text {
    title: ${({ theme }) => theme.title};
  }



  `