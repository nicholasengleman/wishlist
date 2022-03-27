import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useGetUser from 'hooks/useGetUser';
import { Column } from 'components/Flex';
import { setSelectedSection } from 'redux/actions/sections';
import { toggleCategoryModal } from 'redux/actions/modals';
import StyledSectionList from './styles';

const SectionList = () => {
  const dispatch = useDispatch();
  const { selectedSection } = useSelector((state) => state.sections);
  const wishData = useGetUser('wishData');
  console.log(wishData);

  return (
    <StyledSectionList>
      <h3>Wishlists</h3>
      <Column>
        {wishData.map((section, i) => (
          <button
            key={i}
            className={`section-btn ${
              selectedSection === section.id ? 'selected' : ''
            }`}
            onClick={() => dispatch(setSelectedSection(section.id))}
          >
            <span className="name">{section.name}</span>
            <span className="goal-number">{section.wishes.length}</span>
            <i
              className="far fa-edit"
              onClick={() =>
                dispatch(
                  toggleCategoryModal({ mode: 'edit', catId: section.id }),
                )
              }
            ></i>
          </button>
        ))}
        <button
          className="btn-add"
          onClick={() => dispatch(toggleCategoryModal({ mode: 'add' }))}
        >
          ADD+
        </button>
      </Column>
    </StyledSectionList>
  );
};

export default SectionList;
