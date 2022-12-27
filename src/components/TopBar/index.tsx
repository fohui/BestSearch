import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const TopBar:FunctionComponent<PropsWithChildren> = (props)=>{
  const { children } = props;
  const navigate = useNavigate();
  const jumpToHome = ()=>{
    navigate('/')
  }
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.homeLink} onClick={jumpToHome}>
          <span className={styles.blod}>Best</span>Search
        </div>
        {children}
      </div>
    </div>
  )
}

export default TopBar