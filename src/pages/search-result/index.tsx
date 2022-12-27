import { useCallback, useEffect } from 'react';
import TopBar from '../../components/TopBar';
import SearchInput from '../../components/searchInput';
import ItemLoader from '../../components/ItemLoader';
import styles from './index.module.scss';
import TrendItem from '../../components/TrendItem';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { updateKey, getTrends } from '../../redux/search';

const Result = ()=>{
  const params = useParams();
  const dispatch = useAppDispatch()
  const keyword = useAppSelector((state) => state.search.keyword);
  const loading = useAppSelector((state) => state.search.loading);
  const trends = useAppSelector((state) => state.search.trends);

  const onSearch = useCallback((key:string)=>{
    if(loading) return;
    if(!key) return;

    dispatch(getTrends(key));
  },[])

  useEffect(() => {
    if(params.keyword){
      const keyFromUrl = params.keyword && params.keyword.split('+').join(' ')
      dispatch(updateKey(keyFromUrl));
      onSearch(keyFromUrl)
    }
  },[params.keyword])

  return <div className={styles.container}>
    <TopBar >
      <SearchInput onSearch={()=> onSearch(keyword)} />
    </TopBar>
    <div className={styles.body}>
      <div>
        <div className={styles.title}>Related product trends</div>
        <div className={styles.list}>
          {
            loading && [1,2,3,4].map((item)=> <ItemLoader key={item}/>)
          }
          {
            !loading && trends.map((item,index)=> <TrendItem key={index} data={item}/>)
          }
        </div>
      </div>
    </div>
  </div>
}

export default Result;