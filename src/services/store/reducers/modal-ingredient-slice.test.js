import reducer,{
    currentIngredientAdd, 
    currentIngredientRemove,
    initialState
} from './modal-ingredient-slice';

describe('Shop reducer', () => {
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


    test("TEST - currentIngredientAdd modalSlice", () => {
        expect(
          reducer(
            initialState,
            currentIngredientAdd(dataIngredients)
          )
        ).toEqual({
          ...initialState,
          currentIngredient:dataIngredients
        });
      });

    it('TEST - currentIngredientRemove modalSlice', () => {
        expect(
            reducer(
              initialState,
              currentIngredientRemove()
            )
          ).toEqual({
            ...initialState,
            currentIngredient:null
          })
    });

});