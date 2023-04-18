import './trustpanel.scss';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';

import mascot from '../../images/logo/mascot-green.png';
function TrustPanel() {
  return (
    <div className="trust-panel-container">
      <div className="trust-panel-content-container">
        <div className="feature">
          <AiOutlineCloudDownload className="icon"></AiOutlineCloudDownload>
          <div className="content">
            <h1>Super fast</h1>
            <span>Instant digital download</span>
          </div>
        </div>
        <div className="space"></div>
        <div className="feature">
          <BsShieldCheck className="icon"></BsShieldCheck>
          <div className="content">
            <h1>Reliable & safe</h1>
            <span>Over 10,000 games</span>
          </div>
        </div>
        <div className="space"></div>
        <div className="feature">
          <BiSupport className="icon"></BiSupport>
          <div className="content">
            <h1>Customer Support</h1>
            <span>Customer support 24/7</span>
          </div>
        </div>
        <div className="space"></div>
        <div className="feature">
          <div className="icon-logo">
            <img src={mascot} alt=""></img>
          </div>
          <div className="content">
            <h1>About us</h1>
            <span>Read more</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustPanel;
