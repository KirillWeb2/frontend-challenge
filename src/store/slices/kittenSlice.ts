import { IKitten } from './../../models/Kitten';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IInitialState {
  kittens: IKitten[]
  fav_kittens: IKitten[]
}
interface IFocusImg {
  key: "kittens" | "fav_kittens"
  id: string
}


const focus = (massive: any[], id: string) => {
  return massive.map((i: any) => {
    if (i.id=== id) {
      return {
        ...i,
        isHover: true
      }
    } else {
      return {
        ...i,
        isHover: false
      }
    }
  })
}

const focusFav = (massive: any[], id: string) => {
  return massive.map((i: any) => {
    if (i.id  === id) {
      return {
        ...i,
        isHover: true
      }
    } else {
      return {
        ...i,
        isHover: false
      }
    }
  })
}


const initialState: IInitialState = {
  kittens: [],
  fav_kittens: []
}


export const kittenSlice = createSlice({
  name: 'kitten',
  initialState,
  reducers: {
    getKittens(state, action: PayloadAction<IKitten[]>) {
      state.kittens = [...state.kittens, ...action.payload]
    },
    getFavKittens(state, action: PayloadAction<IKitten[]>) {
      state.fav_kittens = action.payload
    },
    getNewFavourite(state, action: PayloadAction<IKitten>) {
      state.fav_kittens = [...state.fav_kittens, action.payload]
    },
    deleteFavKitten(state, action: PayloadAction<IKitten>) {
      state.fav_kittens = state.fav_kittens.filter((i: IKitten) => i.id !== action.payload.id)
    },
    isFocusImg(state, action: PayloadAction<IFocusImg>) {
      if (action.payload.key === 'kittens') {
        state.kittens = focus(state.kittens, action.payload.id)
      }
      if (action.payload.key === 'fav_kittens') {
        state.fav_kittens = focusFav(state.fav_kittens, action.payload.id)
      }
      return
    },
  },
})

export default kittenSlice.reducer
