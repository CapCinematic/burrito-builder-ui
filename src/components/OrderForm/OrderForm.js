import { useState } from "react";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [disabled, setDisabled] = useState(true)

  function handleSubmit(e) {
    e.preventDefault();
    const newOrder = {name, ingredients}
    fetch("http://localhost:3001/api/v1/orders", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newOrder),
    })
    .then((response) => response.json())
      .then((order) => {
        props.addOrder(order);
        clearInputs();
      })
      .catch((error) => console.error("Error adding order:", error));
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
    setDisabled(true)
  };

  function handleNameChange(e) {
    e.preventDefault()
    setName(e.target.value)
    setDisabled(e.target.value === "" || ingredients.length === 0)
  }

  function handleIngredientClick(e){
    e.preventDefault()
    const ingredient = e.target.name
    setIngredients([...ingredients, ingredient])
    setDisabled(name === "" || ingredients.length === 0)
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={handleIngredientClick}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleNameChange}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button name={"submit-order"} disabled={disabled} onClick={handleSubmit}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
