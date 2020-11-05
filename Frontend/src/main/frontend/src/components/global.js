import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    ${'' /* align-items: center; */}
    background: ${({ theme }) => theme.body};
    ${'' /* color: ${({ theme }) => theme.text}; */}
    ${'' /* display: flex; */}
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: Roboto
    transition: all 0.25s linear;    
  }
  
  #dark-mode-icon {
    color: ${({ theme }) => theme.text};
  }

  html, body, body > div{
    background: ${({ theme }) => theme.body};
    ${'' /* color: ${({ theme }) => theme.text}; */}
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: Roboto
    transition: all 0.25s linear; 
  }

  ${'' /* #card {
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
  } */}

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

  #form-input {
    background: ${({ theme }) => theme.body};
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
    font-size: 20px;
    color: ${({ theme }) => theme.subtitleColor};
    background-color: ${({ theme }) => theme.body};
    border: 1px solid ${({ theme }) => theme.body};
    font-weight: bolder;
    opacity: 0.5;
  }

  .nav-item.nav-link.active{
    opacity: 1;
    color: ${({ theme }) => theme.subtitleColor};
    background-color: ${({ theme }) => theme.body};
    border: 1px solid ${({ theme }) => theme.body};
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

 #correct-answer-label{
  background-color: ${({ theme }) => theme.green};
 }

 

 



  `