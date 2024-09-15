import {useRecipeStore} from  './useRecipeStore'

export const RecipeList = () =>{
  const recipes = useRecipeStore(state => state.recipes)

  return (
    <div>
      {recipes.map(recipe =>(
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.ingredients}</p>
          <p>{recipe.preparation}</p>
        </div>
      ))}
    </div>
  )
}