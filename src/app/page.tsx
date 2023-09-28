import Image from 'next/image'
import styles from './page.module.scss'
import localFont from 'next/font/local'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function Home() {
  return (
    <main className={styles.main}>
      <Sidebar/>
    </main>
  )
}
