import { Link } from 'gatsby';
import React from 'react';
import logo from 'images/logo.svg';
import styled from 'styled-components';
import Icon from './icons';
import { cn } from '../lib/helpers';
import styles from './header.module.css';
import { usePageData } from '../hooks/use-page-data';

const Logo = styled.div`
  flex: 1;
`;

const LogoImg = styled.img`
  width: 100px;
`;

const Heading = styled.h1`
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

const getMenuButtonText = (isNorwegian, showNav) => {
  if (isNorwegian) {
    if (showNav) {
      return 'Skjul meny';
    }
    return 'Hvis meny';
  }
  if (showNav) {
    return 'Hide menu';
  }
  return 'Show menu';
};

const Header = ({
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  locale = 'nb',
}) => {
  const pages = usePageData();
  const linkLocale = locale === 'nb' || locale === 'nn' ? 'no' : locale;
  const isNorwegian = locale === 'nb' || locale === 'nn';
  const isEnglish = locale === 'en';
  const to = isNorwegian ? '/' : '/en';
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Heading>{siteTitle}</Heading>
        <Logo>
          <Link to={to}>
            <LogoImg alt={`${siteTitle} logo`} src={logo} />
          </Link>
        </Logo>
        <button
          className={styles.toggleNavButton}
          onClick={showNav ? onHideNav : onShowNav}
          aria-label={getMenuButtonText(isNorwegian, showNav)}
        >
          <Icon symbol="hamburger" />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            {pages.map(({ node: { title, id, slug } }) => {
              return (
                <li key={id}>
                  <Link to={`/${linkLocale}/${slug[locale].current}`}>
                    {title[locale]}
                  </Link>
                </li>
              );
            })}
            {isNorwegian && (
              <li>
                <Link to="/no/turer">Turar</Link>
              </li>
            )}
            {isEnglish && (
              <li>
                <Link to="/en/tours">Tours</Link>
              </li>
            )}
            {isNorwegian && (
              <li>
                <Link to="/en">English</Link>
              </li>
            )}
            {isEnglish && (
              <li>
                <Link to="/">Norwegian</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
