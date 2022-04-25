import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppPage, LoginPage, RegisterPage, ProfilePage, ResetPasswordPage, ForgotPasswordPage, IngredientsPage, NotFoundPage } from "../../pages";
import MainLayout from "../../layouts/main-layout";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchIngredients } from '../../services/store/actions/action-ingredients';
import { getUserRequest, refreshToken } from '../../services/store/actions/action-user';
import PrivateRoute from '../private-route/private-route';
import { getCookie } from '../../services/cookie/cookie';

const App = () => {

    const { accessToken } = useAppSelector(state => state.userSlice)

    const dispatch = useAppDispatch()
	useEffect(() => {
        dispatch(fetchIngredients())
    },[dispatch])

    useEffect(() => {
        if(!accessToken){
            const token = getCookie('token')
            if(token){
                dispatch(refreshToken(token))
            }
        }else{
            dispatch(getUserRequest(accessToken))
        }
    }, [accessToken])


    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>

                    <Route path="/" element={<PrivateRoute><AppPage/></PrivateRoute>}/>
                    <Route path="/ingredients/:id" element={<PrivateRoute><IngredientsPage/></PrivateRoute>}/>
                    <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>

                    <Route path="/*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App