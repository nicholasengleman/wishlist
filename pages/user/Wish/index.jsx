import React from 'react';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import { toggleWishModal } from 'redux/actions/modals';
import Card from 'components/Card';
import Box from 'components/Box';
import { Column, Row } from 'components/Flex';
import Donors from 'pages/user/Donors';
import CloudinaryImage from 'components/CloudinaryImage';
import ProgressBar from '../ProgressBar';

const StyledWish = Styled(Card)`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  min-height: 250px;
  background: white;
    .fa-edit {
    position: absolute;
    top: -35px;
    right: 0;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
        color: red;
        transform: scale(1.25);
        }
    }

    img {
      width: 100%;
    }
  }
`;

const Price = Styled.span`
  font-size: 10px;
  padding: 5px 10px;
  background-color: #023047;
  color: white;
  border-radius: 5px;
`;

const Store = Styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #D587A0;
`;

const WishTitle = Styled.div`
  font-size: 22px;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #023047;
`;

const Description = Styled.span`
  font-size: 12px;
  color: #331832;
`;

const MoneyDonated = Styled.div`
  display: flex;
  flex-direction: column;

  .so-far {
    font-size: 20px;
    color: #331832;
    font-weight: 600;
  }

  .total {
    font-size: 12px;
    color: orange;
    font-weight: 600;
  }

  .percentage {
    font-size: 10px;
    color: orange;
  }
`;

const DonateAction = Styled.div`
  box-shadow: 0px -2px 4px 0px rgb(0 0 0 / 25%);
  border-radius: 20px;
`;

const GiveButton = Styled.button`
  width: 100%;
  height: 50px;
  background: #FF0303;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  letter-spacing: 1.5px;
  cursor: pointer;

   i {
     font-size: 18px;
     margin-left: 10px;
     display: inline-block;
     color: orange;
   }
`;

const Wish = ({ wish, wishId, catId }) => {
  const dispatch = useDispatch();

  return (
    <StyledWish>
      <i
        aria-hidden
        className="far fa-edit"
        onClick={() =>
          dispatch(toggleWishModal({ mode: 'edit', catId, wishId }))
        }
      />
      <CloudinaryImage id={wish.image} />
      <Box padding="10px 15px">
        <WishTitle>{wish.name}</WishTitle>
        <Row alignItems="center" marginSize="1">
          <Price>${wish.price}</Price>
          <Store>{wish.store}</Store>
        </Row>
        <Row marginSize="1">
          <Description>{wish.description}</Description>
        </Row>

        <DonateAction>
          <Column padding="15px 20px 10px 20px">
            <MoneyDonated>
              <Row margin="0" justifyContent="space-between">
                <div className="col">
                  <span className="so-far">$35</span>
                  <span className="total"> out of $59</span>
                </div>
                <div className="col percentage">77%</div>
              </Row>
              <ProgressBar />
            </MoneyDonated>
            <Donors max={5} />
          </Column>
          <GiveButton>
            Give
            <i class="fa-solid fa-hand-holding-heart"></i>
          </GiveButton>
        </DonateAction>
      </Box>
    </StyledWish>
  );
};

export default Wish;
