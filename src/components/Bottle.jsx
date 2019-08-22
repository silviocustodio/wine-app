import React, { Component } from 'react';
import { Loader } from '../components/Loader';
import * as BottlesAPI from '../services/BottlesAPI';
import { LikeBtn } from '../components/LikeBtn';
import { CommentBtn } from '../components/CommentBtn';
import { CommentList} from '../components/CommentList';
import { CommentModal } from '../components/CommentModal';

export class Bottle extends Component {
  render() {
    if (this.props.wine === null) {
      return null;
    }
    return (
      <div className="col s12 m12 l6 offset-l3">
        <h2 className="center-align title-screen" >Description</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img
              className="responsive-img wine-detail-image"
              alt="Wine bottle pic"
              src={`${this.props.host}/api/wines/${this.props.wine.id}/image`}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content list-description ">
              <h3>{this.props.wine.name}</h3>
              <br />
              <p>
                <b>Appellation:</b> {this.props.wine.appellation.name}
              </p>
              <p>
                <b>Vineyard:</b> {this.props.wine.appellation.region}
              </p>
              <p>
                <b>Color:</b> {this.props.wine.type}
              </p>
              <p>
                <b>Grapes:</b> {this.props.wine.grapes.join(', ')}
              </p>
              <br></br>
              <CommentList wine={this.props.wine} />
            </div>
            <div className="card-action">
              <LikeBtn wine={this.props.wine} />
              <CommentBtn openCommentModal={this.props.openCommentModal} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class WinePage extends Component {
  state = {
    loading: false,
    selectedWine: null,
    commentModalOpen: false,
  };

  componentDidMount() {
    const id = this.props.match.params.wineId;
    this.setState({ loading: true }, () => {
        BottlesAPI.fetchWine(id).then(wine => {
        this.setState({
          loading: false,
          selectedWine: wine,
        });
      });
    });
  }

  closeCommentModal = () => {
    this.setState({ commentModalOpen: false });
  };

  openCommentModal = () => {
    this.setState({ commentModalOpen: true });
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
      <div>
        <Bottle
          host={BottlesAPI.host}
          wine={this.state.selectedWine}
          openCommentModal={this.openCommentModal}
        />
        <CommentModal
          wine={this.state.selectedWine}
          isOpen={this.state.commentModalOpen}
          closeCommentModal={this.closeCommentModal}
        />
      </div>
    );
  }
}
