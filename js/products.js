const optionsByCategory = {
  coffee: {
    sizes: [
      { key: "S", label: "200 ml", extraPrice: 0 },
      { key: "M", label: "300 ml", extraPrice: 0.5 },
      { key: "L", label: "400 ml", extraPrice: 1 },
    ],
    additives: [
      { key: "1", label: "Sugar", extraPrice: 0.5 },
      { key: "2", label: "Cinnamon", extraPrice: 0.5 },
      { key: "3", label: "Syrup", extraPrice: 0.5 },
    ],
  },
  tea: {
    sizes: [
      { key: "S", label: "200 ml", extraPrice: 0 },
      { key: "M", label: "300 ml", extraPrice: 0.5 },
      { key: "L", label: "400 ml", extraPrice: 1 },
    ],
    additives: [
      { key: "1", label: "Sugar", extraPrice: 0.5 },
      { key: "2", label: "Lemon", extraPrice: 0.5 },
      { key: "3", label: "Syrup", extraPrice: 0.5 },
    ],
  },
  dessert: {
    sizes: [
      { key: "S", label: "50 g", extraPrice: 0 },
      { key: "M", label: "100 g", extraPrice: 0.5 },
      { key: "L", label: "200 g", extraPrice: 1 },
    ],
    additives: [
      { key: "1", label: "Berries", extraPrice: 0.5 },
      { key: "2", label: "Nuts", extraPrice: 0.5 },
      { key: "3", label: "Jam", extraPrice: 0.5 },
    ],
  },
};

const productSources = {
  coffee: [
    ["Irish coffee", "Fragrant black coffee with Jameson Irish whiskey and whipped milk.", 7],
    ["Kahlua coffee", "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk.", 7],
    ["Honey raf", "Espresso with frothed milk, cream and aromatic honey.", 5.5],
    ["Ice cappuccino", "Cappuccino with soft thick foam in summer version with ice.", 5],
    ["Espresso", "Classic black coffee made from freshly ground coffee beans.", 4.5],
    ["Latte", "Espresso coffee with the addition of steamed milk and dense milk foam.", 5.5],
    ["Latte macchiato", "Espresso with frothed milk and chocolate syrup.", 5.5],
    ["Coffee with cognac", "Fragrant black coffee with cognac and whipped cream.", 6.5],
  ],
  tea: [
    ["Moroccan", "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint.", 4.5],
    ["Ginger", "Original black tea with fresh ginger, lemon and honey.", 5],
    ["Cranberry", "Invigorating black tea with cranberry and honey.", 5],
    ["Sea buckthorn", "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon.", 5.5],
  ],
  dessert: [
    ["Marble cheesecake", "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam.", 3.5],
    ["Red velvet", "Layer cake with cream cheese frosting.", 4],
    ["Cheesecakes", "Soft cottage cheese pancakes with sour cream and fresh berries.", 4.5],
    ["Creme brulee", "Delicate creamy dessert in a caramel basket with wild berries.", 4],
    ["Pancakes", "Tender pancakes with strawberry jam and fresh strawberries.", 4.5],
    ["Honey cake", "Classic honey cake with delicate sour cream.", 4.5],
    ["Chocolate cake", "Cake with hot chocolate filling and nuts with dried apricots.", 5.5],
    ["Black forest", "A combination of thin sponge cake with cherry jam and light chocolate mousse.", 6.5],
  ],
};

export const products = Object.entries(productSources).flatMap(
  ([category, items]) =>
    items.map(([name, description, price], index) => ({
      id: `${category}-${index + 1}`,
      category,
      name,
      description,
      price,
      image: new URL(
        `../assets/images/${category}-${index + 1}.${category === "coffee" ? "jpg" : "png"}`,
        import.meta.url,
      ).href,
      sizes: optionsByCategory[category].sizes,
      additives: optionsByCategory[category].additives,
    })),
);
