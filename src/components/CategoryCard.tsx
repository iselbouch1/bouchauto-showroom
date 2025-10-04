import { Category } from "@/types";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card className="group relative overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
        {/* Background image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl mb-1 group-hover:text-accent transition-colors">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
            <ChevronRight className="h-6 w-6 text-accent transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
