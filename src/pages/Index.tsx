import { useQuery } from "@tanstack/react-query";
import { getCategories, getFeaturedProducts, getNewProducts } from "@/lib/api";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: featuredProducts = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getFeaturedProducts(8),
  });

  const { data: newProducts = [] } = useQuery({
    queryKey: ["new-products"],
    queryFn: () => getNewProducts(4),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Nouveauté - Collection 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Sublimez votre
              <span className="block text-accent">automobile</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Découvrez notre sélection premium d'accessoires et décorations pour personnaliser votre véhicule avec style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                Découvrir le catalogue
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                Voir les nouveautés
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* New Products Section */}
      {newProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Nouveautés</h2>
              <p className="text-muted-foreground">Les derniers produits ajoutés à notre catalogue</p>
            </div>
          </div>
          <ProductGrid products={newProducts} />
        </section>
      )}

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Explorez nos catégories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement ce que vous cherchez parmi notre large gamme d'accessoires automobiles
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/30 py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Produits populaires</h2>
              <p className="text-muted-foreground">Les coups de cœur de nos clients</p>
            </div>
            <Link to="/categories/interieur">
              <Button variant="outline" className="group">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à personnaliser votre véhicule ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Parcourez notre catalogue complet et trouvez les accessoires parfaits pour votre style
            </p>
            <Button size="lg" variant="secondary" className="group">
              Explorer le catalogue
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
