import reducer,{
    fetching,
    fetchingError,
    setIngredients,
    currentIngredientAdd,
    currentIngredientRemove,
    initialState
} from './ingredients-slice';

// export const initialState = {
//     ingredients: [],
//     isLoading: false,
//     error: '',
//     currentIngredient: null,
// }

describe('ingredientSlice reducer', () => {
    const dataIngredients = {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
    }


    test("TEST - fetching ingredientSlice", () => {
        expect(
          reducer(
            initialState,
            fetching()
          )
        ).toEqual({
          ...initialState,
          isLoading:true
        });
      });

    it('TEST - fetchingError ingredientSlice', () => {
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

    it('TEST - setIngredients ingredientSlice', () => {
        expect(
            reducer(
              initialState,
              setIngredients([dataIngredients])
            )
          ).toEqual({
            ...initialState,
            isLoading: false,
            error: '',
            ingredients: [dataIngredients]
          })
    });

    it('TEST - currentIngredientAdd ingredientSlice', () => {
        expect(
            reducer(
              initialState,
              currentIngredientAdd(dataIngredients)
            )
          ).toEqual({
            ...initialState,
            currentIngredient: dataIngredients
          })
    });

    it('TEST - currentIngredientRemove ingredientSlice', () => {
        expect(
            reducer(
              initialState,
              currentIngredientRemove(dataIngredients)
            )
          ).toEqual({
            ...initialState,
            currentIngredient: null
          })
    });

});