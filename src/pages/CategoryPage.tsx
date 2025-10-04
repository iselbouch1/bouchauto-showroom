import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug, getProducts } from "@/lib/api";
import { ProductGrid } from "@/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug!),
    enabled: !!slug,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProducts({ category: category?.id, visible: true }),
    enabled: !!category?.id,
  });

  if (categoryLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-96 mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Catégorie introuvable</h1>
        <p className="text-muted-foreground">Cette catégorie n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground max-w-3xl">
            {category.description}
          </p>
        )}
        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{products.length} produit{products.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Products Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      ) : (
        <div className="animate-fade-in">
          <ProductGrid 
            products={products} 
            emptyMessage="Aucun produit dans cette catégorie pour le moment."
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
