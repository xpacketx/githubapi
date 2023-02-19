import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface GithubState {
  favourites: string[]
}

const initialState: GithubState = {
  favourites: JSON.parse(localStorage.getItem('favourites') ?? '[]')
}

const GithubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      state.favourites.push(action.payload)
      localStorage.setItem(
        'favourites',
        JSON.stringify(state.favourites)
      )
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        f => f !== action.payload
      )
      localStorage.setItem(
        'favourites',
        JSON.stringify(state.favourites)
      )
    }
  }
})

export const githubActions = GithubSlice.actions
export const githubReducer = GithubSlice.reducer

export default GithubSlice
