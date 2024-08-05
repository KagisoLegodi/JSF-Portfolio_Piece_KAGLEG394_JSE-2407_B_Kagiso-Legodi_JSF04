export const filterProducts = (products, selectedCategory, sortOrder) => {
    return products
      .filter(product => (selectedCategory ? product.category === selectedCategory : true))
      .sort((a, b) => {
        if (sortOrder === 'low-to-high') return a.price - b.price;
        if (sortOrder === 'high-to-low') return b.price - a.price;
        return 0;
      });
  };
  
  export const fetchCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    return await res.json();
  };
  