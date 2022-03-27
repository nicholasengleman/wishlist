import React from 'react';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import { toggleWishModal } from 'redux/actions/modals';
import Card from 'components/Card';
import Box from 'components/Box';
import { Row } from 'components/Flex';
import Donors from 'pages/user/Donors';
import DonationBar from 'pages/user/DonateBtn';
import Donations from 'pages/user/Donations';
import CloudinaryImage from 'components/CloudinaryImage';

const StyledWish = Styled(Card)`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
    .fa-edit {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
        color: red;
        transform: scale(1.25);
        }
    }
  }
`;

const Price = Styled.span`
  font-size: 22px;
  padding: 7px;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
    margin-right: 10px;
`;

const Store = Styled.span`
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const WishTitle = Styled.div`
  font-size: 25px;
  margin-bottom: 1rem;
`;

const Wish = ({ wish, wishId, catId }) => {
  const dispatch = useDispatch();

  return (
    <StyledWish>
      <i
        className="far fa-edit"
        onClick={() =>
          dispatch(toggleWishModal({ mode: 'edit', catId, wishId }))
        }
      />
      <CloudinaryImage id={wish.image} />
      <Box padding="10px 15px">
        <WishTitle>{wish.name}</WishTitle>
        <Row alignItems="center" marginSize="1">
          <Price>{wish.price}</Price>
          <Store>at {wish.store}</Store>
        </Row>
        <Row marginSize="1">{wish.description}</Row>
        <Row marginSize="1">
          <Donors max={5} />
        </Row>
        <Row marginSize="1">
          <Donations />
        </Row>
        <Row marginSize="1">
          <DonationBar />
        </Row>
      </Box>
    </StyledWish>
  );
};

export default Wish;
