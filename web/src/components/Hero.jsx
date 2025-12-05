import React from 'react'
import styles from './Hero.module.css'

const Hero = ({ src, alt, width = '100%', height }) => {
  return (
    <div className={styles.container}>
      <svg
        className={styles.topSvg}
        width="100%"
        viewBox="0 0 4323 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="hidden"
      >
        <path
          d="M4323 100.909C4091.5 149.475 3848.5 63.0061 3412 47.3859C2750.36 23.7092 2638.5 209.134 2124.5 245.953C1683.02 277.578 1127.5 114.203 721 90.6202C314.504 67.0372 0 121.582 0 121.582V5.78165e-06H4323C4323 5.78165e-06 4323 222.431 4323 100.909Z"
          fill="#FCF8F3"
        />
      </svg>
      <img 
        src={src}
        alt={alt || ''}
        className={styles.heroImage}
        style={height ? { height } : {}}
      />
      <svg
        className={styles.bottomSvg}
        xmlns="http://www.w3.org/2000/svg"
        width="4323"
        height="302"
        fill="none"
        viewBox="0 0 4323 302"
      >
        <path
          fill="#FCF8F3"
          d="M-46 52c40.5 34.5 306.5-30.521 1013 59C2052 235.336 1871.01-22.204 2460.01 2.1c444.73 18.35 723.5 105.934 1130 148.208s733.5 12.931 733.5 12.931V301.5H.513S-46 215-46 52z"
        />
      </svg>
    </div>
  )
}

export default Hero
