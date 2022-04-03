import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleCategoryModal, toggleWishModal } from 'redux/actions/modals';
import { Row } from 'components/Flex';
import { EditButton } from 'components/Buttons/EditButton';

const CategoryName = styled.div`
  font-size: 2rem;
  margin-right: 10px;
  color: #5d33a1;
  font-weight: 600;
`;

const CategoryHeader = ({ category, catId }) => {
  const dispatch = useDispatch();

  return (
    <Row alignItems="center" justifyContent="space-between" marginSize={1}>
      <CategoryName>{category.name}</CategoryName>
      <EditButton
        onClick={() =>
          dispatch(
            toggleWishModal({
              mode: 'add',
              catId,
              wishIndex: category.wishes.length,
            }),
          )
        }
      >
        Add Wish
      </EditButton>
    </Row>
  );
};

export default CategoryHeader;
