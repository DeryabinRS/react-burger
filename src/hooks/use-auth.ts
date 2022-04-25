import { useAppSelector } from './redux'

export function useAuth(){
    const { user, accessToken } = useAppSelector(state => state.userSlice)

    return {
        isAuth: !!user?.name,
        email: user?.email,
        name: user?.name,
        accessToken
    }
}