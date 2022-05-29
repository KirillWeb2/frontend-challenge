import React, { FC } from 'react'
import { IFavKitten } from '../../models/Kitten'
import love from '../../img/favorite.png'
import s from './FavKittens.module.scss'
import { Link } from 'react-router-dom'


interface IKittens {
    massive: IFavKitten[]
    managingFavourite: (id: string) => void
    isFocus: (id: string) => void
}

const FavKittens: FC<IKittens> = ({ massive, managingFavourite, isFocus }) => {
    return (
        <div>
            <div className={s.list}>
                {
                    (massive && massive.length !== 0) &&
                    massive.map((i: IFavKitten, index: number) =>
                        <div
                            key={index}
                            className={[i.isHover ? s.shadow : '', s.block__img].join(' ')}
                            onMouseOver={() => isFocus(i.image_id)}
                            onMouseLeave={() => isFocus('')}
                            onClick={() => managingFavourite(i.id.toString())}
                        >
                            <img
                                src={i.image.url}
                                height={225}
                                width={225}
                                alt=""
                            />
                            {
                                i.isHover && <img className={s.love} src={love} alt="" />
                            }
                        </div>
                    )
                }
            </div>
            {massive.length === 0 &&
                <div className="without__data">
                    <h1>
                        Ты всё еще не нашёл своёго любимца? Давай исправим это!
                    </h1>
                    <Link to="/">Мяу</Link>
                </div>
            }
        </div>
    )
}

export default FavKittens