import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/Recipe.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

console.log("Starting seed process...");
console.log("MongoDB URI:", process.env.MONGODB_URI);

const sampleRecipes = [
  {
    title: "Tomato Sambar",
    ingredients: [
      "Toor dal - 1 cup",
      "Tomatoes - 4",
      "Onions - 2",
      "Sambar powder - 2 tbsp",
      "Turmeric powder - 1/2 tbsp",
      "Salt - to taste",
      "Oil - 2 tbsp",
      "Mustard seeds - 1 tbsp",
      "Curry leaves",
    ],
    instructions:
      "1. Cook the toor dal until soft\n2. Chop tomatoes and onions\n3. Heat oil, add mustard seeds and curry leaves\n4. Add onions and tomatoes, sauté well\n5. Add cooked dal, turmeric, sambar powder and let it boil\n6. Cook for 10 minutes and serve",
    category: "Lunch",
    cookingTime: 30,
  },
  {
    title: "Idli",
    ingredients: [
      "Idli rice - 2 cups",
      "Urad dal - 1/2 cup",
      "Salt - to taste",
    ],
    instructions:
      "1. Soak rice and dal\n2. Grind and ferment for 8 hours\n3. Steam in idli plates",
    category: "Breakfast",
    cookingTime: 20,
  },
  {
    title: "Semiya Payasam",
    ingredients: [
      "Milk - 1 liter",
      "Sugar - 1 cup",
      "Vermicelli - 1 cup",
      "Cardamom powder - 1/4 tbsp",
      "Cashews - 10",
      "Ghee - 2 tbsp",
    ],
    instructions:
      "1. Roast vermicelli in ghee\n2. Add to boiling milk\n3. Add sugar and cardamom powder\n4. Add cashews and cook for 5 minutes",
    category: "Dessert",
    cookingTime: 25,
  },
  {
    title: "Vegetable Biryani",
    ingredients: [
      "Basmati rice - 2 cups",
      "Carrot - 1",
      "Green beans - 10",
      "Green peas - 1/2 cup",
      "Onions - 2",
      "Biryani masala - 2 tbsp",
      "Yogurt - 1/2 cup",
      "Salt - to taste",
      "Oil - 3 tbsp",
    ],
    instructions:
      "1. Soak rice\n2. Cut vegetables\n3. Sauté onions and add vegetables\n4. Add masala and yogurt, mix well\n5. Add rice and cook",
    category: "Dinner",
    cookingTime: 45,
  },
  {
    title: "Dosa",
    ingredients: [
      "Dosa rice - 3 cups",
      "Urad dal - 1 cup",
      "Salt - to taste",
      "Oil",
    ],
    instructions:
      "1. Soak rice and dal\n2. Grind to fine batter\n3. Ferment for 6-8 hours\n4. Cook on hot griddle with oil",
    category: "Breakfast",
    cookingTime: 15,
  },
  {
    title: "Chicken Tikka Masala",
    ingredients: [
      "Chicken breast - 500g",
      "Yogurt - 1 cup",
      "Tikka masala paste - 4 tbsp",
      "Onions - 2",
      "Tomatoes - 4",
      "Heavy cream - 1 cup",
      "Butter - 2 tbsp",
      "Ginger garlic paste - 2 tbsp",
      "Garam masala - 1 tsp",
      "Salt - to taste",
      "Oil - 3 tbsp",
      "Coriander leaves for garnish",
    ],
    instructions:
      "1. Marinate chicken with yogurt and tikka masala paste for 2 hours\n2. Grill chicken until charred\n3. In a pan, sauté onions and ginger garlic paste\n4. Add tomatoes and spices, cook until soft\n5. Add grilled chicken and cream\n6. Simmer for 15 minutes\n7. Garnish with coriander",
    category: "Dinner",
    cookingTime: 60,
  },
  {
    title: "Classic Pancakes",
    ingredients: [
      "All-purpose flour - 1.5 cups",
      "Milk - 1.25 cups",
      "Eggs - 2",
      "Butter - 3 tbsp, melted",
      "Sugar - 3 tbsp",
      "Baking powder - 1.75 tsp",
      "Salt - 1/4 tsp",
      "Vanilla extract - 1 tsp",
    ],
    instructions:
      "1. Mix dry ingredients in a bowl\n2. Whisk milk, eggs, butter, and vanilla in another bowl\n3. Combine wet and dry ingredients\n4. Heat griddle to medium\n5. Pour 1/4 cup batter for each pancake\n6. Flip when bubbles form\n7. Cook until golden brown",
    category: "Breakfast",
    cookingTime: 25,
  },
  {
    title: "Greek Salad",
    ingredients: [
      "Cucumber - 1 large",
      "Tomatoes - 4 medium",
      "Red onion - 1",
      "Green bell pepper - 1",
      "Kalamata olives - 1 cup",
      "Feta cheese - 200g",
      "Olive oil - 1/4 cup",
      "Red wine vinegar - 2 tbsp",
      "Dried oregano - 1 tsp",
      "Salt and pepper - to taste",
    ],
    instructions:
      "1. Chop cucumber, tomatoes, onion, and pepper into chunks\n2. Add olives and cubed feta cheese\n3. Mix olive oil, vinegar, oregano, salt, and pepper\n4. Pour dressing over salad\n5. Toss gently and serve",
    category: "Lunch",
    cookingTime: 15,
  },
  {
    title: "Chocolate Brownie",
    ingredients: [
      "Dark chocolate - 200g",
      "Butter - 175g",
      "Sugar - 325g",
      "Eggs - 4",
      "All-purpose flour - 140g",
      "Cocoa powder - 60g",
      "Vanilla extract - 1 tsp",
      "Salt - 1/4 tsp",
    ],
    instructions:
      "1. Melt chocolate and butter together\n2. Whisk sugar and eggs until fluffy\n3. Fold in chocolate mixture\n4. Add flour, cocoa, vanilla, and salt\n5. Pour into lined baking tin\n6. Bake at 180°C for 25 minutes",
    category: "Dessert",
    cookingTime: 40,
  },
  {
    title: "Mushroom Risotto",
    ingredients: [
      "Arborio rice - 2 cups",
      "Mushrooms - 400g",
      "Onion - 1",
      "Garlic - 4 cloves",
      "White wine - 1/2 cup",
      "Vegetable stock - 6 cups",
      "Parmesan cheese - 1/2 cup",
      "Butter - 3 tbsp",
      "Olive oil - 2 tbsp",
      "Thyme - 2 sprigs",
      "Salt and pepper - to taste",
    ],
    instructions:
      "1. Sauté mushrooms until golden, set aside\n2. Cook onion and garlic in butter\n3. Add rice and toast for 2 minutes\n4. Add wine and simmer until absorbed\n5. Add stock gradually, stirring constantly\n6. Stir in mushrooms and parmesan\n7. Season and serve",
    category: "Dinner",
    cookingTime: 45,
  },
  {
    title: "Fish Tacos",
    ingredients: [
      "White fish fillets - 500g",
      "Lime juice - 2 tbsp",
      "Corn tortillas - 8",
      "Cabbage slaw - 2 cups",
      "Avocado - 2",
      "Sour cream - 1/2 cup",
      "Cilantro - 1/2 cup",
      "Taco seasoning - 2 tbsp",
      "Oil - 2 tbsp",
    ],
    instructions:
      "1. Season fish with taco seasoning\n2. Cook fish until flaky\n3. Warm tortillas\n4. Assemble tacos with fish, slaw, and avocado\n5. Top with sour cream and cilantro\n6. Serve with lime wedges",
    category: "Dinner",
    cookingTime: 30,
  },
  {
    title: "Fruit Smoothie Bowl",
    ingredients: [
      "Frozen mixed berries - 2 cups",
      "Banana - 1",
      "Greek yogurt - 1/2 cup",
      "Honey - 2 tbsp",
      "Granola - 1/2 cup",
      "Chia seeds - 2 tbsp",
      "Fresh fruits for topping",
      "Almond milk - 1/4 cup",
    ],
    instructions:
      "1. Blend berries, banana, yogurt, and almond milk\n2. Pour into bowl\n3. Top with granola and chia seeds\n4. Add fresh fruits\n5. Drizzle with honey",
    category: "Breakfast",
    cookingTime: 10,
  },
  {
    title: "Vegetable Lasagna",
    ingredients: [
      "Lasagna noodles - 12 sheets",
      "Zucchini - 2",
      "Spinach - 300g",
      "Ricotta cheese - 500g",
      "Mozzarella - 300g",
      "Marinara sauce - 3 cups",
      "Onion - 1",
      "Garlic - 4 cloves",
      "Italian herbs - 2 tbsp",
      "Salt and pepper - to taste",
    ],
    instructions:
      "1. Cook lasagna noodles\n2. Sauté vegetables with garlic\n3. Mix ricotta with herbs\n4. Layer: sauce, noodles, ricotta, vegetables\n5. Top with mozzarella\n6. Bake at 180°C for 45 minutes",
    category: "Dinner",
    cookingTime: 75,
  },
  {
    title: "Apple Crumble",
    ingredients: [
      "Apples - 6, large",
      "Brown sugar - 1 cup",
      "Flour - 1.5 cups",
      "Butter - 150g",
      "Oats - 1 cup",
      "Cinnamon - 2 tsp",
      "Nutmeg - 1/4 tsp",
      "Salt - 1/4 tsp",
      "Lemon juice - 1 tbsp",
    ],
    instructions:
      "1. Slice apples and toss with lemon juice\n2. Mix flour, oats, sugar, and spices\n3. Cut in butter until crumbly\n4. Layer apples in baking dish\n5. Top with crumble mixture\n6. Bake at 180°C for 45 minutes",
    category: "Dessert",
    cookingTime: 60,
  },
  {
    title: "Caesar Salad",
    ingredients: [
      "Romaine lettuce - 2 heads",
      "Parmesan cheese - 1/2 cup",
      "Croutons - 2 cups",
      "Chicken breast - 2",
      "Eggs - 2",
      "Garlic - 2 cloves",
      "Dijon mustard - 1 tsp",
      "Worcestershire sauce - 1 tsp",
      "Olive oil - 1/2 cup",
      "Lemon juice - 2 tbsp",
      "Anchovy fillets - 4 (optional)",
    ],
    instructions:
      "1. Grill chicken and slice\n2. Make dressing: blend garlic, mustard, anchovies, egg yolks\n3. Slowly whisk in oil\n4. Tear lettuce into bite-size pieces\n5. Toss with dressing\n6. Add chicken, croutons, and parmesan",
    category: "Lunch",
    cookingTime: 30,
  },
  {
    title: "Masala Vadai",
    ingredients: [
      "Chana dal - 1 cup",
      "Onions - 2 medium",
      "Green chilies - 3",
      "Ginger - 1 inch",
      "Curry leaves",
      "Coriander leaves",
      "Salt - to taste",
      "Oil - for deep frying",
    ],
    instructions:
      "1. Soak chana dal for 2 hours\n2. Grind to coarse paste\n3. Add chopped onions, chilies, and herbs\n4. Shape into small patties\n5. Deep fry until golden brown",
    category: "Snacks",
    cookingTime: 30,
  },
  {
    title: "Mysore Bonda",
    ingredients: [
      "Maida flour - 1 cup",
      "Curd - 1/2 cup",
      "Onion - 1 medium",
      "Green chilies - 2",
      "Ginger paste - 1 tsp",
      "Curry leaves",
      "Salt - to taste",
      "Oil - for deep frying",
    ],
    instructions:
      "1. Mix flour, curd to make thick batter\n2. Add chopped onions and spices\n3. Let rest for 30 minutes\n4. Drop spoonfuls in hot oil\n5. Fry until golden",
    category: "Snacks",
    cookingTime: 25,
  },
  {
    title: "Spicy Mixture",
    ingredients: [
      "Besan - 1 cup",
      "Rice flour - 1/2 cup",
      "Peanuts - 1/2 cup",
      "Curry leaves",
      "Red chili powder - 1 tbsp",
      "Turmeric powder - 1/2 tsp",
      "Salt - to taste",
      "Oil - for deep frying",
    ],
    instructions:
      "1. Mix flours with spices\n2. Make small shapes using mould\n3. Fry peanuts separately\n4. Fry flour mixture until crisp\n5. Mix everything when cool",
    category: "Snacks",
    cookingTime: 40,
  },
  {
    title: "Onion Pakoda",
    ingredients: [
      "Besan flour - 1 cup",
      "Onions - 3 large",
      "Green chilies - 3",
      "Rice flour - 2 tbsp",
      "Red chili powder - 1 tsp",
      "Curry leaves",
      "Salt - to taste",
      "Oil - for deep frying",
    ],
    instructions:
      "1. Slice onions thinly\n2. Mix with flours and spices\n3. Make loose batter\n4. Drop in hot oil\n5. Fry until crispy golden",
    category: "Snacks",
    cookingTime: 20,
  },
  {
    title: "Sweet Pongal",
    ingredients: [
      "Raw rice - 1 cup",
      "Moong dal - 1/4 cup",
      "Jaggery - 1 cup",
      "Cardamom powder - 1/4 tsp",
      "Cashews - 10",
      "Raisins - 2 tbsp",
      "Ghee - 4 tbsp",
    ],
    instructions:
      "1. Cook rice and dal together\n2. Melt jaggery separately\n3. Mix with cooked rice-dal\n4. Add cardamom powder\n5. Fry cashews and raisins in ghee\n6. Add to mixture and serve",
    category: "Snacks",
    cookingTime: 35,
  },
];

const seedDatabase = async () => {
  let connection;
  try {
    console.log("Attempting to connect to MongoDB...");
    connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    console.log("Attempting to clear existing test user...");
    await User.deleteOne({ email: "test@example.com" });
    console.log("Cleared existing test user");

    console.log("Creating new test user...");
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    });

    const savedUser = await testUser.save();
    console.log("Created test user with ID:", savedUser._id);

    console.log("Clearing existing recipes...");
    await Recipe.deleteMany({});
    console.log("Cleared existing recipes");

    console.log("Preparing recipes with user ID...");
    const recipesWithUser = sampleRecipes.map((recipe) => ({
      ...recipe,
      user: savedUser._id,
    }));

    console.log("Inserting recipes...");
    const insertedRecipes = await Recipe.insertMany(recipesWithUser);
    console.log(`Successfully seeded ${insertedRecipes.length} recipes`);
  } catch (error) {
    console.error("Error in seed process:", error);
    throw error;
  } finally {
    if (connection) {
      console.log("Closing database connection...");
      await mongoose.connection.close();
      console.log("Database connection closed");
    }
  }
};

// Main execution
const main = async () => {
  try {
    await seedDatabase();
    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
};
main();

export default seedDatabase;
