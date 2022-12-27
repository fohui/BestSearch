
import { Routes, Route } from "react-router-dom"
import Home from '../pages/home/';
import Result from '../pages/search-result/'
import styles from './index.module.scss';
import { configResponsive } from 'ahooks';

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});

function App() {
  return (
    <div className={styles.container}>
       <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Result />}>
            <Route path=":keyword" element={<Result />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
