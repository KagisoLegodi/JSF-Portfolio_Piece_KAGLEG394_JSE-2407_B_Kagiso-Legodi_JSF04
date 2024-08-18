export const filterProducts = (products, category, sort) => {
  let filtered = products;

  // Filter by category if a category is selected
  if (category) {
    filtered = filtered.filter((product) => product.category === category);
  }

  // Sort by price based on the selected sorting option
  if (sort === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "default" || !sort) {
    // Revert to the default sorting order (original order of products)
    filtered = [...products]; // Returning the original unsorted array
  }

  return filtered;
};
