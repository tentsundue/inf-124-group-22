const { OpenAI } = require("openai");

const express = require("express");

// create router
const router = express.Router();

openai = new OpenAI({ apiKey: process.env.CHAT_GPT_API_KEY });

router.get("/generate", async (req, res) => {
  try {
    console.log("Received request to generate recipe");
    const ingredients = req.query;
    // console.log("req.query.userSuggestion:", req.query.userSuggestion);
    // console.log("RIGHT HEREEEEEEEEEEEEE:", req.query.previousRecipes);
    // console.log("Ingredients received:", ingredients);
    const parsedIngredients = Object.fromEntries(
      Object.entries(ingredients).map(([key, value]) => [
        key,
        parseFloat(value),
      ])
    );
    // console.log("Parsed ingredients:", parsedIngredients);
    const ingredientMapJSON = JSON.stringify(parsedIngredients);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful recipe assistant.",
        },
        {
          role: "user",
          content: `
          Here are recipes that have already been generated:

          ${req.query.previousRecipes}, they are formatted as {index: {name: recipe_name, ingredients: {"ingredientName": quantity, ...}}}

          Please generate a new recipe that is different from any of the above, no repeat names.
          Make sure it does not use the same name or nearly identical ingredients.
          
          You will be given cooking ingredients in JSON format {"name of ingredient": quantity}.
             Generate a cooking recipe using the following ingredients: ${ingredientMapJSON} and consider the user suggestion
             for ${req.query.userSuggestion}. Return only a json object in the form of 
          { 
            "name": recipe_name,
            "foodCategory": food_category, //e.g. "Vegetarian", "Vegan", "Non-Vegetarian", "Dessert", "Snacks", "Beverage"
            "cuisine": cuisine, //e.g. "Indian", "Italian", "Chinese", "Mexican", "American"
            "description": recipe_description",
            "instructions": cooking_instructions,
            "ingredients_used": {"ingredientName": quantity, ...},
            "extraIngredients": {"ingredientName": quantity, ...}  //ingredients that user does not have but are needed for the recipe

          }
            note the recipe does NOT need to use all the ingredients provided.
             `,
        },
      ],
    });
    const recipe = response.choices[0].message.content;
    // console.log("Generated recipe:", recipe);
    res.status(200).json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

module.exports = router;