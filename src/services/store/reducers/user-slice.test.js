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

const accessToken = 'Token'

const user = {
    email:"deryabinrs@yandex.ru",
    name:"Роман"
}

describe('User Slise', () => {

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
              login({user, accessToken})
            )
          ).toEqual({
            ...initialState,
            user: user,
            accessToken: accessToken,
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
            isLoading: false,
            error: 'Error'
          })
    });

    it('TEST - register userSlice', () => {
        expect(
            reducer(
              initialState,
              register('Error')
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            error: 'Error'
          })
    });

    it('TEST - setUser userSlice', () => {
        expect(
            reducer(
              initialState,
              setUser('Error')
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            error: 'Error'
          })
    });

    it('TEST - refreshToken userSlice', () => {
        expect(
            reducer(
              initialState,
              refreshToken('new Token')
            )
          ).toEqual({
            ...initialState,
            accessToken: 'new Token',
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