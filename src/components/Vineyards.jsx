import React, { Component } from 'react';
import * as BottlesAPI from '../services/BottlesAPI';
import { Loader } from '../components/Loader';

export class Vineyards extends Component {
  onSelectRegion = (e, region) => {
    e.preventDefault();
    this.props.onSelectRegion(region);
  };

  render() {
    return (
      <div className="col s12 m6 l4 offset-m3 offset-l4">
        <h2 className="center-align title-screen">Vineyards</h2>
        <div className="collection  ">
          {this.props.regions.map(region => (
            <a
              key={region}
              href="#!"
              onClick={e => this.onSelectRegion(e, region)}
              className={['collection-item ', region === this.props.region ? 'active' : '' ].join(
                ' '
              )} >
                <div className="list-style">
                  <b>{region}</b>
                </div>
            
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export class RegionsPage extends Component {
  state = {
    loading: false,
    regions: [],
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      BottlesAPI.fetchRegions().then(regions => {
        this.setState({
          loading: false,
          regions,
        });
      });
    });
  }

  onSelectRegion = region => {
    this.props.history.push({
      pathname: `/regions/${region}`,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <Vineyards onSelectRegion={this.onSelectRegion} regions={this.state.regions} region={{}} />
    );
  }
}
