import { useState } from "react";
import "./App.css";

import background from "./assets/background_gingham.jpg";
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

/* Temporary recipes until the API is connected */

const mockRecipes = [
  {
    name: "Creamy Garlic Pasta",
    description:
      "A simple and comforting pasta with a creamy garlic parmesan sauce.",
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
      "Stir in the parmesan until the sauce is smooth.",
      "Add the cooked pasta and toss until coated.",
      "Season with salt and pepper before serving.",
    ],
  },
  {
    name: "Crispy Vegetable Rice Bowl",
    description:
      "A quick rice bowl with crispy vegetables and a savory sauce.",
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
      "Add the vegetables and cook until lightly browned.",
      "Add the cooked rice and soy sauce.",
      "Cook until the rice becomes slightly crispy.",
      "Fry the egg in a separate pan.",
      "Place the egg over the rice and add green onions.",
    ],
  },
];

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");

  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [recipeIndex, setRecipeIndex] = useState(0);

  function addIngredient() {
    const newIngredient = ingredientInput.trim().toLowerCase();

    if (!newIngredient) {
      return;
    }

    if (!ingredients.includes(newIngredient)) {
      setIngredients((currentIngredients) => [
        ...currentIngredients,
        newIngredient,
      ]);
    }

    setIngredientInput("");
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((currentIngredients) =>
      currentIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      )
    );
  }

  function handleIngredientKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addIngredient();
    }

    if (
      event.key === "Backspace" &&
      ingredientInput === "" &&
      ingredients.length > 0
    ) {
      setIngredients((currentIngredients) =>
        currentIngredients.slice(0, -1)
      );
    }
  }

  function generateRecipe() {
    const selectedRecipe = mockRecipes[recipeIndex];

    setGeneratedRecipe(selectedRecipe);

    setRecipeIndex(
      (currentIndex) =>
        (currentIndex + 1) % mockRecipes.length
    );
  }

  function saveRecipe() {
    if (!generatedRecipe) {
      return;
    }

    console.log("Recipe saved:", generatedRecipe);
  }

  return (
    <div
      className="cookbook-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Decorations */}

      <img src={pretzel} alt="" className="decor pretzel" />
      <img src={sushiRoll} alt="" className="decor sushi" />
      <img src={croissant} alt="" className="decor croissant" />

      <img
        src={heartJamCookie}
        alt=""
        className="decor heart-cookie"
      />

      <img
        src={heartPizza}
        alt=""
        className="decor pizza-heart"
      />

      <img
        src={bunnyToast}
        alt=""
        className="decor bunny-toast"
      />

      <img
        src={cookie}
        alt=""
        className="decor choc-cookie"
      />

      <img src={redBow} alt="" className="decor red-bow" />

      {/* Past Recipes button */}

      <button
        type="button"
        className="past-recipes-btn"
        aria-label="View past recipes"
      >
        <svg
          viewBox="0 0 200 200"
          className="past-recipes-svg"
          aria-hidden="true"
        >
          <image
            href={star}
            x="0"
            y="0"
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid meet"
          />

          <text
            x="100"
            y="100"
            className="past-recipes-text"
            textAnchor="middle"
          >
            <tspan x="100" y="88">
              Saved
            </tspan>

            <tspan x="100" y="116">
              Recipes
            </tspan>
          </text>
        </svg>
      </button>

      <img
        src={blueBow}
        alt=""
        className="decor blue-bow"
      />

      {/* Main content */}

      <div className="content-wrapper">
        <header className="title-banner">
          <h1>My College Cookbook</h1>
        </header>

        <main className="panel-row">
          {/* Ingredients panel */}

          <section className="panel ingredients-panel">
            <h2>Ingredients</h2>

            <div className="panel-body ingredients-body">
              <div
                className="ingredient-input-box"
                onClick={(event) => {
                  event.currentTarget
                    .querySelector("input")
                    ?.focus();
                }}
              >
                <div className="ingredient-tags">
                  {ingredients.map((ingredient) => (
                    <span
                      className="ingredient-tag"
                      key={ingredient}
                    >
                      <span>{ingredient}</span>

                      <button
                        type="button"
                        className="remove-ingredient"
                        aria-label={`Remove ${ingredient}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeIngredient(ingredient);
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    className="ingredient-input"
                    value={ingredientInput}
                    placeholder={
                      ingredients.length === 0
                        ? "Enter an ingredient..."
                        : "Add another..."
                    }
                    aria-label="Add an ingredient"
                    onChange={(event) =>
                      setIngredientInput(event.target.value)
                    }
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

          {/* Recipes panel */}

          <section className="panel recipes-panel">
            <h2>Personalized Recipes</h2>

            <button
              type="button"
              className="generate-recipe-btn"
              onClick={generateRecipe}
            >
              Generate Recipe
            </button>

            <div className="recipe-text-box">
              {!generatedRecipe ? (
                <p className="recipes-placeholder">
                  Your generated recipe will appear here.
                </p>
              ) : (
                <article className="generated-recipe">
                  <h3>{generatedRecipe.name}</h3>

                  <p className="recipe-description">
                    {generatedRecipe.description}
                  </p>

                  {ingredients.length > 0 && (
                    <>
                      <h4>Your Selected Ingredients</h4>

                      <ul>
                        {ingredients.map((ingredient) => (
                          <li key={ingredient}>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h4>Recipe Ingredients</h4>

                  <ul>
                    {generatedRecipe.ingredients.map(
                      (ingredient) => (
                        <li key={ingredient}>
                          {ingredient}
                        </li>
                      )
                    )}
                  </ul>

                  <h4>Instructions</h4>

                  <ol>
                    {generatedRecipe.instructions.map(
                      (instruction, index) => (
                        <li
                          key={`${index}-${instruction}`}
                        >
                          {instruction}
                        </li>
                      )
                    )}
                  </ol>
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