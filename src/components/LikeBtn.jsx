import React, { Component } from 'react';
import { Loader } from './Loader';
import * as BottlesAPI from '../services/BottlesAPI';

export class LikeBtn extends Component {

    state = {
        loading: false,
        liked: null,
      };
    
      componentDidMount() {
        this.updateLike();
      }
    
      componentWillReceiveProps(nextProps) {
        this.setState({ liked: null }, () => {
          this.updateLike();
        });
      }
    
      updateLike = () => {
        this.setState({ loading: true }, () => {
          return BottlesAPI.fetchLiked(this.props.wine.id).then(liked => {
            this.setState({ liked: liked.like, loading: false });
          });
        });
      };
    
      toggle = e => {
        e.preventDefault();
        if (this.state.liked) {
          this.setState({ liked: !this.state.liked }, () => {
            BottlesAPI.unlikeWine(this.props.wine.id).then(() => this.updateLike());
          });
        } else {
          this.setState({ liked: !this.state.liked }, () => {
            BottlesAPI.likeWine(this.props.wine.id).then(() => this.updateLike());
          });
        }
      };
    
      render() {
        return (
          <a className="waves-effect waves-blue btn-flat" onClick={this.toggle}>
            {this.state.loading && <Loader />}
            {this.state.liked === true && (
              <span>
                Dislike <i className="material-icons left">thumb_down</i>
              </span>
            )}
            {this.state.liked === false && (
              <span>
                Like <i className="material-icons left">thumb_up</i>
              </span>
            )}
          </a>
        );
      }
 
}