import { Link } from 'gatsby';
import React from 'react';
import Icon from './icons';
import { cn } from '../lib/helpers';

import styles from './header.module.css';
import { usePageData } from '../hooks/use-page-data';

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, locale }) => {
  const pages = usePageData();
  const linkLocale = locale === 'nb' || locale === 'nn' ? 'no' : locale;
  const isNorwegian = locale === 'nb' || locale === 'nn';
  const isEnglish = locale === 'en';
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.branding}>
          {isNorwegian && <Link to="/">{siteTitle}</Link>}
          {isEnglish && <Link to="/en">{siteTitle}</Link>}
        </h1>

        <button
          className={styles.toggleNavButton}
          onClick={showNav ? onHideNav : onShowNav}
        >
          <Icon symbol="hamburger" />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            {pages.map(({ node: { title, id, slug } }) => (
              <li key={id}>
                <Link to={`/${linkLocale}/${slug[locale].current}`}>
                  {title[locale]}
                </Link>
              </li>
            ))}
            {isNorwegian && (
              <li>
                <Link to="/no/turer">Turer</Link>
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
