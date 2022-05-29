import React, { FC, useEffect } from 'react'
import FavKittens from '../../components/FavKittens/FavKittens'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { IFavKitten } from '../../models/Kitten'
import { kittenAPI } from '../../services/KittenService'
import { kittenSlice } from '../../store/slices/kittenSlice'


const Love: FC = () => {
    // store
    const dispatch = useAppDispatch()
    const { fav_kittens } = useAppSelector(state => state.reducer)
    const { getFavKittens, isFocusImg } = kittenSlice.actions

    // request
    const { data } = kittenAPI.useGetFavouritesQuery('')
    const [del, { }] = kittenAPI.useDelFavouriteMutation()

    // functions
    const deleteFav = (id: string) => del(id)
    const isFocusFavourite = (id: string) => dispatch(isFocusImg({ key: "fav_kittens", id }))

    // effects
    useEffect(() => {
        if (data) {
            // добавляю к объектам поля isHover для того, чтобы понимать, когда на элемент наводят мышкой
            const massive = data.map((i: IFavKitten) => {
                return {
                    ...i, isHover: false
                }
            })
            dispatch(getFavKittens(massive))
        }
    }, [data])

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <FavKittens massive={fav_kittens} managingFavourite={deleteFav} isFocus={isFocusFavourite} />
    )
}

export default Love