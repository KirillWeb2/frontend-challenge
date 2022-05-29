import React, { FC } from 'react'
import { IKitten } from '../../models/Kitten'
import s from './Kittens.module.scss'
import love from '../../img/favorite_border.png'

interface IKittens {
    massive: IKitten[]
    managingFavourite: (id: string) => void
    isFocus: (id: string) => void
}

const Kittens: FC<IKittens> = ({ massive, managingFavourite, isFocus }) => {
    return (
        <div className={s.list}>
            {
                (massive && massive.length !== 0) &&
                massive.map((i: IKitten, index: number) =>
                    <div
                        key={index}
                        className={[i.isHover ? s.shadow : '', s.block__img].join(' ')}
                        onMouseOver={() => isFocus(i.id)}
                        onMouseLeave={() => isFocus('')}
                        onClick={() => managingFavourite(i.id)}
                    >
                        <img
                            src={i.url}
                            alt=""
                        />
                        {
                            i.isHover && <img className={s.love} src={love} alt="" />
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Kittens