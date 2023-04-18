import './footer.scss';
import { Link } from 'react-router-dom';
import rock from '../../images/bedaco.png';
import logoHorizontal from '../../images/logo/horizontal-green.png';

import { ImFacebook2 } from 'react-icons/im';
import { BsYoutube } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { BsTwitch } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { FaGlobe } from 'react-icons/fa';
import Loading from '../Loading/Loading';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-child-container">
        <div className="footer-top">
          <div className="footer-top-left">
            <img src={rock} alt=""></img>
          </div>
          <div className="footer-top-right">
            <div className="footer-top-upper">
              <h1>
                GET THE BEST GAMING EXPERIENCE AT <span>RISEN.</span> NOW!
              </h1>
              <div className="links-container">
                <Link to="/terms-of-use">Terms of Use</Link>
                <Link>Privacy Policy</Link>
                <Link>Contact Us</Link>
                <Link>FAQ</Link>
              </div>
            </div>
            <div className="footer-top-lower">
              <div className="social-container">
                <Link>
                  <ImFacebook2
                    className="social-icon"
                    id="facebook"
                  ></ImFacebook2>
                </Link>
                <Link>
                  <BsYoutube className="social-icon" id="youtube"></BsYoutube>
                </Link>
                <Link>
                  <FaDiscord className="social-icon" id="discord"></FaDiscord>
                </Link>
                <Link>
                  <BsTwitch className="social-icon" id="twitch"></BsTwitch>
                </Link>
                <Link>
                  <BsTwitter className="social-icon" id="twitter"></BsTwitter>
                </Link>
              </div>
              <div className="logo-container">
                <img src={logoHorizontal} alt=""></img>
              </div>
            </div>
          </div>
        </div>

        <div className="space"></div>

        <div className="footer-bottom">
          <div className="footer-content-container">
            <h1>Copyright © 2023 Risen Gaming - All rights reserved</h1>
            <div className="region-container">
              <FaGlobe className="globe"></FaGlobe>
              <h1>English</h1>
              <div className="small-space"></div>
              <h1>ENG</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
