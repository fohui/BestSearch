import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export const getTrends = createAsyncThunk('search/getTrends', async (key:string) => {
  const response = await fetch('http://3.141.23.218:5000/interview/keyword_search',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "login_token":"INTERVIEW_SIMPLY2021",
      "search_phrase": key,   
    }),
  })
 
  return response.json();
})

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
    loading: false,
    trends: []
  },
  reducers: {
    updateKey: (state, action: PayloadAction<string>)=>{
      state.keyword = action.payload
    },
  },
  extraReducers: builder=> {
    builder
      .addCase(getTrends.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getTrends.fulfilled,(state, action)=> {
        const result = action.payload;
        const data = result.data.product_trends;
        const trends = data.map((item:any)=> {
          return ({
            search_msv: item.search_msv,
            name: item.name,
            growth: item.growth
          })
        });
        
        state.trends = trends;
        state.loading = false;
      })
  }
})

// createSlice 返回name、reducer、actions、caseReducers对象
export const { updateKey } = searchSlice.actions

export default searchSlice.reducer