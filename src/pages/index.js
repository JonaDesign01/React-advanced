import styles from '@/styles/Home.module.css'
import {useState, useEffect} from 'react';
import useNetwork from '@/data/network';
import {getDistance} from '@/utils/getDistance';
import Link from 'next/link';
export default function Home() {
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState({});
  const { network, isLoading, isError } = useNetwork();
  // use effect gebruiken om bv iets op te roepen enkel bij opstart van de app
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
 
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

   const stations = network.stations.filter(station => station.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);

   // map stations to add disrance to current location
   stations.map(station => {
     station.distance = getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000;
   });

   // sort stations by distance
   stations.sort((a, b) => a.distance - b.distance);

   function handleFilterChange(e) {
     setFilter(e.target.value);
   }
  console.log(stations)
  return (
    <div>
      <div className={styles.inputwrap}>
      <input className={styles.input} type="text" value={filter} onChange={handleFilterChange}/>
      </div>
      {stations.map(station => 
          <Link href={`/stations/${station.id}`} className={styles.card} key={station.id}> 
            <span className={styles.name} >{station.name}</span>
            <span className={styles.kilometer} >{getDistance(location.latitude, location.longitude, station.latitude, station.longitude).distance/1000} <span className={styles.km}>km</span> </span>
            <span className={styles.free}>{station.free_bikes} / {station.empty_slots + station.free_bikes }</span>
          </Link>
        )}
    </div>
  )
}