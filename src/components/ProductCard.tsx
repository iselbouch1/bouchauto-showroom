import { Product } from "@/types";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const coverImage = product.images.find(img => img.isCover) || product.images[0];

  return (
    <Link to={`/produits/${product.slug}`}>
      <Card className="group overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={coverImage?.url || "/placeholder.svg"}
            alt={coverImage?.alt || product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.isNew && (
              <Badge variant="default" className="bg-accent text-accent-foreground">
                Nouveau
              </Badge>
            )}
            {product.isFeatured && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Populaire
              </Badge>
            )}
            {product.tags?.includes("best-seller") && (
              <Badge variant="outline" className="bg-card/90 backdrop-blur">
                Best-seller
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          
          {product.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.shortDescription}
            </p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
