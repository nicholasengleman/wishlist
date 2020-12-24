import React from 'react';
import Styled from 'styled-components';
import Card from '../../../common/Card';
import Image from '../../../common/Image';
import Box from '../../../common/Box';
import Donors from '../Donors';
import DonationBar from '../DonateBtn';
import { Row, Column } from '../../../common/Flex';
import Donations from '../Donations';

const StyledWish = Styled(Card)`
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

const Wish = ({ wish, className }) => (
  <StyledWish className={className}>
    <i
      className="far fa-edit"
      //   onClick={() =>
      //     setWishModalVisibility({
      //       mode: 'edit',
      //       catIndex,
      //       wishIndex,
      //     })
      // }
    />
    <Column>
      <Image imageUrl={wish.image} type="product" />
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
    </Column>
  </StyledWish>
);

export default Wish;
