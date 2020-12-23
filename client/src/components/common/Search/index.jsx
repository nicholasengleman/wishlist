import React, { useState } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  height: 32px;
  width: 240px;
  border-radius: 50px;
  transition: all 0.3s;
  padding: ${(props) => (props.status ? '16px' : '16px 40px')};
  background-color: white;
  border: none;
  outline: none;
  letter-spacing: 1px;
  font-size: 16px;
`;

const FormWithIcon = styled.form`
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  transform-origin: center right;
  transform: ${(props) => (props.status ? 'scaleX(1.1)' : '')};
  &:after {
    content: '';
    width: 24px;
    height: 24px;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjNjE2MTYxIiBkPSJNMzQuNiAyOC4xSDM4LjZWNDUuMUgzNC42eiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1LjAwMSAzNi41ODYgMzYuNTg3KSI+PC9wYXRoPjxwYXRoIGZpbGw9IiM2MTYxNjEiIGQ9Ik0yMCA0QTE2IDE2IDAgMSAwIDIwIDM2QTE2IDE2IDAgMSAwIDIwIDRaIj48L3BhdGg+PHBhdGggZmlsbD0iIzM3NDc0RiIgZD0iTTM2LjIgMzIuMUg0MC4yVjQ0LjQwMDAwMDAwMDAwMDAwNkgzNi4yeiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1LjAwMSAzOC4yNCAzOC4yNCkiPjwvcGF0aD48cGF0aCBmaWxsPSIjNjRCNUY2IiBkPSJNMjAgN0ExMyAxMyAwIDEgMCAyMCAzM0ExMyAxMyAwIDEgMCAyMCA3WiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNCQkRFRkIiIGQ9Ik0yNi45LDE0LjJjLTEuNy0yLTQuMi0zLjItNi45LTMuMnMtNS4yLDEuMi02LjksMy4yYy0wLjQsMC40LTAuMywxLjEsMC4xLDEuNGMwLjQsMC40LDEuMSwwLjMsMS40LTAuMUMxNiwxMy45LDE3LjksMTMsMjAsMTNzNCwwLjksNS40LDIuNWMwLjIsMC4yLDAuNSwwLjQsMC44LDAuNGMwLjIsMCwwLjUtMC4xLDAuNi0wLjJDMjcuMiwxNS4zLDI3LjIsMTQuNiwyNi45LDE0LjJ6Ij48L3BhdGg+PC9zdmc+')
      50% 50% no-repeat;
    background-size: 100%;
    position: absolute;
    left: 10px;
    top: 5px;
    transition: all 0.3s;
    transform: ${(props) =>
      props.status ? 'translateX(-10px) scale(0.75)' : ''};
    opacity: ${(props) => (props.status ? '0' : '')};
  }
`;

export default function SearchBox() {
  const [inputState, setInputState] = useState();

  return (
    <FormWithIcon status={inputState}>
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
