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

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");

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
      <img src={heartPizza} alt="" className="decor pizza-heart" />
      <img src={bunnyToast} alt="" className="decor bunny-toast" />
      <img src={cookie} alt="" className="decor choc-cookie" />
      <img src={redBow} alt="" className="decor red-bow" />

      {/* Star button and overlapping blue bow */}

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
              Past
            </tspan>

            <tspan x="100" y="116">
              Recipes
            </tspan>
          </text>
        </svg>
      </button>

      <img src={blueBow} alt="" className="decor blue-bow" />

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
                        : ""
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

          <div className="panel-body recipe-output">
            <button
                type="button"
                className="generate-recipe-btn"
          
              >
                Generate Recipe
              </button>
              
            </div>

                <button
                type="button"
                className="save-recipe-btn"
          
              >
                Save Recipe
              </button>


            <div className="panel-body">
        
            </div>


          </section>
        </main>
      </div>
    </div>
  );
}

export default App;