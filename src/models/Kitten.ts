export interface IKitten {
    breeds: []
    height: number
    id: string
    url: string
    width: number
    isHover: boolean
}

export interface IFavKitten {
    created_at: string
    id: number
    image: {
        id: string
        url: string
    }
    image_id: string
    sub_id: string | null
    user_id: string
    isHover: boolean
}

export interface props<T> {

}