import React from 'react';
import './wallet.scss';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { AiFillCreditCard } from 'react-icons/ai';
function Wallet() {
  return (
    <div className="wallet-card">
      <AiFillCreditCard className="icon"></AiFillCreditCard>
      <label className="header">Wallet</label>
      <div className="stats-container">
        <div className="separator"></div>
        <div className="numbers-container">
          <div className="sub-stat">
            <div className="number">$0</div>
            <div className="title">Amount of Wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
