import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { 
  Image, 
  ShoppingCart, 
  TrendingUp, 
  Users,
  Crown,
  Palette,
  Gamepad2,
  Star
} from "lucide-react";
import { useEffect, useRef, useState, useCallback, MouseEvent } from "react";
import { Heart } from "lucide-react";

const nftCollections = [
  {
    id: 1,
    name: "CyberWarriors",
    floorPrice: "2.5 ETH",
    volume: "156 ETH",
    items: "10,000",
    image: "⚔️",
    category: "Gaming"
  },
  {
    id: 2,
    name: "Digital Artifacts",
    floorPrice: "0.8 ETH", 
    volume: "89 ETH",
    items: "5,000",
    image: "🏺",
    category: "Art"
  },
  {
    id: 3,
    name: "Quantum Vehicles",
    floorPrice: "1.2 ETH",
    volume: "234 ETH", 
    items: "3,000",
    image: "🚗",
    category: "Gaming"
  },
  {
    id: 4,
    name: "MetaLands",
    floorPrice: "4.1 ETH",
    volume: "445 ETH",
    items: "1,000", 
    image: "🏝️",
    category: "Virtual Real Estate"
  }
];

const featuredNFTs = [
  {
    id: 1,
    name: "Legendary Sword #001",
    price: "12.5 ETH",
    seller: "CryptoWarrior",
    image: "⚔️",
    rarity: "Legendary",
    isNew: true
  },
  {
    id: 2,
    name: "Cyberpunk Avatar #456",
    price: "3.2 ETH", 
    seller: "DigitalArtist",
    image: "🤖",
    rarity: "Epic",
    isNew: false
  },
  {
    id: 3,
    name: "Racing Beast #789",
    price: "5.8 ETH",
    seller: "SpeedDemon", 
    image: "🏎️",
    rarity: "Rare",
    isNew: true
  }
];

const NFTMarketplace = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState({
    totalNFTs: 0,
    totalVolume: 0,
    activeTraders: 0,
    collections: 0
  });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [buttonStates, setButtonStates] = useState<Record<string, 'idle' | 'loading' | 'success'>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [favoriteAnimation, setFavoriteAnimation] = useState<Set<number>>(new Set());
  const statsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Enhanced Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (ref: React.RefObject<HTMLDivElement>, sectionId: string, threshold = 0.15) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(sectionId));
              // Unobserve after animation triggers for performance
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          threshold, 
          rootMargin: '0px 0px -100px 0px' 
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    createObserver(statsRef, 'stats', 0.2);
    createObserver(featuredRef, 'featured', 0.15);
    createObserver(collectionsRef, 'collections', 0.15);
    createObserver(featuresRef, 'features', 0.2);

    // Parallax effect for hero section with reduced intensity
    const handleScroll = () => {
      if (heroRef.current && !document.hidden) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.15; // Reduced from 0.3 for subtler effect
        heroRef.current.style.transform = `translateY(${parallax}px)`;
        heroRef.current.style.willChange = 'transform';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll progress tracking
    const handleScrollProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / windowHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });

    // Pause animations when tab is not visible and clear will-change
    const handleVisibilityChange = () => {
      if (heroRef.current) {
        if (document.hidden) {
          // Clear will-change when tab is hidden
          heroRef.current.style.willChange = 'auto';
        } else {
          // Restore will-change when tab is visible
          heroRef.current.style.willChange = 'transform';
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollProgress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Clear will-change on cleanup
      if (heroRef.current) {
        heroRef.current.style.willChange = 'auto';
        heroRef.current.style.transform = '';
      }
    };
  }, []);

  // Enhanced counter animation with easing
  useEffect(() => {
    if (!visibleSections.has('stats')) return;

    const duration = 2500;
    const startTime = Date.now();

    const targets = {
      totalNFTs: 45200,
      totalVolume: 1234,
      activeTraders: 8900,
      collections: 156
    };

    // Ease-out-expo function for smooth animation
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCounters({
        totalNFTs: Math.floor(targets.totalNFTs * easedProgress),
        totalVolume: Math.floor(targets.totalVolume * easedProgress),
        activeTraders: Math.floor(targets.activeTraders * easedProgress),
        collections: Math.floor(targets.collections * easedProgress)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounters(targets);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [visibleSections]);

  const formatNumber = (num: number, type: 'nft' | 'eth' | 'traders' | 'collections') => {
    if (type === 'nft' || type === 'traders') {
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
      }
      return num.toString();
    }
    if (type === 'eth') {
      return num.toLocaleString();
    }
    return num.toString();
  };

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteAnimation((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setFavoriteAnimation((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 500);

    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleButtonClick = useCallback((buttonId: string) => {
    setButtonStates((prev) => ({ ...prev, [buttonId]: 'loading' }));
    
    // Simulate async operation
    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, [buttonId]: 'success' }));
      setTimeout(() => {
        setButtonStates((prev) => ({ ...prev, [buttonId]: 'idle' }));
      }, 2000);
    }, 1500);
  }, []);

  // Get animation class based on index for varied entrance animations
  const getCardAnimationClass = (index: number, section: string) => {
    if (!visibleSections.has(section)) return 'opacity-0';
    
    const animations = [
      'animate-slide-in-left',
      'animate-fade-in-scale',
      'animate-slide-in-right',
      'animate-blur-in',
      'animate-slide-in-up-spring',
      'animate-fade-in-scale-rotate'
    ];
    
    return animations[index % animations.length];
  };

  // Magnetic button effect using CSS custom properties for smooth transitions
  const handleMagneticMove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.2; // Reduced from 0.3 for subtler effect
    const moveY = y * 0.2;
    
    button.style.setProperty('--magnetic-x', `${moveX}px`);
    button.style.setProperty('--magnetic-y', `${moveY}px`);
  }, []);

  const handleMagneticLeave = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.setProperty('--magnetic-x', '0px');
    button.style.setProperty('--magnetic-y', '0px');
  }, []);

  return (
    <div className="min-h-screen relative z-10">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <AnimatedBackground />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section ref={heroRef} className="py-20 px-4 animated-bg relative overflow-hidden">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-scale">
                <span className="gradient-nft bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                  NFT Marketplace
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Discover, collect, and trade unique digital assets from gaming and art communities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Button 
                  variant="nft" 
                  size="xl" 
                  className="ripple-effect hover-shimmer hover-magnetic relative overflow-hidden group transition-all duration-300"
                  onClick={() => handleButtonClick('browse')}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${buttonStates.browse === 'loading' ? 'animate-icon-rotate' : ''}`} />
                  <span className="ml-2">Browse NFTs</span>
                  {buttonStates.browse === 'success' && (
                    <span className="ml-2 animate-checkmark">✓</span>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="ripple-effect hover-shimmer hover-magnetic relative overflow-hidden group transition-all duration-300"
                  onClick={() => handleButtonClick('create')}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  <Palette className={`w-5 h-5 transition-transform duration-300 ${buttonStates.create === 'loading' ? 'animate-icon-rotate' : ''}`} />
                  <span className="ml-2">Create NFT</span>
                  {buttonStates.create === 'success' && (
                    <span className="ml-2 animate-checkmark">✓</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <Card className={`gradient-card text-center hover-lift animate-fade-in-up ${visibleSections.has('stats') ? 'stagger-1' : 'opacity-0'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl gradient-nft bg-clip-text text-transparent animate-counter-up">
                    {formatNumber(counters.totalNFTs, 'nft')}
                  </CardTitle>
                  <CardDescription>Total NFTs</CardDescription>
                </CardHeader>
              </Card>
              <Card className={`gradient-card text-center hover-lift animate-fade-in-up ${visibleSections.has('stats') ? 'stagger-2' : 'opacity-0'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent animate-counter-up">
                    {formatNumber(counters.totalVolume, 'eth')} ETH
                  </CardTitle>
                  <CardDescription>Total Volume</CardDescription>
                </CardHeader>
              </Card>
              <Card className={`gradient-card text-center hover-lift animate-fade-in-up ${visibleSections.has('stats') ? 'stagger-3' : 'opacity-0'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl gradient-gaming bg-clip-text text-transparent animate-counter-up">
                    {formatNumber(counters.activeTraders, 'traders')}
                  </CardTitle>
                  <CardDescription>Active Traders</CardDescription>
                </CardHeader>
              </Card>
              <Card className={`gradient-card text-center hover-lift animate-fade-in-up ${visibleSections.has('stats') ? 'stagger-4' : 'opacity-0'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl gradient-defi bg-clip-text text-transparent animate-counter-up">
                    {formatNumber(counters.collections, 'collections')}
                  </CardTitle>
                  <CardDescription>Collections</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Featured NFTs */}
            <h2 className={`text-3xl font-bold text-center mb-12 animate-fade-in-up ${visibleSections.has('featured') ? '' : 'opacity-0'}`}>Featured NFTs</h2>
            <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {featuredNFTs.map((nft, index) => (
                <Card 
                  key={nft.id} 
                  className={`gradient-card border-border/50 hover-lift hover-3d-tilt hover-depth-card group ${getCardAnimationClass(index, 'featured')} ${visibleSections.has('featured') ? `stagger-${index + 1}` : 'opacity-0'}`}
                  style={{ 
                    animationDelay: visibleSections.has('featured') ? `${index * 0.1}s` : '0s',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <CardHeader className="relative">
                    {nft.isNew && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-nft/20 text-nft text-xs rounded-full">
                        NEW
                      </span>
                    )}
                    <button
                      onClick={() => toggleFavorite(nft.id)}
                      className={`absolute top-2 left-2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background favorite-button group/fav ${
                        favoriteAnimation.has(nft.id) ? 'animate-heart-pop' : ''
                      }`}
                      aria-label="Toggle favorite"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-300 ${
                          favorites.has(nft.id) 
                            ? 'fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' 
                            : 'text-muted-foreground group-hover/fav:text-red-500'
                        }`}
                      />
                    </button>
                    <div className={`text-6xl text-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:animate-emoji-bounce will-change-transform ${
                      nft.rarity === 'Legendary' ? 'group-hover:drop-shadow-[0_0_30px_hsl(var(--nft))] group-hover:animate-glow-pulse' :
                      nft.rarity === 'Epic' ? 'group-hover:drop-shadow-[0_0_30px_hsl(var(--primary))]' :
                      'group-hover:drop-shadow-[0_0_30px_hsl(var(--accent))]'
                    }`}>
                      {nft.image}
                    </div>
                    <CardTitle className="text-center">{nft.name}</CardTitle>
                    <CardDescription className="text-center">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs badge-hover cursor-pointer inline-block ${
                          nft.rarity === 'Legendary' 
                            ? 'bg-nft/20 text-nft transition-all duration-500 ease-out group-hover:bg-nft/30 group-hover:shadow-lg group-hover:shadow-nft/50 group-hover:animate-badge-shake animate-sparkle' :
                            nft.rarity === 'Epic' 
                            ? 'bg-primary/20 text-primary group-hover:bg-primary/30 group-hover:shadow-lg group-hover:shadow-primary/50' :
                            'bg-accent/20 text-accent group-hover:bg-accent/30 group-hover:shadow-lg group-hover:shadow-accent/50'
                        }`}
                      >
                        {nft.rarity}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-bold text-nft price-highlight hover-shimmer relative">
                          {nft.price}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seller:</span>
                        <span className="font-semibold hover:text-primary transition-colors cursor-pointer hover:scale-105 inline-block">
                          {nft.seller}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="nft" 
                      className="w-full mt-4 ripple-effect hover-shimmer hover-magnetic relative overflow-hidden group/btn"
                      onClick={() => handleButtonClick(`buy-${nft.id}`)}
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                    >
                      {buttonStates[`buy-${nft.id}`] === 'loading' ? (
                        <span className="flex items-center justify-center">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-icon-rotate mr-2"></span>
                          Processing...
                        </span>
                      ) : buttonStates[`buy-${nft.id}`] === 'success' ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-checkmark mr-2">✓</span>
                          Purchased!
                        </span>
                      ) : (
                        'Buy Now'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Collections */}
            <h2 className={`text-3xl font-bold text-center mb-12 animate-fade-in-up ${visibleSections.has('collections') ? '' : 'opacity-0'}`}>Top Collections</h2>
            <div ref={collectionsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nftCollections.map((collection, index) => (
                <Card 
                  key={collection.id} 
                  className={`gradient-card border-border/50 hover-lift hover-3d-tilt hover-depth-card group ${getCardAnimationClass(index, 'collections')} ${visibleSections.has('collections') ? `stagger-${index + 1}` : 'opacity-0'}`}
                  style={{ 
                    animationDelay: visibleSections.has('collections') ? `${index * 0.1}s` : '0s',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div 
                        className="text-4xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:animate-emoji-bounce group-hover:drop-shadow-[0_0_20px_hsl(var(--nft))] will-change-transform animate-icon-dance"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        {collection.image}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{collection.name}</CardTitle>
                        <CardDescription>
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary inline-block mt-1 group-hover:animate-pulse-slow">
                            {collection.category}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="group/stat">
                        <div className="text-muted-foreground">Floor Price</div>
                        <div className="font-bold text-nft price-highlight group-hover/stat:animate-price-pulse">
                          {collection.floorPrice}
                        </div>
                      </div>
                      <div className="group/stat">
                        <div className="text-muted-foreground">Volume</div>
                        <div className="font-bold group-hover/stat:scale-105 transition-transform duration-300">
                          {collection.volume}
                        </div>
                      </div>
                      <div className="group/stat">
                        <div className="text-muted-foreground">Items</div>
                        <div className="font-bold group-hover/stat:scale-105 transition-transform duration-300">
                          {collection.items}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 ripple-effect hover-shimmer hover-magnetic relative overflow-hidden"
                      onClick={() => handleButtonClick(`view-${collection.id}`)}
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                    >
                      {buttonStates[`view-${collection.id}`] === 'loading' ? (
                        <span className="flex items-center justify-center">
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-icon-rotate mr-2"></span>
                          Loading...
                        </span>
                      ) : (
                        'View Collection'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* NFT Features */}
        <section ref={featuresRef} className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-12 animate-fade-in-up ${visibleSections.has('features') ? '' : 'opacity-0'}`}>Marketplace Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className={`text-center animate-fade-in-scale ${visibleSections.has('features') ? 'stagger-1' : 'opacity-0'}`}>
                <div className="w-16 h-16 gradient-nft rounded-full flex items-center justify-center mx-auto mb-4 hover-scale hover-glow transition-all duration-300 cursor-pointer group/icon">
                  <Crown className="w-8 h-8 text-white group-hover/icon:animate-icon-rotate" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Royalty System</h3>
                <p className="text-muted-foreground">
                  Creators earn royalties on every secondary sale
                </p>
              </div>
              <div className={`text-center animate-fade-in-scale ${visibleSections.has('features') ? 'stagger-2' : 'opacity-0'}`}>
                <div className="w-16 h-16 gradient-nft rounded-full flex items-center justify-center mx-auto mb-4 hover-scale hover-glow transition-all duration-300 cursor-pointer group/icon">
                  <Gamepad2 className="w-8 h-8 text-white group-hover/icon:animate-icon-rotate" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gaming Integration</h3>
                <p className="text-muted-foreground">
                  Use NFTs directly in supported games
                </p>
              </div>
              <div className={`text-center animate-fade-in-scale ${visibleSections.has('features') ? 'stagger-3' : 'opacity-0'}`}>
                <div className="w-16 h-16 gradient-nft rounded-full flex items-center justify-center mx-auto mb-4 hover-scale hover-glow transition-all duration-300 cursor-pointer group/icon">
                  <TrendingUp className="w-8 h-8 text-white group-hover/icon:animate-icon-rotate" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Price Analytics</h3>
                <p className="text-muted-foreground">
                  Track price history and market trends
                </p>
              </div>
              <div className={`text-center animate-fade-in-scale ${visibleSections.has('features') ? 'stagger-4' : 'opacity-0'}`}>
                <div className="w-16 h-16 gradient-nft rounded-full flex items-center justify-center mx-auto mb-4 hover-scale hover-glow transition-all duration-300 cursor-pointer group/icon">
                  <Users className="w-8 h-8 text-white group-hover/icon:animate-icon-rotate" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Connect with artists and collectors
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NFTMarketplace;