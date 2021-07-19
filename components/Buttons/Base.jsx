import Styled from 'styled-components';

export const Base = Styled.button`
  font-size: ${({ small }) => (small === true ? '0.75rem' : '1rem')};
  border: none;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${({ position }) => position || 'relative'};
  left: ${({ left }) => left || ''};
  right: ${({ right }) => right || ''};
  top: ${({ top }) => top || ''};
  bottom: ${({ bottom }) => bottom || ''};
  padding: ${({ small }) => (small === true ? '0.5rem 3rem' : '0.5rem 4rem')};
  width: max-content;
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  margin-left: ${({ center }) => (center ? 'auto' : '')};
  margin-right: ${({ center }) => (center ? 'auto' : '')};
`;
