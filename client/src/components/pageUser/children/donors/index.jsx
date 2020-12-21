import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StyledDonors from './donateStyles';

const Donors = ({ max }) => {
  const [subThumbnails, setSubThumbnails] = useState([]);
  const subsTotal = Math.floor(Math.random() * (99 - 6 + 1)) + 6;

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=10')
      .then((response) => {
        if (response.data.results) {
          response.data.results.forEach((sub) => {
            subThumbnails.push(sub.picture.thumbnail);
          });
          setSubThumbnails(subThumbnails);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <StyledDonors>
      {subThumbnails.map((sub, i) => {
        if (i < subThumbnails.length - 1 && i < max) {
          return (
            <div key={sub} className="subThumbnail">
              <img src={sub} alt="" />
            </div>
          );
        }
        return null;
      })}

      <div className="subThumbnail">
        <img
          className="tint"
          src={subThumbnails[subThumbnails.length - 1]}
          alt=""
        />
        <div className="subsRemaining">+{subsTotal - 5}</div>
      </div>
    </StyledDonors>
  );
};

export default Donors;
