import React, { Component } from 'react';

export class CommentBtn extends Component {
  render() {
    return (
      <a className="waves-effect waves-blue btn-flat" onClick={this.props.openCommentModal}>
        Opinions <i className="material-icons left">comment</i>
      </a>
    );
  }
}
