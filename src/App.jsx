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

function App() {
  return (
    <div
      className="cookbook-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* -------------------------
          DECORATIONS
      ------------------------- */}

      <img
        src={pretzel}
        alt=""
        className="decor pretzel"
      />

      <img
        src={sushiRoll}
        alt=""
        className="decor sushi"
      />

      <img
        src={croissant}
        alt=""
        className="decor croissant"
      />

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

      <img
        src={redBow}
        alt=""
        className="decor red-bow"
      />

      <img
        src={blueBow}
        alt=""
        className="decor blue-bow"
      />

      {/* -------------------------
          MAIN CONTENT
      ------------------------- */}

      <div className="content-wrapper">

        {/* TITLE */}
        <header className="title-banner">
          <h1>My College Cookbook</h1>
        </header>

        {/* PAST RECIPES */}
        <button className="past-recipes-btn">
          Past
          <br />
          Recipes
        </button>

        {/* MAIN PANELS */}
        <main className="panel-row">

          {/* INGREDIENTS */}
          <section className="panel ingredients-panel">
            <h2>My Ingredients</h2>

            <div className="panel-body">

            </div>
          </section>

          {/* RECIPES */}
          <section className="panel recipes-panel">
            <h2>Personalized Recipes</h2>

            <div className="panel-body">

            </div>
          </section>

        </main>

      </div>
    </div>
  );
}

export default App;