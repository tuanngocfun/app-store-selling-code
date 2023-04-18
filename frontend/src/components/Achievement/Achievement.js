import React from 'react';
import './achieve.scss';
import { TbMedal2 } from 'react-icons/tb';
function Achievement() {
  return (
    <div className="achievement-container">
      <TbMedal2 className="icon"></TbMedal2>
      <label className="header">Achievement</label>
      <div className="achieve-details-container">
        <div className="spacer"></div>
        <div className="numbers-container">
          <div className="sub-stat">
            <div className="number">Level 1</div>
            <div className="bar">
              <div className="bar-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievement;
