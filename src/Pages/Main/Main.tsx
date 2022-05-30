import React, { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Kittens from '../../components/Kittens/Kittens'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { useStorage } from '../../hooks/useStorage'
import { IKitten } from '../../models/Kitten'
import { kittenAPI } from '../../services/KittenService'
import { kittenSlice } from '../../store/slices/kittenSlice'

const Main: FC = () => {
    // hooks
    const { ref, inView } = useInView({ threshold: 0, })
    const { push } = useStorage()

    // local store
    const limit = 15
    const [page, setPage] = useState<number>(1)

    // store
    const dispatch = useAppDispatch()
    const { kittens, fav_kittens } = useAppSelector(state => state.reducer)
    const { getKittens, isFocusImg } = kittenSlice.actions

    // requests
    const { data } = kittenAPI.useGetKittensQuery({ limit, page })

    const isFocusKittens = (id: string) => dispatch(isFocusImg({ key: "kittens", id }))

    // effects
    useEffect(() => {
        if (data) {
            // добавляю к объектам поля isHover для того, чтобы понимать, когда на элемент наводят мышкой
            const massive = data.map((i: IKitten) => {
                return {
                    ...i, isHover: false
                }
            })
            dispatch(getKittens(massive))
        }
    }, [data])

    useEffect(() => {
        if (inView) setPage(page + 1)
    }, [inView])

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <div className='list'>
                {
                    kittens.map((i: IKitten, index: number) => {
                        // отрисовываем картинки и если картинка лежит в любимых, то передаём просами
                        // isLove true, и наоборот
                        if (fav_kittens.find((k: IKitten) => i.id === k.id)) {
                            return <Kittens key={index} item={i} managingFavourite={push} isFocus={isFocusKittens} isLove={true} />
                        } else {
                            return <Kittens key={index} item={i} managingFavourite={push} isFocus={isFocusKittens} isLove={false} />
                        }
                    })
                }
            </div>
            {
                (data && data.length !== 0) &&
                <div ref={ref} className='obs'>
                    {
                        inView && <h1>Загрузка...</h1>
                    }
                </div>}
        </div>
    )
}

export default Main