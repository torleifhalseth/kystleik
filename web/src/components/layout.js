import React from 'react';
import styled from 'styled-components';
import Header from './header';
import '../styles/layout.css';
import styles from './layout.module.css';

const SocialMediaList = styled.ul`
  text-align: center;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
    margin-right: 20px;
  }
`;

const Layout = ({
  children,
  companyInfo,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  locale,
}) => (
  <>
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      locale={locale}
    />
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.companyAddress}>
          {companyInfo && (
            <div>
              {companyInfo.name}
              <br />
              {companyInfo.address1}
              <br />
              {companyInfo.address2 && (
                <span>
                  {companyInfo.address2}
                  <br />
                </span>
              )}
              {companyInfo.zipCode} {companyInfo.city}
              {companyInfo.country && <span>, {companyInfo.country}</span>}
            </div>
          )}
        </div>
        <SocialMediaList>
          <li>
            <a
              href="https://www.facebook.com/Kystleik"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/kystleik/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
        </SocialMediaList>
      </div>
    </footer>
  </>
);

export default Layout;
