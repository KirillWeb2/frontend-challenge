import React, { FC } from 'react'
import { IKitten } from '../../models/Kitten'
import s from './Kittens.module.scss'
import love__border from '../../img/favorite_border.png'
import love from '../../img/favorite.png'

interface IKittens {
    item: IKitten
    managingFavourite: (kitten: IKitten) => void
    isFocus: (id: string) => void
    isLove: boolean
}

const Kittens: FC<IKittens> = ({ item, managingFavourite, isFocus, isLove }) => {
    return (
        <div
            className={[item.isHover ? s.shadow : '', s.block__img].join(' ')}
            onMouseOver={() => isFocus(item.id)}
            onMouseLeave={() => isFocus('')}
            onClick={() => managingFavourite({ ...item, isHover: false })}
        >
            <img
                src={item.url}
                alt=""
            />
            {
                item.isHover
                    ? isLove
                        ? <img className={s.love} src={love} alt="" />
                        : <img className={s.love__border} src={love__border} alt="" />
                    : null
            }
        </div>
    )
}

export default Kittens