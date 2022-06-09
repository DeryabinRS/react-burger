import reducer, { selectedIngredientsAdd,  
    selectedIngredientsUpdate, 
    selectedIngredientDelete,
    selectedIngredientsClear } from './constructor-slice'

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual([
    {
        selectedIngredients: [],
        selectedBun: null,
        statePrice: 0,
    }
  ])
})

test('should handle a todo being added to an empty list', () => {
  const previousState = []
  expect(reducer(previousState, selectedIngredientsAdd('Run the tests'))).toEqual([
    {
        selectedIngredients: [],
        selectedBun: null,
        statePrice: 0,
    }
  ])
})

// test('should handle a todo being added to an existing list', () => {
//   const previousState = [
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     }
//   ]
//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     },
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 1
//     }
//   ])
// })