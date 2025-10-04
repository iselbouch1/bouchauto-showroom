import { Search, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-xl">BA</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">Bouch Auto</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-muted"
            />
          </div>
        </form>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/categories/interieur" className="text-sm font-medium hover:text-accent transition-colors">
            Intérieur
          </Link>
          <Link to="/categories/exterieur" className="text-sm font-medium hover:text-accent transition-colors">
            Extérieur
          </Link>
          <Link to="/categories/eclairage" className="text-sm font-medium hover:text-accent transition-colors">
            Éclairage
          </Link>
          <Link to="/categories/tech-audio" className="text-sm font-medium hover:text-accent transition-colors">
            Tech & Audio
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile search */}
      <div className="md:hidden border-t border-border/40 p-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-muted"
            />
          </div>
        </form>
      </div>
    </header>
  );
};
