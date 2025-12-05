import React from 'react'
import Header from './header-new'
import styles from './layout.module.css'

const Layout = ({
  children,
  companyInfo,
  locale,
  pages = [],
}) => (
  <>
    <Header
      locale={locale}
      pages={pages}
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
        <ul className={styles.socialMediaList}>
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
        </ul>
      </div>
    </footer>
  </>
)

export default Layout
