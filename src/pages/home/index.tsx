import styles from './index.module.scss'
import TopBar from '../../components/TopBar';
import SearchInput from '../../components/searchInput';

const Home = ()=>{
  return (
    <div>
      <TopBar />
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>
            Search Trends
          </div>
          <SearchInput />
        </div>
      </div>
    </div>
  )
}

export default Home;