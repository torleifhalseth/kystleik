import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'

import styles from './header.module.css'
import { usePageData } from '../hooks/use-page-data'

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, locale }) => {
  const pages = usePageData()
  console.log(pages)
  const linkLocale = locale === 'nb' || locale === 'nn' ? 'no' : locale
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.branding}>
          <Link to='/'>{siteTitle}</Link>
        </h1>

        <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
          <Icon symbol='hamburger' />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            {pages.map(({ node: { title, id, slug } }) => (
              <li key={id}>
                <Link to={`/${linkLocale}/${slug[locale].current}`}>{title[locale]}</Link>
              </li>
            ))}
            {locale === 'nb' && (
              <li>
                <Link to='/no/turer'>Turer</Link>
              </li>
            )}
            {locale === 'en' && (
              <li>
                <Link to='/en/tours'>Tours</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
