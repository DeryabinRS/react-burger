import { useAppSelector } from './redux'

export function useAuth(){
    const { user, token } = useAppSelector(state => state.userSlice)

    return {
        isAuth: !!user?.name,
        email: user?.email,
        name: user?.name,
        token
    }
}