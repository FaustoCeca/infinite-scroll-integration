

export const fetchProducts = async (
    {pageParam}: {pageParam?: number}
) => {
    const response = await fetch(`http://localhost:3000/api/products/paginated?page=${pageParam || 1}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}