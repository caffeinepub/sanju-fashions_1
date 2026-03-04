import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllProducts,
  useFeaturedProducts,
  useSubmitInquiry,
} from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Layers,
  Loader2,
  Menu,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Product } from "./backend.d";

// Runtime category constants (mirroring the backend Category enum)
const Category = {
  everydayElegance: "everydayElegance",
  festive: "festive",
  casual: "casual",
} as const;
type CategoryValue = (typeof Category)[keyof typeof Category];

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function categoryLabel(cat: CategoryValue): string {
  switch (cat) {
    case Category.festive:
      return "Festive";
    case Category.casual:
      return "Casual";
    case Category.everydayElegance:
      return "Everyday Elegance";
    default:
      return "Collection";
  }
}

function categoryImage(cat: CategoryValue): string {
  switch (cat) {
    case Category.festive:
      return "/assets/generated/collection-festive.dim_600x750.jpg";
    case Category.casual:
      return "/assets/generated/collection-casual.dim_600x750.jpg";
    case Category.everydayElegance:
      return "/assets/generated/collection-elegant.dim_600x750.jpg";
    default:
      return "/assets/generated/collection-elegant.dim_600x750.jpg";
  }
}

function categoryBadgeClass(cat: CategoryValue): string {
  switch (cat) {
    case Category.festive:
      return "bg-orange-100 text-orange-800 border-orange-200";
    case Category.casual:
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case Category.everydayElegance:
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-amber-100 text-amber-800 border-amber-200";
  }
}

// ── Navigation ────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", ocid: "nav.home_link" },
    {
      label: "Collections",
      href: "#collections",
      ocid: "nav.collections_link",
    },
    { label: "About", href: "#about", ocid: "nav.about_link" },
    { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex-shrink-0">
          <img
            src="/assets/generated/sanju-logo-transparent.dim_400x150.png"
            alt="Sanju Fashions"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.ocid}
              href={link.href}
              data-ocid={link.ocid}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-burgundy ${
                scrolled ? "text-foreground" : "text-white drop-shadow"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`px-5 py-2 text-sm font-medium rounded-full border transition-all ${
              scrolled
                ? "border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
                : "border-white text-white hover:bg-white/20"
            }`}
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`md:hidden p-2 rounded-md ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border px-6 pb-6 pt-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.ocid}
                href={link.href}
                data-ocid={link.ocid}
                className="text-foreground font-medium text-base py-1 hover:text-burgundy transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-2 px-5 py-2.5 text-sm font-medium rounded-full border border-burgundy text-burgundy hover:bg-burgundy hover:text-white text-center transition-all"
              onClick={() => {
                setOpen(false);
                window.location.hash = "#contact";
              }}
            >
              Enquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1200x700.jpg')",
        }}
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy/30 via-transparent to-transparent" />

      {/* Decorative border frame */}
      <div className="absolute inset-6 md:inset-10 border border-white/15 rounded-none pointer-events-none" />
      <div className="absolute inset-8 md:inset-12 border border-white/8 rounded-none pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Ornamental top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-amber-300/70" />
          <span className="text-amber-300 text-xs tracking-[0.35em] uppercase font-body font-medium">
            Premium Indian Fashion
          </span>
          <span className="h-px w-12 bg-amber-300/70" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          Style That
          <br />
          <span className="text-amber-300 italic">Defines You</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white/80 text-lg md:text-xl font-body mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Trendy designs, premium feel, and a comfortable fit — curated for the
          modern Indian woman who deserves to feel beautiful every day.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#collections">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold px-8 py-3 rounded-full text-base shadow-xl shadow-amber-900/30 transition-all hover:scale-105"
            >
              <Sparkles size={18} className="mr-2" />
              Explore Collections
            </Button>
          </a>
          <a href="#about">
            <Button
              variant="outline"
              size="lg"
              className="border-white/50 text-white bg-white/10 hover:bg-white/20 rounded-full px-8 py-3 text-base backdrop-blur-sm"
            >
              Our Story
            </Button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 flex items-center justify-center gap-10 md:gap-16 text-white/70"
        >
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "3", label: "Collections" },
            { value: "100%", label: "Quality Promise" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl font-bold text-white">
                {value}
              </div>
              <div className="text-xs tracking-wide mt-0.5 font-body">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.8,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronRight size={24} className="text-white/50 rotate-90" />
      </motion.div>
    </section>
  );
}

// ── Collections Section ───────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    key: "festive",
    ocid: "collections.festive_card",
    title: "Festive Collection",
    subtitle: "Radiate Joy",
    description:
      "Dazzling outfits for Diwali, Eid, weddings & every celebration. Rich embroidery, vibrant hues, and regal silhouettes.",
    image: "/assets/generated/collection-festive.dim_600x750.jpg",
    accent: "from-orange-900/80 to-red-900/60",
    badge: "New Arrivals",
  },
  {
    key: "casual",
    ocid: "collections.casual_card",
    title: "Casual Wear",
    subtitle: "Effortless Style",
    description:
      "Everyday looks that feel as good as they look. Comfortable fabrics meet modern silhouettes for the woman on the go.",
    image: "/assets/generated/collection-casual.dim_600x750.jpg",
    accent: "from-emerald-900/80 to-teal-900/60",
    badge: "Bestsellers",
  },
  {
    key: "elegant",
    ocid: "collections.elegant_card",
    title: "Everyday Elegance",
    subtitle: "Quietly Luxurious",
    description:
      "Understated refinement for offices, brunches, and evening outings. Timeless pieces that earn compliments without trying.",
    image: "/assets/generated/collection-elegant.dim_600x750.jpg",
    accent: "from-purple-900/80 to-violet-900/60",
    badge: "Trending",
  },
];

function CollectionsSection() {
  return (
    <section id="collections" className="py-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-amber-700 font-body font-medium mb-3">
          Curated For You
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Our Collections
        </h2>
        <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
          Three distinct worlds of fashion — each telling a different story of
          beauty, confidence, and self-expression.
        </p>
        <div className="ornament-divider max-w-xs mx-auto mt-6">
          <span className="text-amber-500 text-lg">✦</span>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.key}
            data-ocid={col.ocid}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ aspectRatio: "4/5" }}
          >
            {/* Background image */}
            <img
              src={col.image}
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              style={{
                transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${col.accent} opacity-60 group-hover:opacity-75 transition-opacity duration-300`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-amber-400 text-stone-900 text-xs font-semibold font-body px-3 py-1 rounded-full">
                {col.badge}
              </span>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <p className="text-amber-300 text-xs tracking-widest uppercase font-body mb-1">
                {col.subtitle}
              </p>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {col.title}
              </h3>
              <p className="text-white/75 text-sm font-body leading-relaxed mb-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {col.description}
              </p>
              <a href="#all-products">
                <Button
                  size="sm"
                  className="bg-white/15 hover:bg-amber-400 hover:text-stone-900 text-white border border-white/30 backdrop-blur-sm rounded-full transition-all duration-300 text-xs font-semibold w-fit"
                >
                  Shop Now <ChevronRight size={14} className="ml-1" />
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    toast.success(`${product.name} added to cart!`, {
      description: "We'll notify you when it's ready.",
    });
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <motion.div
      data-ocid={`products.item.${index}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-stone-200/80 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={categoryImage(product.category as CategoryValue)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-amber-400 text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-display font-semibold text-foreground text-base leading-snug line-clamp-2">
            {product.name}
          </h4>
          <span
            className={`flex-shrink-0 text-[10px] font-semibold border px-2.5 py-0.5 rounded-full font-body ${categoryBadgeClass(product.category as CategoryValue)}`}
          >
            {categoryLabel(product.category as CategoryValue)}
          </span>
        </div>

        <p className="text-muted-foreground text-xs font-body leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-burgundy">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={`rounded-full text-xs font-semibold transition-all duration-300 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-burgundy hover:bg-amber-500 text-white hover:text-stone-900"
            }`}
          >
            {added ? (
              <>
                <CheckCircle size={13} className="mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={13} className="mr-1" /> Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full shimmer" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4 shimmer" />
        <Skeleton className="h-3 w-full shimmer" />
        <Skeleton className="h-3 w-1/2 shimmer" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-20 shimmer" />
          <Skeleton className="h-8 w-24 shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── Featured Products ─────────────────────────────────────────────────────────

function FeaturedProductsSection() {
  const { data: products, isLoading, isError } = useFeaturedProducts();

  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-amber-700 font-body font-medium mb-3">
            Handpicked
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Pieces
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Our most-loved styles, selected for their beauty, quality, and
            customer love.
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-amber-500 text-lg">✦</span>
          </div>
        </motion.div>

        {isLoading && (
          <div
            data-ocid="products.loading_state"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {Array.from({ length: 4 }, (_, i) => `sk-featured-${i}`).map(
              (id) => (
                <ProductSkeleton key={id} />
              ),
            )}
          </div>
        )}

        {isError && (
          <div
            data-ocid="products.error_state"
            className="text-center py-12 text-muted-foreground"
          >
            <AlertCircle className="mx-auto mb-3 text-destructive" size={32} />
            <p>Unable to load products. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && products && products.length === 0 && (
          <div
            data-ocid="products.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            <Heart
              className="mx-auto mb-4 text-muted-foreground/50"
              size={40}
            />
            <p className="font-display text-xl mb-2">Coming Soon</p>
            <p className="text-sm">
              Our featured collection is being curated with love.
            </p>
          </div>
        )}

        {!isLoading && products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── All Products with Filter ──────────────────────────────────────────────────

type FilterTab = "all" | CategoryValue;

function AllProductsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const { data: products, isLoading, isError } = useAllProducts();

  const filtered =
    products?.filter((p) =>
      activeFilter === "all" ? true : (p.category as string) === activeFilter,
    ) ?? [];

  const tabs: { label: string; value: FilterTab; ocid: string }[] = [
    { label: "All", value: "all", ocid: "products.all_tab" },
    { label: "Festive", value: Category.festive, ocid: "products.festive_tab" },
    { label: "Casual", value: Category.casual, ocid: "products.casual_tab" },
    {
      label: "Everyday Elegance",
      value: Category.everydayElegance,
      ocid: "products.elegant_tab",
    },
  ];

  return (
    <section id="all-products" className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-amber-700 font-body font-medium mb-3">
          Browse
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          All Products
        </h2>
        <div className="ornament-divider max-w-xs mx-auto mt-4">
          <span className="text-amber-500 text-lg">✦</span>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.value}
            data-ocid={tab.ocid}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold font-body border transition-all duration-200 ${
              activeFilter === tab.value
                ? "bg-burgundy text-white border-burgundy shadow-sm"
                : "bg-background text-foreground border-border hover:border-burgundy hover:text-burgundy"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {isLoading && (
        <div
          data-ocid="products.loading_state"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {Array.from({ length: 8 }, (_, i) => `sk-all-${i}`).map((id) => (
            <ProductSkeleton key={id} />
          ))}
        </div>
      )}

      {isError && (
        <div
          data-ocid="products.error_state"
          className="text-center py-12 text-muted-foreground"
        >
          <AlertCircle className="mx-auto mb-3 text-destructive" size={32} />
          <p>Unable to load products. Please try again.</p>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div
          data-ocid="products.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <Layers className="mx-auto mb-4 text-muted-foreground/50" size={40} />
          <p className="font-display text-xl mb-2">
            No items in this collection yet
          </p>
          <p className="text-sm">
            Check back soon — new pieces arrive every week.
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i + 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}

// ── Brand Values ──────────────────────────────────────────────────────────────

const BRAND_VALUES = [
  {
    icon: Sparkles,
    title: "Trendy Designs",
    desc: "Inspired by runways, Instagram, and what real women are wearing — refreshed every season.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Star,
    title: "Premium Feel",
    desc: "Carefully selected fabrics and craftsmanship that look and feel expensive without the price tag.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Heart,
    title: "Comfortable Fit",
    desc: "Fashion that moves with you. Every silhouette is designed for real women with real bodies.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Tag,
    title: "Budget-Friendly",
    desc: "Premium boutique style at prices that let you refresh your wardrobe without guilt.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

function BrandValuesSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-stone-900 via-[oklch(0.28_0.08_30)] to-stone-900 overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_left,oklch(0.78_0.14_72)_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.78_0.14_72)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-amber-400 font-body font-medium mb-3">
            Why Sanju Fashions
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            The Sanju Promise
          </h2>
          <p className="text-white/60 font-body max-w-xl mx-auto">
            Four pillars that every piece in our collection must honour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
              <div
                className={`${v.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
              >
                <v.icon className={v.color} size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {v.title}
              </h3>
              <p className="text-white/55 text-sm font-body leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <img
                  src="/assets/generated/collection-festive.dim_600x750.jpg"
                  alt="Festive collection"
                  className="w-full rounded-2xl object-cover aspect-[3/4]"
                />
              </div>
              <div className="space-y-3 pt-8">
                <img
                  src="/assets/generated/collection-elegant.dim_600x750.jpg"
                  alt="Elegant collection"
                  className="w-full rounded-2xl object-cover aspect-[3/4]"
                />
              </div>
            </div>
            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-900 rounded-2xl px-5 py-3 shadow-xl font-body text-sm font-semibold whitespace-nowrap"
            >
              ✦ Style That Defines You
            </motion.div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-amber-700 font-body font-medium mb-4">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Born From a
              <br />
              <span className="italic text-burgundy">Simple Belief</span>
            </h2>

            <div className="space-y-4 text-foreground/75 font-body text-base leading-relaxed">
              <p>
                Sanju Fashions was born from a simple belief — every woman
                deserves to feel confident, elegant, and beautiful in what she
                wears.
              </p>
              <p>
                What started as a small dream to bring stylish, affordable
                fashion to every home soon became a growing brand inspired by
                real women, real occasions, and real emotions.
              </p>
              <p>
                We noticed something important — fashion trends change fast, but
                comfort, quality, and confidence never go out of style. That's
                where Sanju Fashions found its purpose.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-display text-xl italic text-foreground mb-6 leading-relaxed">
                "We are not just selling clothes. We are helping women express
                their personality."
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Modern Indian Women",
                  "Festive Traditions",
                  "Everyday Elegance",
                  "Social Media Trends",
                  "Boutique Quality",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-body font-medium px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const { mutate, isPending, isError, reset } = useSubmitInquiry();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    reset();
    mutate(form, {
      onSuccess: (ok) => {
        if (ok) {
          setSuccess(true);
          setForm({ name: "", email: "", message: "" });
          toast.success("Your inquiry has been sent!", {
            description: "We'll get back to you within 24 hours.",
          });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
      onError: () => {
        toast.error("Unable to send your inquiry. Please try again.");
      },
    });
  }

  return (
    <section id="contact" className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-amber-700 font-body font-medium mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us –
            <br />
            <span className="italic text-burgundy">Sanju Fashions</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Have a question about size, price, or availability? We're happy to
            help you!
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-amber-500 text-lg">✦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* WhatsApp */}
            <div className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm mb-0.5">
                  Phone / WhatsApp
                </p>
                <a
                  href="https://wa.me/918143208982"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_link"
                  className="text-emerald-700 font-body font-semibold text-base hover:underline"
                >
                  8143208982
                </a>
                <p className="text-muted-foreground text-xs font-body mt-1">
                  Message us on WhatsApp for faster replies
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📸</span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm mb-0.5">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/SANJU_FASHIONS_777"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.instagram_link"
                  className="text-pink-700 font-body font-semibold text-base hover:underline"
                >
                  @SANJU_FASHIONS_777
                </a>
                <p className="text-muted-foreground text-xs font-body mt-1">
                  DM us on Instagram for faster replies
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⏰</span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm mb-0.5">
                  Working Hours
                </p>
                <p className="text-foreground font-body font-semibold text-sm">
                  Monday – Sunday
                </p>
                <p className="text-foreground font-body font-semibold text-sm">
                  10:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            {/* Quick Support note */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-xs font-body leading-relaxed">
                <span className="font-semibold">Quick Support:</span> Message us
                anytime on WhatsApp or Instagram DM for faster replies.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="font-body text-sm font-medium"
                >
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.input"
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="font-body"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contact-email"
                  className="font-body text-sm font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  data-ocid="contact.email_input"
                  type="email"
                  placeholder="priya@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  className="font-body"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contact-message"
                  className="font-body text-sm font-medium"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  placeholder="Tell us what you're looking for..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  rows={4}
                  className="font-body resize-none"
                />
              </div>

              {/* States */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm font-body"
                  >
                    <CheckCircle size={16} /> Your message has been sent! We'll
                    be in touch soon.
                  </motion.div>
                )}
                {isError && (
                  <motion.div
                    data-ocid="contact.error_state"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm font-body"
                  >
                    <AlertCircle size={16} /> Something went wrong. Please try
                    again.
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending}
                className="w-full bg-burgundy hover:bg-amber-500 hover:text-stone-900 text-white font-semibold font-body py-3 rounded-xl text-base transition-all duration-200"
              >
                {isPending ? (
                  <span
                    data-ocid="contact.loading_state"
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </span>
                ) : (
                  "Send Message ✦"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Instagram Follow Section ──────────────────────────────────────────────────

function InstagramSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
            <Instagram size={30} className="text-white" />
          </div>

          <p className="text-sm tracking-[0.3em] uppercase text-pink-600 font-body font-medium mb-3">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto mb-3 leading-relaxed">
            Stay updated with our latest collections, new arrivals, and
            exclusive offers.
          </p>
          <p className="text-pink-600 font-body font-semibold text-lg mb-8">
            @SANJU_FASHIONS_777
          </p>

          <a
            href="https://instagram.com/SANJU_FASHIONS_777"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="instagram.follow_button"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:via-rose-600 hover:to-amber-600 text-white font-semibold px-10 py-3 rounded-full text-base shadow-xl shadow-pink-200/50 transition-all hover:scale-105"
            >
              <Instagram size={18} className="mr-2" />
              Follow on Instagram
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/sanju-logo-transparent.dim_400x150.png"
              alt="Sanju Fashions"
              className="h-10 w-auto object-contain mb-3 brightness-[1.3]"
            />
            <p className="text-white/55 text-sm font-body leading-relaxed mb-4">
              Every woman deserves to feel confident, elegant, and beautiful in
              what she wears.
            </p>
            <p className="font-display text-amber-400 italic text-sm">
              Style That Defines You.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "#home" },
                { label: "Collections", href: "#collections" },
                { label: "Featured Pieces", href: "#all-products" },
                { label: "About Us", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-amber-400 text-sm font-body transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Values */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com/SANJU_FASHIONS_777"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-ocid="footer.instagram_link"
                className="w-10 h-10 rounded-full bg-white/8 hover:bg-pink-400/20 border border-white/10 hover:border-pink-400/50 flex items-center justify-center text-white/70 hover:text-pink-400 transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/8 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 flex items-center justify-center text-white/70 hover:text-amber-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <p className="text-white/40 text-xs font-body leading-relaxed">
              Made with love for every woman — from Indian streets to your
              wardrobe.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40 font-body">
          <p>© {year} Sanju Fashions. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/70 hover:text-amber-400 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <CollectionsSection />
        <FeaturedProductsSection />
        <AllProductsSection />
        <BrandValuesSection />
        <AboutSection />
        <ContactSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
