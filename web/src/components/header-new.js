'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import logo from '@/images/logo.svg'
import Icon from './icons'
import { cn } from '@/lib/helpers'
import styles from './header.module.css'

const getMenuButtonText = (isNorwegian, showNav) => {
  if (isNorwegian) {
    if (showNav) {
      return 'Skjul meny'
    }
    return 'Hvis meny'
  }
  if (showNav) {
    return 'Hide menu'
  }
  return 'Show menu'
}

const Header = ({
  locale = 'nb',
  pages = [],
}) => {
  const [showNav, setShowNav] = useState(false)
  
  const linkLocale = locale === 'nb' || locale === 'nn' ? 'no' : locale
  const isNorwegian = locale === 'nb' || locale === 'nn'
  const isEnglish = locale === 'en'
  const to = isNorwegian ? '/' : '/en/'
  
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.branding}>
          <Link href={to} className={styles.logo}>
            <img alt="Kystleik logo" src={logo.src} className={styles.logoImg} />
          </Link>
        </h1>
        <button
          className={styles.toggleNavButton}
          onClick={() => setShowNav(!showNav)}
          aria-label={getMenuButtonText(isNorwegian, showNav)}
        >
          <Icon symbol="hamburger" />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            {pages.map((page) => {
              return (
                <li key={page._id}>
                  <Link href={`/${linkLocale}/${page.slug[locale]?.current || ''}`}>
                    {page.title[locale]}
                  </Link>
                </li>
              )
            })}
            {isNorwegian && (
              <li>
                <Link href="/no/kurs-og-aktiviteter/">Kurs og aktiviteter</Link>
              </li>
            )}
            {isEnglish && (
              <li>
                <Link href="/en/courses-and-tours/">Courses and tours</Link>
              </li>
            )}
            {isNorwegian && (
              <li>
                <Link href="/en/">English</Link>
              </li>
            )}
            {isEnglish && (
              <li>
                <Link href="/">Norwegian</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
