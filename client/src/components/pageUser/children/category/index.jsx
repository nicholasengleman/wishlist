import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleCategoryModal } from '../../../../redux/actions/modals';
import { Row } from '../../../common/Flex';

const StyledCategory = styled.div`
  margin-bottom: 50px;
`;

const Header = styled.div`
  margin: 25px 0;
`;

const CategoryName = styled.div`
  font-size: 2rem;
  margin-right: 10px;
  color: #5d33a1;
  font-weight: 600;
`;

const Tags = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const Category = ({ children, category, catIndex }) => {
  const dispatch = useDispatch();

  return (
    <StyledCategory key={`${Math.random()}`}>
      <Header>
        <Row alignItems="center">
          <CategoryName>{category.name}</CategoryName>
          <i
            className="far fa-edit"
            onClick={() =>
              dispatch(toggleCategoryModal({ mode: 'edit', catIndex }))
            }
          />
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
};

export default Category;
