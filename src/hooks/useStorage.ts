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

        const data = sessionStorage.getItem(kittenStorage)

        if (data) {
            const storage = JSON.parse(data)

            if (storage && storage.fav_kittens) {
                sessionStorage.setItem(kittenStorage, JSON.stringify({
                    fav_kittens: [...storage.fav_kittens, kitten]
                }))
            } else {
                sessionStorage.setItem(kittenStorage, JSON.stringify({
                    fav_kittens: []
                }))
            }
        }
    }

    const del = (kitten: IKitten) => {
        dispatch(deleteFavKitten(kitten))
        const data = sessionStorage.getItem(kittenStorage)

        if (data) {
            const storage = JSON.parse(data)

            if (storage && storage.fav_kittens) {
                sessionStorage.setItem(kittenStorage, JSON.stringify({
                    fav_kittens: storage.fav_kittens.filter((i: IKitten) => i.id !== kitten.id)
                }))
            }
        }


    }

    useEffect(() => {
        const data = sessionStorage.getItem(kittenStorage)

        if (data) {
            const storage = JSON.parse(data)

            if (storage && storage.fav_kittens) {
                dispatch(getFavKittens(storage.fav_kittens))
            }
        } else {
            sessionStorage.setItem(kittenStorage, JSON.stringify({
                fav_kittens: []
            }))
        }

    }, [])


    return {
        push,
        del
    }
}