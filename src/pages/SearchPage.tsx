import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/lib/api";
import { ProductGrid } from "@/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
          <h1 className="text-4xl font-bold">Résultats de recherche</h1>
        </div>
        
        {query && (
          <p className="text-lg text-muted-foreground">
            Recherche pour "{query}" - {products.length} résultat{products.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      ) : (
        <div className="animate-fade-in">
          <ProductGrid 
            products={products}
            emptyMessage={
              query 
                ? `Aucun produit trouvé pour "${query}". Essayez avec d'autres mots-clés.`
                : "Entrez un terme de recherche pour trouver des produits."
            }
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
