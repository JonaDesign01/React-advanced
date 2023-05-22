import styles from '@/styles/Home.module.css'
import useNetwork from '@/data/network';
import { useRouter } from 'next/router'
import StationImage from '@/components/StationImage';

export default function Home() {
  const { network, isLoading, isError } = useNetwork()
  const router = useRouter()
 
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const station = network.stations.find(station => station.id === router.query.stationId)

  return (
    <div className={styles.detailcard}>
      <h1 className={styles.kilometer} >{station.name}</h1>
      <div className={styles.detailinfo}>
       <p>Available bikes: {station.free_bikes}</p>
       <p>Empty slots: {station.empty_slots}</p>
       <StationImage station={station}/>
      </div>
    </div>
  )
}
