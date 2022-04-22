import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppPage, LoginPage, RegisterPage, ProfilePage, ResetPasswordPage, ForgotPasswordPage, IngredientsPage, NotFoundPage } from "../../pages";
import MainLayout from "../../layouts/main-layout";
import { useAppDispatch } from '../../hooks/redux';
import { fetchIngredients } from '../../services/store/actions/action-ingredients';

const App = () => {
    const dispatch = useAppDispatch()
	useEffect(() => {
        dispatch(fetchIngredients())
    },[dispatch])
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="/" element={<AppPage/>}/>
                    <Route path="/ingredients/:id" element={<IngredientsPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/register" element={<AppPage/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App