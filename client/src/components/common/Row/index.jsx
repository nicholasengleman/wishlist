import styled from 'styled-components';

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const RowFlexEnd = styled(Row)`
  justify-content: flex-end;
`;

export const RowFlexStart = styled(Row)`
  justify-content: flex-start;
`;

export default Row;
