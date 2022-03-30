import React, { useState } from 'react';
import styled from 'styled-components';

const FormWithIcon = styled.form`
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  transform-origin: center left;
  .fas {
    transition: all 0.2s ease-in-out;
    position: absolute;
    top: 11px;
    left: 13px;
    color: ${(props) => props.theme.headerText};
  }
  &:hover {
    .fas {
      color: #2f2f2f;
    }
  }
`;

const SearchInput = styled.input`
  background-color: #edeef4;
  height: 38px;
  width: ${(props) => (props.status ? '400px' : '240px')};
  border-radius: 10px;
  transition: all 0.3s;
  padding: 0 40px;
  border: none;
  outline: none;
  letter-spacing: 1px;
  font-size: 16px;
  &::placeholder {
    color: ${(props) => props.theme.headerText};
    font-weight: 600;
  }
`;

export default function SearchBox() {
  const [inputState, setInputState] = useState();

  return (
    <FormWithIcon status={inputState}>
      <i aria-hidden className="fas fa-search" />
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
