import React, { Component } from 'react';
import { Comment } from '../components/Comment';
import { Loader } from '../components/Loader';
import * as BottlesAPI from '../services/BottlesAPI';

export class CommentList extends Component {
  state = {
    loading: false,
    comments: [],
  };

  componentDidMount() {
    this.updateList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ comments: [] }, () => {
      this.updateList();
    });
  }

  updateList = () => {
    this.setState({ loading: true }, () => {
      return BottlesAPI.fetchComments(this.props.wine.id).then(comments => {
        this.setState({ comments, loading: false });
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.comments.length > 0 && <h5>Comments</h5>}
        {this.state.loading && <Loader />}
        {!this.state.loading &&
          this.state.comments.map(comment => <Comment key={comment.date} comment={comment} />)}
      </div>
    );
  }
}
