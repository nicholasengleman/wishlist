import React from 'react';
import { useDispatch } from 'react-redux';

import useGetUser from 'hooks/useGetUser';
import { Column } from 'components/Flex';
import { setSelectedSection } from 'redux/actions/sections';
import { toggleCategoryModal } from 'redux/actions/modals';
import StyledSectionList from './styles';

const SectionList = () => {
  const dispatch = useDispatch();
  const wishData = useGetUser('wishData');

  return (
    <StyledSectionList>
      <h3>Goal List</h3>
      <Column>
        {wishData.map((section, i) => (
          <button
            key={i}
            className="section-btn"
            onClick={() => dispatch(setSelectedSection(section.id))}
          >
            <span className="name">{section.name}</span>
            <span className="goal-number">{section.wishes.length}</span>
            <i
              className="far fa-edit"
              onClick={() =>
                dispatch(toggleCategoryModal({ mode: 'edit', catID }))
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
