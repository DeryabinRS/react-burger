import reducer, {
    initialState,
    currentIngredientAdd, 
    currentIngredientRemove, 
  } from "./ingredients-slice";
  
describe("Redux burger ingredients reducer", () => {
    test("initialState", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });
})