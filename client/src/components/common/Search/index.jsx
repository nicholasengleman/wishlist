import React, { useState } from 'react';
import styled from 'styled-components';
import { buttonColor } from '../../../globalStyles/mixins';

const FormWithIcon = styled.form`
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  transform-origin: center left;
  .fas {
    position: absolute;
    top: 8px;
    left: 10px;
  }
`;

const SearchInput = styled.input`
  ${buttonColor}
  height: 38px;
  width: ${(props) => (props.status ? '400px' : '240px')};
  border-radius: 5px;
  transition: all 0.3s;
  padding: 16px 40px;
  border: none;
  outline: none;
  letter-spacing: 1px;
  font-size: 16px;
`;

export default function SearchBox() {
  const [inputState, setInputState] = useState();

  return (
    <FormWithIcon status={inputState}>
      <i className="fas fa-search" />
      <SearchInput
        type="search"
        status={inputState}
        onFocus={() => setInputState(true)}
        onBlur={() => setInputState(false)}
        placeholder="Search Wishlist"
      />
    </FormWithIcon>
  );
}
