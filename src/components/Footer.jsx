import React from 'react';
import Wrapper from './Wrapper';
import GitHubLogo from '../assets/footer/github-logo.svg';

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <Wrapper className="footer">
        <div className="footer__author">
          <p>This project was made by:</p>
          <a href="https://github.com/Wolfushima">
            <img src={GitHubLogo} alt="Github" />
            <span>Adolfo Herrera</span>
          </a>
        </div>
        <div className="footer__disclaimer">
          <p>
            This web application is a learning project created for educational
            purposes. The images used from &quot;Where&apos;s Waldo?&quot; are
            used solely for the purpose of showcasing my skills in developing a
            photo tagging game. All rights for the images belong to their
            respective owners. This app is not intended for commercial use or
            wider distribution.
          </p>
        </div>
      </Wrapper>
    </footer>
  );
}
