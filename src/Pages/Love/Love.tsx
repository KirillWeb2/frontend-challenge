import React, { FC } from 'react'
import Kittens from '../../components/Kittens/Kittens'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { useStorage } from '../../hooks/useStorage'
import { IKitten } from '../../models/Kitten'
import { kittenSlice } from '../../store/slices/kittenSlice'


const Love: FC = () => {
    const { del } = useStorage()

    const dispatch = useAppDispatch()
    const { fav_kittens } = useAppSelector(state => state.reducer)
    const { isFocusImg } = kittenSlice.actions

    const isFocusFavourite = (id: string) => dispatch(isFocusImg({ key: "fav_kittens", id }))

    if (!fav_kittens) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='list'>
            {
                (fav_kittens && fav_kittens.length !== 0) &&
                fav_kittens.map((i: IKitten, index) =>
                    <Kittens key={index} item={i} managingFavourite={del} isFocus={isFocusFavourite} isLove={true} />
                )
            }
        </div>
    )
}

export default Love