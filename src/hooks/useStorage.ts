import { IKitten } from './../models/Kitten';
import { useEffect } from "react"
import { kittenSlice } from "../store/slices/kittenSlice"
import { useAppDispatch, useAppSelector } from "./ReduxHooks"

const kittenStorage = "kittenStorage"

export const useStorage = () => {
    const dispatch = useAppDispatch()
    const { fav_kittens } = useAppSelector(state => state.reducer)
    const { getFavKittens, getNewFavourite, deleteFavKitten } = kittenSlice.actions

    const push = (kitten: IKitten) => {
        if (fav_kittens.find((i: IKitten) => i.id === kitten.id)) {
            return alert("Хотик на странице любимых :3")
        }

        dispatch(getNewFavourite(kitten))

        const data = localStorage.getItem(kittenStorage)

        if (data) {
            const storage = JSON.parse(data)

            if (storage && storage.fav_kittens) {
                localStorage.setItem(kittenStorage, JSON.stringify({
                    fav_kittens: [...storage.fav_kittens, kitten]
                }))
            }
        }
    }

    const del = (kitten: IKitten) => {
        dispatch(deleteFavKitten(kitten))
        const data = localStorage.getItem(kittenStorage)

        if (data) {
            const storage = JSON.parse(data)

            if (storage && storage.fav_kittens) {
                localStorage.setItem(kittenStorage, JSON.stringify({
                    fav_kittens: storage.fav_kittens.filter((i: IKitten) => i.id !== kitten.id)
                }))
            }
        }


    }

    useEffect(() => {
        const data = localStorage.getItem(kittenStorage)

        if (data) {
            const storage = JSON.parse(data)

            if (storage && storage.fav_kittens) {
                dispatch(getFavKittens(storage.fav_kittens))
            } else {
                localStorage.setItem(kittenStorage, JSON.stringify({
                    fav_kittens: []
                }))
            }
        }
    }, [])


    return {
        push,
        del
    }
}