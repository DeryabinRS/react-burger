import reducer, {
  initialState,
  selectedIngredientsAdd,  
  selectedIngredientsUpdate, 
  selectedIngredientDelete,
  selectedIngredientsClear,
} from "./constructor-slice";

import { setupStore } from '..'

describe("Redux burger constructor reducer", () => {
  test("initialState", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  const ingredient_1 = {
    _id:"60d3b41abdacab0026a733cd",
    name:"Соус фирменный Space Sauce",
    type:"sauce",
    proteins:50,
    fat:22,
    carbohydrates:11,
    calories:14,
    price:80,
    image:"https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile:"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v:0,
    dragId:"21134046-b0e1-47dd-b91d-7b37b4e3b4ce"
  }

  const ingredient_2 = {
    _id:"60d3b41abdacab0026a733ce",
    name:"Соус традиционный галактический",
    type:"sauce",
    proteins:42,
    fat:24,
    carbohydrates:42,
    calories:99,
    price:15,
    image:"https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile:"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v:0,
    dragId:"31497879-bada-421b-83eb-b8932d74c751",
  }
  
  test("selectedIngredientsAdd", () => {
    expect(
      reducer(
        initialState,
        selectedIngredientsAdd(ingredient_1)
      )
    ).toEqual({
      ...initialState,
      statePrice: 80,
      selectedIngredients: [ingredient_1],
    });
  });

  test("selectedIngredientsUpdate", () => {
    expect(
      reducer(
        {...initialState, statePrice: 95, selectedIngredients: [ingredient_1, ingredient_2]},
        selectedIngredientsUpdate([ingredient_2, ingredient_1])
      )
    ).toEqual({
      ...initialState,
      statePrice: 95,
      selectedIngredients: [ingredient_2, ingredient_1],
    });
  });

  test("selectedIngredientDelete", () => {
    expect(
      reducer(
        {...initialState, statePrice: 95, selectedIngredients: [ingredient_1, ingredient_2]},
        selectedIngredientDelete('31497879-bada-421b-83eb-b8932d74c751')
      )
    ).toEqual({
      ...initialState,
      statePrice: 80,
      selectedIngredients: [ingredient_1],
    });
  });

  test("selectedIngredientsClear", () => {
    expect(
      reducer(
        {...initialState, statePrice: 95, selectedIngredients: [ingredient_1, ingredient_2]},
        selectedIngredientsClear()
      )
    ).toEqual({
      ...initialState,
      statePrice: 0,
      selectedIngredients: [],
    });
  });
})