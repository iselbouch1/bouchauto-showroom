import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BA</span>
              </div>
              <span className="font-bold text-xl">Bouch Auto</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Votre boutique d'accessoires et décorations automobiles premium.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/categories/interieur" className="text-muted-foreground hover:text-accent transition-colors">
                  Intérieur
                </Link>
              </li>
              <li>
                <Link to="/categories/exterieur" className="text-muted-foreground hover:text-accent transition-colors">
                  Extérieur
                </Link>
              </li>
              <li>
                <Link to="/categories/eclairage" className="text-muted-foreground hover:text-accent transition-colors">
                  Éclairage
                </Link>
              </li>
              <li>
                <Link to="/categories/tech-audio" className="text-muted-foreground hover:text-accent transition-colors">
                  Tech & Audio
                </Link>
              </li>
              <li>
                <Link to="/categories/entretien" className="text-muted-foreground hover:text-accent transition-colors">
                  Entretien
                </Link>
              </li>
              <li>
                <Link to="/categories/securite" className="text-muted-foreground hover:text-accent transition-colors">
                  Sécurité
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/a-propos" className="text-muted-foreground hover:text-accent transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-muted-foreground hover:text-accent transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-muted-foreground hover:text-accent transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@bouchauto.fr" className="hover:text-accent transition-colors">
                  contact@bouchauto.fr
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+33123456789" className="hover:text-accent transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bouch Auto. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
