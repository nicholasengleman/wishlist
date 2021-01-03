import React from 'react';
import styled from 'styled-components';
import { Row } from '../../../common/Flex';

const StyledCategory = styled.div`
  margin-bottom: 50px;
`;

const Header = styled.div`
  margin-bottom: 15px;
`;

const CategoryName = styled.div`
  font-size: 30px;
  margin-left: 10px;
`;

const Tags = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const Category = ({ children, category /* catIndex */ }) => (
  <StyledCategory key={`${Math.random()}`}>
    <Header>
      <Row alignItems="center">
        <i
          className="far fa-edit"
          // onClick={() =>
          //   setCatModalVisibility({
          //     mode: 'edit',
          //     catIndex,
          //   })
          // }
        />
        <CategoryName>{category.name}</CategoryName>
      </Row>
      <Row>
        <Tags>
          {/* <div className='tags'>{category.tags.map((tag) => tag)}</div> */}
        </Tags>
      </Row>
    </Header>
    {children}
  </StyledCategory>
);

export default Category;
