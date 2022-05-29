import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import s from './Navbar.module.scss'

interface INav {
    id: number
    url: string
    text: string
    isSelected: boolean
}

const Navbar: FC = () => {
    const url = useLocation()

    const [nav, setNav] = useState<INav[]>([
        { id: 1, url: "/", text: 'Все котики', isSelected: false },
        { id: 2, url: "/love", text: 'Любимые котики', isSelected: false },
    ])

    const choose = (id: number) => {
        const newNav = nav.map((i: INav) => {
            if (i.id === id) {
                return { ...i, isSelected: true }
            } else {
                return { ...i, isSelected: false }
            }
        })
        setNav(newNav)
    }

    useEffect(() => {
        const newNav = nav.map((i: INav) => {
            if (i.url === url.pathname) {
                return { ...i, isSelected: true }
            } else {
                return { ...i, isSelected: false }
            }
        })
        setNav(newNav)
    }, [url])

    return (
        <div className={s.navbar__bg}>
            <div className='container'>
                <ul className={s.nav}>
                    {
                        nav.map((i: INav) =>
                            <li key={i.url} onClick={() => choose(i.id)}>
                                <Link to={i.url} className={i.isSelected ? s.selected : ''}>{i.text}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar