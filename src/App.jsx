import { useState } from "react";
import "./App.css";

import background from "./assets/background_gingham.jpg";
import recipesBackground from "./assets/background-recipes.png";
import blueBow from "./assets/blue_bow.png";
import bunnyToast from "./assets/bunny_toast.png";
import cookie from "./assets/cookie.png";
import croissant from "./assets/croissant.png";
import heartJamCookie from "./assets/heart_jam_cookie.png";
import heartPizza from "./assets/heart_pizza.png";
import pretzel from "./assets/pretzel.png";
import redBow from "./assets/red_gingham_bow.png";
import sushiRoll from "./assets/sushi_roll.png";
import star from "./assets/star.svg";

import avocado from "./assets/avocado.png";
import bagel from "./assets/bagel.png";
import blueberry from "./assets/blueberry.png";
import bread from "./assets/bread.png";
import coffee from "./assets/coffee.png";
import egg from "./assets/egg.png";

const mockRecipes = [
  {
    id: 1,
    name: "Creamy Garlic Pasta",
    description: "A cozy pasta with a creamy garlic-parmesan sauce.",
    ingredients: [
      "8 ounces pasta",
      "2 cloves garlic",
      "1 cup heavy cream",
      "1/2 cup parmesan cheese",
      "1 tablespoon butter",
      "Salt and pepper",
    ],
    instructions: [
      "Cook the pasta according to the package instructions.",
      "Melt the butter in a pan over medium heat.",
      "Add the garlic and cook until fragrant.",
      "Pour in the cream and simmer for three minutes.",
      "Stir in the parmesan until smooth.",
      "Add the pasta, toss until coated, and season to taste.",
    ],
  },
  {
    id: 2,
    name: "Crispy Vegetable Rice Bowl",
    description: "A quick rice bowl with crispy vegetables and a savory sauce.",
    ingredients: [
      "2 cups cooked rice",
      "1 cup mixed vegetables",
      "1 tablespoon soy sauce",
      "1 teaspoon sesame oil",
      "1 egg",
      "Green onions",
    ],
    instructions: [
      "Heat the sesame oil in a large pan.",
      "Cook the vegetables until lightly browned.",
      "Add the rice and soy sauce.",
      "Cook until the rice becomes slightly crispy.",
      "Top with a fried egg and green onions.",
    ],
  },
];

function StarButton({ className, lineOne, lineTwo, onClick, label }) {
  return (
    <button type="button" className={className} onClick={onClick} aria-label={label}>
      <svg viewBox="0 0 200 200" className="star-button-svg" aria-hidden="true">
        <image href={star} x="0" y="0" width="200" height="200" />
        <text x="100" textAnchor="middle" className="star-button-text">
          <tspan x="100" y="88">{lineOne}</tspan>
          <tspan x="100" y="116">{lineTwo}</tspan>
        </text>
      </svg>
    </button>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState(mockRecipes);
  const [savedIndex, setSavedIndex] = useState(0);

  function addIngredient() {
    const ingredient = ingredientInput.trim().toLowerCase();
    if (!ingredient) return;
    if (!ingredients.includes(ingredient)) {
      setIngredients((current) => [...current, ingredient]);
    }
    setIngredientInput("");
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((current) =>
      current.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  function handleIngredientKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addIngredient();
    }
    if (event.key === "Backspace" && !ingredientInput && ingredients.length) {
      setIngredients((current) => current.slice(0, -1));
    }
  }

  function generateRecipe() {
    setGeneratedRecipe(mockRecipes[recipeIndex]);
    setRecipeIndex((current) => (current + 1) % mockRecipes.length);
  }

  function saveRecipe() {
    if (!generatedRecipe) return;
    setSavedRecipes((current) => {
      if (current.some((recipe) => recipe.id === generatedRecipe.id)) return current;
      return [...current, generatedRecipe];
    });
  }

  function deleteRecipe() {
    setSavedRecipes((current) => current.filter((_, index) => index !== savedIndex));
    setSavedIndex((current) => Math.max(0, current - 1));
  }

  const selectedRecipe = savedRecipes[savedIndex] ?? null;

  if (page === "saved") {
    return (
      <div className="saved-page" style={{ backgroundImage: `url(${recipesBackground})` }}>
        <StarButton
          className="saved-star create-recipe-star"
          lineOne="Create New"
          lineTwo="Recipe"
          label="Create a new recipe"
          onClick={() => setPage("home")}
        />

        <StarButton
          className="saved-star delete-recipe-star"
          lineOne="Delete"
          lineTwo="Recipe"
          label="Delete this recipe"
          onClick={deleteRecipe}
        />

        <img src={avocado} alt="" className="saved-decor saved-avocado" />
        <img src={blueberry} alt="" className="saved-decor saved-blueberry" />
        <img src={bagel} alt="" className="saved-decor saved-bagel" />
        <img src={egg} alt="" className="saved-decor saved-egg" />
        <img src={coffee} alt="" className="saved-decor saved-coffee" />
        <img src={bread} alt="" className="saved-decor saved-bread" />

        <header className="saved-title"><h1>Saved Recipes</h1></header>

        <button
          type="button"
          className="recipe-nav previous-recipe"
          onClick={() => setSavedIndex((current) =>
            savedRecipes.length ? (current - 1 + savedRecipes.length) % savedRecipes.length : 0
          )}
          disabled={savedRecipes.length < 2}
        >
          prev
        </button>

        <button
          type="button"
          className="recipe-nav next-recipe"
          onClick={() => setSavedIndex((current) =>
            savedRecipes.length ? (current + 1) % savedRecipes.length : 0
          )}
          disabled={savedRecipes.length < 2}
        >
          next
        </button>

        {selectedRecipe ? (
          <main className="saved-recipe-layout">
            <section className="saved-card saved-name-card">
              <h2>{selectedRecipe.name}</h2>
             
            </section>

            <section className="saved-card saved-ingredients-card">
              <h2>Ingredients</h2>
              <ul>
                {selectedRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section className="saved-card saved-instructions-card">
              <h2>Instructions</h2>
               <p>{selectedRecipe.description}</p>

              <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={`${index}-${instruction}`}>{instruction}</li>
                ))}
              </ol>
            </section>
          </main>
        ) : (
          <div className="empty-saved-recipes">
            <h2>No saved recipes yet</h2>
            <p>Create and save a recipe to see it here.</p>
          </div>
        )}

        <p className="recipe-counter">
          {savedRecipes.length ? `${savedIndex + 1} / ${savedRecipes.length}` : "0 / 0"}
        </p>
      </div>
    );
  }

  return (
    <div className="cookbook-page" style={{ backgroundImage: `url(${background})` }}>
      <img src={pretzel} alt="" className="decor pretzel" />
      <img src={sushiRoll} alt="" className="decor sushi" />
      <img src={croissant} alt="" className="decor croissant" />
      <img src={heartJamCookie} alt="" className="decor heart-cookie" />
      <img src={heartPizza} alt="" className="decor pizza-heart" />
      <img src={bunnyToast} alt="" className="decor bunny-toast" />
      <img src={cookie} alt="" className="decor choc-cookie" />
      <img src={redBow} alt="" className="decor red-bow" />

      <StarButton
        className="past-recipes-btn"
        lineOne="Saved"
        lineTwo="Recipes"
        label="View saved recipes"
        onClick={() => setPage("saved")}
      />
      <img src={blueBow} alt="" className="decor blue-bow" />

      <div className="content-wrapper">
        <header className="title-banner"><h1>My College Cookbook</h1></header>

        <main className="panel-row">
          <section className="panel ingredients-panel">
            <h2>Ingredients</h2>
            <div className="panel-body ingredients-body">
              <div className="ingredient-input-box" onClick={(event) =>
                event.currentTarget.querySelector("input")?.focus()
              }>
                <div className="ingredient-tags">
                  {ingredients.map((ingredient) => (
                    <span className="ingredient-tag" key={ingredient}>
                      <span>{ingredient}</span>
                      <button
                        type="button"
                        className="remove-ingredient"
                        aria-label={`Remove ${ingredient}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeIngredient(ingredient);
                        }}
                      >×</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="ingredient-input"
                    value={ingredientInput}
                    placeholder={ingredients.length ? "Add another..." : "Enter an ingredient..."}
                    onChange={(event) => setIngredientInput(event.target.value)}
                    onKeyDown={handleIngredientKeyDown}
                  />
                </div>
              </div>
              <button
                type="button"
                className="add-ingredient-btn"
                onClick={addIngredient}
                disabled={!ingredientInput.trim()}
              >
                Add Ingredient
              </button>
            </div>
          </section>

          <section className="panel recipes-panel">
            <h2>Personalized Recipes</h2>
            <button type="button" className="generate-recipe-btn" onClick={generateRecipe}>
              Generate Recipe
            </button>

            <div className="recipe-text-box">
              {!generatedRecipe ? (
                <p className="recipes-placeholder">Your generated recipe will appear here.</p>
              ) : (
                <article className="generated-recipe">
                  <h3>{generatedRecipe.name}</h3>
                  <p>{generatedRecipe.description}</p>
                  <h4>Ingredients</h4>
                  <ul>{generatedRecipe.ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
                  <h4>Instructions</h4>
                  <ol>{generatedRecipe.instructions.map((step, index) =>
                    <li key={`${index}-${step}`}>{step}</li>
                  )}</ol>
                </article>
              )}
            </div>

            <button
              type="button"
              className="save-recipe-btn"
              onClick={saveRecipe}
              disabled={!generatedRecipe}
            >
              Save Recipe
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
