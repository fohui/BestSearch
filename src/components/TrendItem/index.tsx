import { FunctionComponent, PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import styles from './index.module.scss';
import { useResponsive } from 'ahooks';

interface IProps {
  data: ITrendItem
}
interface ITrendItem {
  growth:  number;
  name: string;
  search_msv: { date:string; sv:number }[]
}

const getChartSize = (responsive:Record<string, boolean>)=>{
  const chartSize = {
    small: {width: 400, height: 320},
    middle: {width: 300, height: 240},
    large: {width: 200, height: 160}
  }

  if(responsive.large){
    return chartSize.large
  }else if(responsive.middle){
    return chartSize.middle
  }else {
    return chartSize.small
  }
}
const dateFilter = (date: string| undefined):string => {
  if(!date) return '';

  const [year, month] = date.split('-');
  const monthMap = ['','Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
  return `${monthMap[+month]} ${year}`
}
const TrendItem:FunctionComponent<PropsWithChildren<IProps>> = (props)=>{
  const containerEl = useRef(null); 
  const chartRef = useRef<Chart | null>(null);
  const data = props.data;
  const responsive = useResponsive();

  useEffect(()=>{
    if(!containerEl.current) return;
    if(!data.search_msv) return;
    if(chartRef.current) return;
    const chartSize = getChartSize(responsive);

    chartRef.current = new Chart({
      container: containerEl.current,
      height: chartSize.height,
      width: chartSize.width
    });

    chartRef.current.data(data.search_msv)
    chartRef.current.scale('sv', {
      nice: true,
    });
    chartRef.current.axis('date', false);
    chartRef.current.axis('sv', false);
    chartRef.current.line().position('date*sv');
    chartRef.current.area().position('date*sv');
    chartRef.current.render();
  },[containerEl, data])


  useEffect(()=>{
    if(chartRef.current){
      chartRef.current.data(data.search_msv); // 更新数据源
      chartRef.current.render(); // 更新图表
    }
  },[data])

  useEffect(()=>{
    if(chartRef.current){
      const chartSize = getChartSize(responsive);
      chartRef.current.changeSize(chartSize.width, chartSize.height)
    }
  },[responsive])
  

  const dateStart = data?.search_msv?.[0]?.date;
  const dateEnd = data?.search_msv?.at(-1)?.date;
  return (
    <div className={styles.container}>
      <div className={styles.desc}>
        <p>{data.name}</p>
        <p>Growth {data.growth}%</p>
      </div>
      <div ref={containerEl}></div>
      <div className={styles.date}>{dateFilter(dateStart)} - {dateFilter(dateEnd)}</div>
    </div>
  )
}

export default TrendItem;