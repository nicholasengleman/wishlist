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

  return (
    <StyledSectionList>
      {wishData.map((section, i) => (
        <div className="section" key={i}>
          <button
            className={`section-btn ${
              selectedSection === section.id ? 'selected' : ''
            }`}
            onClick={() => dispatch(setSelectedSection(section.id))}
          >
            {section.name}
            <span className="goal-number">{section.wishes.length}</span>
          </button>
          <i
            aria-hidden
            className="fa-solid fa-pencil"
            onClick={() =>
              dispatch(toggleCategoryModal({ mode: 'edit', catId: section.id }))
            }
          ></i>
        </div>
      ))}
      <button
        className="btn-add"
        onClick={() => dispatch(toggleCategoryModal({ mode: 'add' }))}
      >
        ADD
      </button>
    </StyledSectionList>
  );
};

export default SectionList;
