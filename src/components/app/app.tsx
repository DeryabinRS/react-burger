import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { 
    AppPage, 
    LoginPage, 
    RegisterPage, 
    ProfilePage, 
    ResetPasswordPage, 
    ForgotPasswordPage, 
    IngredientsPage, 
    NotFoundPage,
    ProfilePageData,
    ProfilePageOrders,
    ProfilePageOrdersId,
} from "../../pages";
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
                    <Route index element={<AppPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>

                    <Route path="/ingredients/:id" element={<IngredientsPage/>}/>
                    <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}>
                        <Route index element={<PrivateRoute><ProfilePageData/></PrivateRoute>}/>
                        <Route path="/profile/orders" element={<PrivateRoute><ProfilePageOrders/></PrivateRoute>}/>
                        <Route path="/profile/orders/:id" element={<PrivateRoute><ProfilePageOrdersId/></PrivateRoute>}/>
                    </Route>

                    <Route path="/*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App