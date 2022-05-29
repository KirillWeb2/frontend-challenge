import { Route, Routes } from 'react-router-dom'
import Love from '../Pages/Love/Love'
import Main from '../Pages/Main/Main'
import NotFound from '../Pages/NotFound/NotFound'

const router = [
    { path: "/", element: Main },
    { path: "/love", element: Love },
    { path: "*", element: NotFound }
]

export const useRoutes = () => {
    return (
        <Routes>
            {router.map(i =>
                <Route key={i.path} path={i.path} element={<i.element />} />
            )}
        </Routes>
    )
}