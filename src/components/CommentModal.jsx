import React, { Component } from 'react';
import * as BottlesAPI from '../services/BottlesAPI';

export class CommentModal extends Component {
  state = {
    comment: '',
  };

  componentDidMount() {
    if (this.props.isOpen) {
      window.$(this.modalNode).openModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      if (nextProps.isOpen) {
        window.$(this.modalNode).openModal();
      } else {
        this.setState({ comment: '' });
        window.$(this.modalNode).closeModal();
      }
    }
  }

  componentWillUnmount() {
    window.$(this.modalNode).closeModal();
  }

  onSubmit = e => {
    e.preventDefault();
    const comment = this.state.comment;
    this.setState({ comment: '' });
    BottlesAPI.commentWine(this.props.wine.id, comment).then(() => {
      this.props.closeCommentModal();
    });
  };

  onCommentChange = e => {
    this.setState({ comment: e.target.value });
  };

  render() {
    return (
      <div ref={ref => (this.modalNode = ref)} className="modal">
        <div className="modal-content">
          <h4>Please let us know about your opinion!</h4>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="inputComment"
                  type="text"
                  className="validate"
                  value={this.state.comment}
                  onChange={this.onCommentChange}
                />
                <label htmlFor="inputComment">Write your comment here!</label>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-action waves-effect waves-blue btn-flat "
            onClick={this.onSubmit}>
            Send
          </a>
          <a
            href="#!"
            className="modal-action waves-effect waves-blue btn-flat "
            onClick={this.props.closeCommentModal}>
            Forget
          </a>
        </div>
      </div>
    );
  }
}
