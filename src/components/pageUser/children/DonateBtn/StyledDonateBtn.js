import styled from 'styled-components';
import { lighten } from 'polished';

export default styled.a`
  display: inline-block;
  position: relative;
  text-decoration: none;
  height: 35px;
  width: 100%;
  background: #00684d;
  text-transform: uppercase;
  background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    linear-gradient(
      to right,
      ${lighten(0.15, '#00684d')} 0%,
      #00684d 50%,
      ${lighten(0.15, '#00684d')} 100%
    );
  background-position: 0 0;
  background-size: 200% 100%;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  text-shadow: 1px 1px 5px #666;
  transition: all 800ms;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-position: -100% 0;
  }
`;
