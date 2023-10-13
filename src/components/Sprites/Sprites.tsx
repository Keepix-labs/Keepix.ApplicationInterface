"use client";

import styles from "./styles.module.scss"

const Sprites = () => {
  const primary = styles.fillPrimary
  const secondary = styles.fillSecondary

  return (
    <svg className={styles.sprite} xmlns="https://vecta.io/nano">
      <defs>
        <g id="cube-a">
          <path d="M167 8.4L10.3 99.5l156.5 90.8 156.1-90.8"/>
          <path d="M10.3 99.5v179.9L166.6 370l.2-179.7"/>
          <path className={secondary} d="M322.9 99.5v179.9L166.6 370l.2-179.7"/>
        </g>
        <g id="cube-a-secondary">
          <path d="M167 8.4L10.3 99.5l156.5 90.8 156.1-90.8"/>
          <path className={secondary} d="M10.3 99.5v179.9L166.6 370l.2-179.7"/>
          <path className={secondary} d="M322.9 99.5v179.9L166.6 370l.2-179.7"/>
        </g>
        <g id="cube-b">
          <path className={secondary} d="M167 8.4L10.3 99.5l156.5 90.8 156.1-90.8"/>
          <path className={secondary} d="M10.3 99.5v179.9L166.6 370l.2-179.7"/>
          <path className={primary} d="M322.9 99.5v179.9L166.6 370l.2-179.7"/>
        </g>
        <g id="cube-b-secondary">
          <path className={secondary} d="M167 8.4L10.3 99.5l156.5 90.8 156.1-90.8"/>
          <path className={primary} d="M10.3 99.5v179.9L166.6 370l.2-179.7"/>
          <path className={primary} d="M322.9 99.5v179.9L166.6 370l.2-179.7"/>
        </g>
        <g id="logo-txt">
          <path className={styles.noStroke} d="M52.1 25.2L35.2 49.7h-15V25.2H.5v65.9h19.7V67.3h15.2l16.4 23.8h23.3L51.4 57l24.1-31.8zm81.6 2.4c-5.4-2.5-11.7-3.7-18.9-3.7-7.3 0-13.7 1.4-19.1 4.2-5.5 2.8-9.8 6.8-12.8 11.9-3.1 5.1-4.6 11.2-4.6 18.2 0 7.7 1.5 14.1 4.6 19.2s7.4 8.9 13 11.3c5.6 2.5 12.1 3.7 19.3 3.7 7 0 13.1-1 18.3-3.1s9.3-4.9 12.2-8.6 4.3-7.9 4.3-12.6v-1.4h-19.7V68c0 2.8-1.2 5-3.6 6.4-2.4 1.5-6.4 2.2-12.2 2.2-6.8 0-11.4-1.3-14.1-3.9-2.4-2.3-3.6-5.8-3.9-10.6h53.6c.2-1.1.3-2.2.4-3.2s.1-2 .1-3.2c0-6.8-1.5-12.6-4.5-17.4-2.9-4.7-7.1-8.3-12.4-10.7zm-37 24.2c.5-3.8 1.7-6.6 3.7-8.6 2.6-2.6 7.3-3.9 13.9-3.9 6.1 0 10.6 1.1 13.3 3.3 2.4 2 3.8 5 4 9.2H96.7zm115.9-24.2c-5.4-2.5-11.7-3.7-18.9-3.7-7.3 0-13.7 1.4-19.1 4.2-5.5 2.8-9.8 6.8-12.8 11.9-3.1 5.1-4.6 11.2-4.6 18.2 0 7.7 1.5 14.1 4.6 19.2s7.4 8.9 13 11.3c5.6 2.5 12.1 3.7 19.3 3.7 7 0 13.1-1 18.3-3.1s9.3-4.9 12.2-8.6 4.3-7.9 4.3-12.6v-1.4h-19.7V68c0 2.8-1.2 5-3.6 6.4-2.4 1.5-6.4 2.2-12.2 2.2-6.8 0-11.4-1.3-14.1-3.9-2.4-2.3-3.6-5.8-3.9-10.6H229c.2-1.1.3-2.2.4-3.2s.1-2 .1-3.2c0-6.8-1.5-12.6-4.5-17.4-2.9-4.7-7.1-8.3-12.4-10.7zm-37 24.2c.5-3.8 1.7-6.6 3.7-8.6 2.6-2.6 7.3-3.9 13.9-3.9 6.1 0 10.6 1.1 13.3 3.3 2.4 2 3.8 5 4 9.2h-34.9zM301 28.1c-4.7-2.8-10.4-4.2-17.2-4.2-7.7 0-13.7 1.6-18.1 4.9-4.3 3.3-7.1 8.1-8.2 14.4h-1.3v-18H238v88.2l19.7-40.1h.9c1.1 5.8 3.8 10.4 8.1 13.9s10.2 5.2 17.8 5.2c6.6 0 12.2-1.4 16.8-4.2s8.1-6.8 10.5-11.9 3.6-11.2 3.6-18.1c0-7-1.2-13.1-3.7-18.2-2.4-5.1-6-9.1-10.7-11.9zm-7.5 39.6c-1.3 2.4-3.3 4.1-6 5.1-2.7 1.1-6.2 1.6-10.5 1.6-4.1 0-7.6-.5-10.5-1.4-2.8-1-5-2.6-6.5-4.9s-2.2-5.3-2.2-8.9v-1.1c0-5.9 1.6-10 4.9-12.4 3.2-2.4 8.1-3.6 14.5-3.6 4.2 0 7.7.5 10.4 1.5s4.7 2.7 6 5 2 5.5 2 9.7c-.1 3.8-.8 7-2.1 9.4zm30.1-42.5h19.7v65.9h-19.7zM405 57.4l26.3-32.2h-23.8l-17 22.2h-1L372 25.2h-24.1l26.3 32.6v1.1l-26.3 32.2h23.8l17-22.1h1l17.5 22.1h24.1L405 58.6z"/>
        </g>
      </defs>
    </svg>
  )
}

export default Sprites