import reducer,{
    initialState,
    setOrder,
    fetching,
    fetchingError,
} from './order-slice';

describe('Order Slise', () => {

    test("TEST - setOrder orderSlice", () => {
        expect(
          reducer(
            initialState,
            setOrder('000000')
          )
        ).toEqual({
          ...initialState,
          numOrder:'000000'
        });
      });

    it('TEST - fetching orderSlice', () => {
        expect(
            reducer(
              initialState,
              fetching()
            )
          ).toEqual({
            ...initialState,
            isLoading: true
          })
    });

    it('TEST - fetchingError orderSlice', () => {
        expect(
            reducer(
              initialState,
              fetchingError('Error')
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            error: 'Error'
          })
    });

});