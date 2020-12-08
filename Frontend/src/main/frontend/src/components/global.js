// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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