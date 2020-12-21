import React, { Component } from 'react';

import StyledCategory from './categoryStyles';
import Menu from '../menu/menu.jsx';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.uuid,
      name: this.props.name,
      editMode: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (
      this.state.editMode &&
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target)
    ) {
      this.setState({ editMode: false });
    }
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    return (
      <StyledCategory>
        <div className="c-category-header">
          <Menu toggleEditMode={this.toggleEditMode} />
          <input
            type="text"
            className={`name ${this.state.editMode ? 'editMode' : ''}`}
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            ref={this.setWrapperRef}
          />
        </div>
        <div className="c-category-body">{this.props.children}</div>
      </StyledCategory>
    );
  }
}

export default Category;
