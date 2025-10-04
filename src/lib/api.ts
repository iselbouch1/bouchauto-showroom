import { Category, Product, ApiFilters } from "@/types";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

// Mock mode flag - set to false when API is ready
const USE_MOCK = true;

// API base URL from environment (for future use)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Generic fetch wrapper for API calls
 */
async function fetchJson<T>(path: string, params?: URLSearchParams): Promise<T> {
  const url = params ? `${API_BASE_URL}${path}?${params.toString()}` : `${API_BASE_URL}${path}`;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Mock delay to simulate network latency
 */
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300));

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK) {
    await mockDelay();
    return categoriesData as Category[];
  }
  
  return fetchJson<Category[]>("/api/v1/categories");
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (USE_MOCK) {
    await mockDelay();
    const category = categoriesData.find(c => c.slug === slug);
    return category ? (category as Category) : null;
  }
  
  return fetchJson<Category>(`/api/v1/categories/${slug}`);
}

/**
 * Get all products with optional filters
 */
export async function getProducts(filters?: ApiFilters): Promise<Product[]> {
  if (USE_MOCK) {
    await mockDelay();
    let filtered = [...productsData] as Product[];

    // Apply filters
    if (filters?.visible !== undefined) {
      filtered = filtered.filter(p => p.isVisible === filters.visible);
    }
    if (filters?.featured) {
      filtered = filtered.filter(p => p.isFeatured);
    }
    if (filters?.category) {
      filtered = filtered.filter(p => p.categoryIds.includes(filters.category!));
    }
    if (filters?.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p => 
        p.tags?.some(tag => filters.tags!.includes(tag))
      );
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.shortDescription?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    filtered.sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));

    // Pagination
    if (filters?.page && filters?.perPage) {
      const start = (filters.page - 1) * filters.perPage;
      const end = start + filters.perPage;
      filtered = filtered.slice(start, end);
    }

    return filtered;
  }

  // Build query params for real API
  const params = new URLSearchParams();
  if (filters?.search) params.append("search", filters.search);
  if (filters?.category) params.append("category", filters.category);
  if (filters?.tags) filters.tags.forEach(tag => params.append("tags[]", tag));
  if (filters?.visible !== undefined) params.append("visible", filters.visible ? "1" : "0");
  if (filters?.featured) params.append("featured", "1");
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.perPage) params.append("per_page", filters.perPage.toString());

  return fetchJson<Product[]>("/api/v1/products", params);
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    await mockDelay();
    const product = productsData.find(p => p.slug === slug);
    return product ? (product as Product) : null;
  }
  
  return fetchJson<Product>(`/api/v1/products/${slug}`);
}

/**
 * Get featured/new products for homepage
 */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (USE_MOCK) {
    await mockDelay();
    return (productsData as Product[])
      .filter(p => p.isVisible && p.isFeatured)
      .slice(0, limit);
  }

  const params = new URLSearchParams({
    visible: "1",
    featured: "1",
    per_page: limit.toString(),
  });

  return fetchJson<Product[]>("/api/v1/products", params);
}

/**
 * Get new products for homepage
 */
export async function getNewProducts(limit = 6): Promise<Product[]> {
  if (USE_MOCK) {
    await mockDelay();
    return (productsData as Product[])
      .filter(p => p.isVisible && p.isNew)
      .slice(0, limit);
  }

  const params = new URLSearchParams({
    visible: "1",
    new: "1",
    per_page: limit.toString(),
  });

  return fetchJson<Product[]>("/api/v1/products", params);
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  return getProducts({ search: query, visible: true });
}
