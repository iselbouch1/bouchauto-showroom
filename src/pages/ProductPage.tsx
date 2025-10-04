import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { toast } from "sonner";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", product?.categoryIds],
    queryFn: () => getProducts({ 
      category: product?.categoryIds[0],
      visible: true 
    }),
    enabled: !!product?.categoryIds[0],
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Produit introuvable</h1>
        <p className="text-muted-foreground mb-6">Ce produit n'existe pas.</p>
        <Link to="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    );
  }

  const filteredRelated = relatedProducts
    .filter(p => p.id !== product.id && p.isVisible)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 animate-fade-in">
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={product.images[selectedImage]?.url || "/placeholder.svg"}
              alt={product.images[selectedImage]?.alt || product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-accent scale-95"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${product.name} - vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-accent">
                Nouveau
              </Badge>
            )}
            {product.isFeatured && (
              <Badge variant="secondary">
                Populaire
              </Badge>
            )}
            {product.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
            {product.shortDescription && (
              <p className="text-xl text-muted-foreground">
                {product.shortDescription}
              </p>
            )}
          </div>

          {/* Share button */}
          <Button variant="outline" onClick={handleShare} className="w-full sm:w-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>

          {/* Description */}
          {product.description && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start gap-4 py-2 border-b border-border last:border-0">
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span className="text-right font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {filteredRelated.length > 0 && (
        <section className="pt-16 border-t border-border animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Produits similaires</h2>
          <ProductGrid products={filteredRelated} />
        </section>
      )}
    </div>
  );
};

export default ProductPage;
