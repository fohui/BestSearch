import { FunctionComponent, PropsWithChildren } from 'react';
import ContentLoader from "react-content-loader"
import { useResponsive } from 'ahooks';

const getLoaderSize = (responsive:Record<string, boolean>)=>{
  const loaderSize = {
    small: {width: 400, height: 420},
    middle: {width: 300, height: 340},
    large: {width: 200, height: 260}
  }

  if(responsive.large){
    return loaderSize.large
  }else if(responsive.middle){
    return loaderSize.middle
  }else {
    return loaderSize.small
  }
}
const ItemLoader:FunctionComponent<PropsWithChildren>  = (props) => {
  const responsive = useResponsive();
  const loaderSize = getLoaderSize(responsive);

  return (
    <ContentLoader 
      speed={2}
      width={loaderSize.width}
      height={loaderSize.height}
      viewBox="0 0 150 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="7" y="0" rx="3" ry="3" width="103" height="7" /> 
      <rect x="7" y="12" rx="3" ry="3" width="60" height="7" /> 
      <rect x="8" y="30" rx="0" ry="0" width="129" height="118" /> 
      <rect x="72" y="94" rx="0" ry="0" width="0" height="1" />
    </ContentLoader>
  )
}

export default ItemLoader