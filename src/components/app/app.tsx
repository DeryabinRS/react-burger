import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
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
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

type TLocationState = {
    modal?: string | undefined;
}

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
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

    const modal  = location.state as TLocationState;

    return (

        <Routes>
            <Route path="/" element={<MainLayout/>}>
                
                <Route path="/" element={<AppPage/>}>
                    {modal && <Route path={`/ingredients/:id`} element={
                        <Modal title="Детали ингредиента" isActive={true} handleToggleModal={() => navigate(-1)} >
                            <IngredientDetails />
                        </Modal>} /> 
                    }
                </Route>
                <Route path="/ingredients/:id" element={<IngredientsPage/>}/>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}>
                    <Route index element={<PrivateRoute><ProfilePageData/></PrivateRoute>}/>
                    <Route path="/profile/orders" element={<PrivateRoute><ProfilePageOrders/></PrivateRoute>}/>
                    {modal && <Route path="/profile/orders/:id" element={
                        <Modal title="" isActive={true} handleToggleModal={() => navigate(-1)} >
                            <ProfilePageOrdersId/>
                        </Modal>
                    }/>}
                </Route>
                <Route path="/profile/orders/:id" element={<ProfilePageOrdersId/>}/>

                <Route path="/*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    )
}

export default App