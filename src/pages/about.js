import styles from '@/styles/Home.module.css'
import {useState} from 'react';
import useNetwork from '@/data/network';

export default function About() {
  const { network, isLoading, isError } = useNetwork()
 
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className={styles.detailcard}>
      <h1 className={styles.kilometer}>About {network.name}</h1>
      <p></p>
    </div>
  )
}
