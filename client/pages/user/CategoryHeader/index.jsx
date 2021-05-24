import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleCategoryModal, toggleWishModal } from 'redux/actions/modals';
import { Row } from 'components/Flex';
import { EditButton } from 'components/Buttons/EditButton';

const StyledCategory = styled.div`
  margin-bottom: 1rem;
`;

const CategoryName = styled.div`
  font-size: 2rem;
  margin-right: 10px;
  color: #5d33a1;
  font-weight: 600;
`;

const CategoryHeader = ({ category, catIndex }) => {
  const dispatch = useDispatch();

  return (
    <StyledCategory key={`${Math.random()}`}>
      <Row alignItems="center" marginSize={1}>
        <CategoryName>{category.name}</CategoryName>
        <i
          className="far fa-edit"
          onClick={() =>
            dispatch(toggleCategoryModal({ mode: 'edit', catIndex }))
          }
        />
      </Row>
      <Row>
        <EditButton
          onClick={() =>
            dispatch(
              toggleWishModal({
                mode: 'add',
                catIndex,
                wishIndex: category.wishes.length,
              }),
            )
          }
        >
          Add Wish
        </EditButton>
      </Row>
    </StyledCategory>
  );
};

export default CategoryHeader;
