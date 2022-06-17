import reducer,{
    initialState,
    clearMessage,
    login,
    logout,
    register,
    setUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    fetching,
    fetchingError,
} from './user-slice';

// const initialState = {
//     user: null,
//     isLoading: false,
//     isError: false,
//     message: '',
//     accessToken: null,
// }


describe('User Slise', () => {
    
    const accessToken = 'Token'
    
    const user = { name: "userTest", email: "test@email.com" };
    const userUpdate = { name: "userTestUpdate", email: "testUpdate@email.com" };

    const action = {
        user,
        accessToken
    }

    test("TEST - clearMessage userSlice", () => {
        expect(
          reducer(
            initialState,
            clearMessage()
          )
        ).toEqual({
          ...initialState,
            message: '',
            isError: false
        });
      });

    it('TEST - login userSlice', () => {

        expect(
            reducer(
              initialState,
              login(action)
            )
          ).toEqual({
            ...initialState,
            user: action.user,
            accessToken: action.accessToken,
            isLoading: false,
            isError: false
          })
    });

    it('TEST - logout userSlice', () => {
        expect(
            reducer(
              initialState,
              logout('Error')
            )
          ).toEqual({
            ...initialState,
            user: null,
            accessToken: null,
            isLoading: false,
            isError: false
          })
    });

    it('TEST - register userSlice', () => {
        expect(
            reducer(
              initialState,
              register(action)
            )
          ).toEqual({
            ...initialState,
            user: action.user,
            accessToken: action.accessToken,
            isLoading: false,
            isError: false,
          })
    });

    it('TEST - setUser userSlice', () => {
        expect(
            reducer(
              initialState,
              setUser(action)
            )
          ).toEqual({
            ...initialState,
            user: action.user,
            isLoading: false,
            isError: false,
          })
    });

    it('TEST - refreshToken userSlice', () => {
        expect(
            reducer(
              initialState,
              refreshToken(accessToken)
            )
          ).toEqual({
            ...initialState,
            accessToken: accessToken,
            isLoading: false,
            isError: false
          })
    });

    it('TEST - forgotPassword userSlice', () => {
        expect(
            reducer(
              initialState,
              forgotPassword()
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            isError: false
          })
    });

    it('TEST - resetPassword userSlice', () => {
        expect(
            reducer(
              initialState,
              resetPassword()
            )
          ).toEqual({
            ...initialState,
            message: 'Пароль изменен',
            isLoading: false,
            isError: false,
          })
    });

    it('TEST - fetching userSlice', () => {
        expect(
            reducer(
              initialState,
              fetching()
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            isLoading: true,
            isError: false,
            message: ''
          })
    });

    it('TEST - fetchingError userSlice', () => {
        expect(
            reducer(
              initialState,
              fetchingError('Error')
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            message: 'Error',
            isError: true
          })
    });

});