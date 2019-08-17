import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import range from "ramda/src/range";

export const Pagination = ({ getSongs }) => {
  const max = 5;
  const min = 1;
  const pages = range(min, max);
  const [activeStart, updateActive] = useState(1);

  return (
    <div className="pagination-container">
      <div className="inner-container">
        <div className="number-container">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={"2x"}
            color={"white"}
            onClick={() => {
              if (activeStart !== 1) {
                updateActive(activeStart - 1);
                getSongs();
              }
            }}
          />
        </div>
        {pages.map((page, index) => (
          <div
            key={index}
            className={`number-container ${
              activeStart === index + 1 ? "number-container--active" : ""
            }`}
            onClick={() => {
              updateActive(index + 1);
              getSongs();
            }}
          >
            {page}
          </div>
        ))}
        <div className="number-container">
          <FontAwesomeIcon
            icon={faArrowRight}
            size={"2x"}
            color={"white"}
            onClick={() => {
              if (activeStart !== 4) {
                updateActive(activeStart + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
