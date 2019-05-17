import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from './messages';
import footer from '../../assets/image/footer.jpg';
import { Icon } from 'semantic-ui-react'

const Footer = () => (
  <div className="footer">
    <div className="menu d-flex">
      <div className="menu-list">
        <Link to="/disclaimer"> Disclaimer</Link>
      </div>
      <div className="menu-list">
        <Link to="/terms-condition"> Terms of use</Link>
      </div>
      <div className="menu-list">
        <Link to="/faqs"> FAQs</Link>
      </div>
      {/* <div className="menu-list">
                                      <a href="">NewsLetter</a>
                                    </div> */}
    </div>
    {/* <div className="icon-menu d-flex">
                                <div className="icon-holder">
                                  <a href="">m</a>
                                </div>
                                <div className="icon-holder">
                                  <a href="">t</a>
                                </div>
                                <div className="icon-holder">
                                  <a href="">f</a>
                                </div>
                                <div className="icon-holder">
                                  <a href="">t</a>
                                </div>
                                <div className="icon-holder">
                                  <a href="">n</a>
                                </div>
                              </div> */}
    {/*<div className="img-holder text-center pt-2">*/}
      {/**/}
      {/*<img className="mwidth100" src={footer} />*/}
    {/*</div>*/}
    <div className="icon-list d-flex">
      <div className="icon-holder">
        <a href="https://medium.com/@xcelpay2018" target="_blank"><Icon  name='medium m' /></a>
      </div>
      <div className="icon-holder">
        <a href="https://www.instagram.com/stories/xceltrip/?hl=en" target="_blank"><Icon  name='instagram' /></a>
      </div>
      <div className="icon-holder">
        <a href="https://www.facebook.com/xcelpay" target="_blank"><Icon  name='facebook f' /></a>
    </div>
      <div className="icon-holder">
        <a href="https://twitter.com/xcelpayofficial" target="_blank"><Icon  name='twitter' /></a>
    </div>
      <div className="icon-holder">
        <a href="https://www.linkedin.com/in/xcel-pay-1b6228172/" target="_blank"><Icon name='linkedin' /></a>
    </div>




    </div>
    <p className="small text-center"> &copy; 2018 XcelPay </p>
  </div>
);

export default Footer;
