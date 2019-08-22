import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { RegionsPage } from '../components/Vineyards';
import { WineListPage} from '../components/BottleList';
import { WinePage } from '../components/Bottle';
import { NotFound } from '../components/NotFound';

class _WineApp extends Component {
  goBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  goHome = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/`,
    });
  };

  render() {
    const displayButton =
      window.location.pathname === '/' || window.location.pathname === '/wine-app/'
        ? false
        : true;
    return (
      <div > 
       
        <div className="row">
        {displayButton && (
          <div className="center-align" style={{ marginTop: 20 }}>
            <button className="ui grey button" onClick={this.goBack} type="button">Back</button>
            <button className="ui grey button" style={{ marginLeft: 200 }} onClick={this.goHome} type="button">Home</button>
          </div>
        )}
          <Switch>
            <Route exact path="/" component={RegionsPage} />
            <Route exact path="/regions/:regionId/wines/:wineId" component={WinePage} />
            <Route exact path="/regions/:regionId" component={WineListPage} />
            <Route component={NotFound} />
          </Switch>
        </div>

        <footer class="page-footer">
         
          <div class="footer-copyright">
            <div class="container">
            © 2019 Silvio Custodio
            <a class="grey-text text-lighten-4 right" href="https://github.com/silviocustodio"  target="_blank">My GitHub</a>
            </div>
          </div>
        </footer>

     

      </div>
    );
  }
}

export const BottleContainer = withRouter(_WineApp);
