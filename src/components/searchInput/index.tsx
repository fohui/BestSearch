import React from 'react';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './index.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { updateKey } from '../../redux/search';

interface IProps {
  onSearch?: ()=> void;
}
const SearchInput: FunctionComponent<PropsWithChildren<IProps>>  = (props)=>{
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const keyword = useAppSelector((state) => state.search.keyword);
  const { onSearch } = props;

  const jumpToResult = ()=>{
    if(keyword){
      if(onSearch){
        onSearch()
      }else {
        navigate(`/search/${keyword}`)
      }
    }
  }
  const onChange:(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=> void = (e)=>{
    const val = e.target.value;
    dispatch(updateKey(val)) 
  }
  const onkeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event;
    if (key === 'Enter') {
      jumpToResult()
    }
  };
  return (
    <div className={styles.searchBox}>
      <Input 
        placeholder='Search for new products in 961K stores' 
        className={styles.searchInput}
        disableUnderline
        autoFocus
        onChange={onChange}
        value={keyword}
        onKeyDown={onkeyDown}
      ></Input>
      <Button
        className={styles.searchBtn}
        variant="outlined"
        onClick={jumpToResult}
      >
        <SearchIcon />
      </Button>
    </div>
  )
}

export default SearchInput;