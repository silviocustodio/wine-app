import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Header, Divider, Image } from 'semantic-ui-react';
import { BottleContainer } from './components/BottleContainer';
import Logo from './assets/logo_wine.png';

const Content = styled.div`
  margin: 50px 0;
`;

const theme = {
  bold: '#0C0816'
};

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${theme.bold};
    font-family: 'Open Sans', sans-serif;
    padding: 0 100px  !important;
  }

  a,
  a:hover {
    color: inherit;
  }
`;

const App = () => {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Content>
          <Header as="h2" icon inverted textAlign="center" >
            <Link to="/">
              <Image centered src={Logo} />
            </Link>
            <Divider />
            <Header.Subheader>
              {
                'Find the best wines in the world!'
              }
            </Header.Subheader>
          </Header>
          <Divider />
          <BottleContainer />
        </Content>
      </Fragment>
    </ThemeProvider>
    </Router>
  );
}

export default App;
