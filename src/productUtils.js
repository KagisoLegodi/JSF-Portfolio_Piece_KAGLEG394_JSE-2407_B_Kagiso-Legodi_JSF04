// This function filters products by category and sorts them by price
export const filterProducts = (products, category, sort) => {
  let filtered = products;

  // Filter by category if a category is selected
  if (category) {
    filtered = filtered.filter((product) => product.category === category);
  }

  // Sort by price based on the selected sorting option
  if (sort === "default" || !sort) {
    // Revert to the default sorting order (original order of products)
    filtered = [...products]; // Returning the original unsorted array
  } else if (sort === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
};

// Add this function to fetch product categories from the API
export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
