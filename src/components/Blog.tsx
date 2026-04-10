import { useState, useEffect, useRef } from 'react';
import { BookOpen, Clock, ArrowRight, User, ChevronLeft, Share2, Heart, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const categories = ['All', 'Fitness Tips', 'Nutrition', 'Yoga', 'Wellness', 'Success Stories'];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Morning Yoga Poses to Energize Your Day',
    excerpt: 'Start your day with these simple yet powerful yoga poses that will boost your energy and set a positive tone for the entire day.',
    content: `Morning yoga is one of the best ways to wake up your body and mind. Here are 5 poses that our expert instructors recommend:

1. **Sun Salutation (Surya Namaskar)** - A complete body workout that stretches all major muscle groups while synchronizing breath with movement.

2. **Cat-Cow Pose (Marjaryasana-Bitilasana)** - Gentle flow that warms up the spine and releases tension from the back.

3. **Downward Dog (Adho Mukha Svanasana)** - Stretches the hamstrings, calves, and shoulders while building upper body strength.

4. **Warrior I (Virabhadrasana I)** - Builds leg strength and opens the chest, perfect for building confidence.

5. **Child's Pose (Balasana)** - A restorative pose that calms the mind and gently stretches the hips and lower back.

Practice these poses for just 15 minutes each morning and notice the difference in your energy levels throughout the day!`,
    category: 'Yoga',
    author: 'P. Niraimathi - HEAD Coach',
    date: 'Apr 5, 2026',
    readTime: '5 min read',
    tags: ['yoga', 'morning routine', 'energy', 'wellness'],
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Zumba for Beginners',
    excerpt: 'New to Zumba? Learn everything you need to know to get started with this fun, dance-based workout that burns calories while having fun.',
    content: `Zumba is a fitness program that combines Latin and international music with dance moves. Here's your complete beginner's guide:

**What to Expect:**
- High-energy music that makes you want to move
- Easy-to-follow choreography that doesn't require dance experience
- Interval training that alternates between fast and slow rhythms
- A full-body workout that feels like a party!

**What to Wear:**
- Comfortable, breathable workout clothes
- Supportive athletic shoes (not running shoes - you need shoes that can pivot)
- Bring a water bottle and small towel

**First Class Tips:**
1. Arrive 10 minutes early to meet the instructor
2. Stand where you can see the instructor clearly
3. Don't worry about getting every move perfect - just keep moving!
4. Hydrate before, during, and after class
5. Listen to your body and take breaks when needed

Join our Zumba classes at Femme Flex and dance your way to fitness!`,
    category: 'Fitness Tips',
    author: 'M. Uthayalakshmi - Fitness Trainer',
    date: 'Apr 3, 2026',
    readTime: '6 min read',
    tags: ['zumba', 'dance fitness', 'cardio', 'beginners'],
  },
  {
    id: 3,
    title: 'Healthy Eating Habits for Active Women',
    excerpt: 'Discover the nutrition secrets that will fuel your workouts and help you achieve your fitness goals faster.',
    content: `Nutrition is 70% of your fitness journey. Here's how to eat for energy and results:

**Pre-Workout Nutrition (1-2 hours before):**
- Complex carbs: Oats, brown rice, sweet potatoes
- Lean protein: Eggs, Greek yogurt, chicken
- Healthy fats: Nuts, avocado
- Hydration: 500ml water

**Post-Workout Recovery (within 30 minutes):**
- Protein: Helps repair muscles (whey, eggs, cottage cheese)
- Carbs: Replenish glycogen stores (banana, rice, fruits)
- Example: Banana with peanut butter or a protein smoothie

**Daily Nutrition Guidelines:**
- Eat every 3-4 hours to maintain energy
- Include protein in every meal
- Fill half your plate with vegetables
- Limit processed foods and added sugars
- Drink 2-3 liters of water daily

**Superfoods for Women:**
- Leafy greens for iron
- Berries for antioxidants
- Salmon for omega-3s
- Quinoa for complete protein
- Turmeric for anti-inflammatory benefits

Remember: Consistency beats perfection. Focus on nourishing your body, not restricting it.`,
    category: 'Nutrition',
    author: 'J. Madhubala - Personal Trainer',
    date: 'Mar 30, 2026',
    readTime: '8 min read',
    tags: ['nutrition', 'healthy eating', 'meal prep', 'wellness'],
  },
  {
    id: 4,
    title: 'Priya\'s 3-Month Transformation Story',
    excerpt: 'How one member lost 15kg and gained confidence through dedication, proper guidance, and sisterhood support at Femme Flex.',
    content: `Meet Priya S., a 32-year-old working mother who transformed her life at Femme Flex.

**The Beginning:**
"I joined Femme Flex in January 2025 weighing 78kg. I was tired all the time, lacked confidence, and struggled to keep up with my kids."

**The Plan:**
- Personal training 3x per week with Anitha
- Yoga classes 2x per week for stress relief
- Customized meal plan from our nutrition consultant
- Consistency was key - no excuses!

**The Results (3 Months):**
- Weight: 78kg → 63kg (-15kg!)
- Energy levels: Through the roof
- Confidence: Completely transformed
- Fitness level: Can now run 5km easily

**Priya's Advice:**
"Don't compare your day 1 to someone else's day 100. Trust the process, show up consistently, and the results will follow. The sisterhood at Femme Flex kept me motivated on days I wanted to quit."

**Current Status:**
Priya is now a regular at our group classes and inspires new members with her journey. She's maintained her weight for 6 months and is training for her first 10km run!

Your transformation story could be next. Start today!`,
    category: 'Success Stories',
    author: 'Femme Flex Team',
    date: 'Mar 28, 2026',
    readTime: '4 min read',
    tags: ['transformation', 'weight loss', 'motivation', 'success'],
  },
  {
    id: 5,
    title: '5-Minute Stress Relief Techniques',
    excerpt: 'Busy schedule? These quick stress-busting techniques can be done anywhere, anytime to keep you calm and centered.',
    content: `Stress affects your hormones, sleep, and even weight. Here are 5 techniques that take just 5 minutes:

**1. Box Breathing (4-4-4-4)**
- Inhale for 4 counts
- Hold for 4 counts
- Exhale for 4 counts
- Hold for 4 counts
- Repeat 5 times
Perfect before meetings or during work breaks.

**2. Progressive Muscle Relaxation**
- Start at your toes, tense for 5 seconds
- Release and feel the relaxation
- Move up: calves, thighs, abdomen, chest, arms, face
- The contrast teaches your body what relaxation feels like

**3. 5-4-3-2-1 Grounding Technique**
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste
Brings you back to the present moment.

**4. Desk Yoga Stretches**
- Neck rolls (5 each direction)
- Shoulder shrugs (10 times)
- Seated spinal twist (hold 30 seconds each side)
- Wrist circles (10 each direction)

**5. Gratitude Pause**
- Close your eyes
- Think of 3 things you're grateful for
- Feel the gratitude in your body
- Open eyes with a smile

Practice these daily and watch your stress levels decrease!`,
    category: 'Wellness',
    author: 'M. Ashwitha - Physical Trainer',
    date: 'Mar 25, 2026',
    readTime: '4 min read',
    tags: ['stress relief', 'mental health', 'quick tips', 'wellness'],
  },
  {
    id: 6,
    title: 'Strength Training Myths Debunked',
    excerpt: 'Will lifting weights make you bulky? Find out the truth behind common strength training myths for women.',
    content: `Let's bust some myths that hold women back from strength training:

**MYTH #1: "Lifting weights makes women bulky"**
TRUTH: Women have 10-20 times less testosterone than men. Building significant muscle mass requires specific training, nutrition, and often years of dedicated effort. Strength training creates lean, toned muscles.

**MYTH #2: "Cardio is better for weight loss"**
TRUTH: While cardio burns calories during the workout, strength training increases your resting metabolic rate. Muscle tissue burns more calories at rest than fat tissue. The best approach? Combine both!

**MYTH #3: "Women should only use light weights"**
TRUTH: Progressive overload (gradually increasing weight) is essential for results. If you can do 15+ reps easily, it's time to increase weight. Challenge yourself safely.

**MYTH #4: "Strength training is dangerous"**
TRUTH: When done with proper form, strength training is one of the safest activities. It actually strengthens bones, joints, and connective tissues, reducing injury risk in daily life.

**Benefits of Strength Training for Women:**
✓ Increased bone density (prevents osteoporosis)
✓ Improved metabolism
✓ Better posture and reduced back pain
✓ Enhanced mood and confidence
✓ Better sleep quality
✓ Reduced risk of heart disease and diabetes

**Getting Started:**
- Start with bodyweight exercises
- Learn proper form from certified trainers
- Progress gradually
- Aim for 2-3 strength sessions per week
- Be patient - results take time

Join our Strength Training classes and discover the empowered woman within you!`,
    category: 'Fitness Tips',
    author: 'Hema - Fitness Trainer',
    date: 'Mar 22, 2026',
    readTime: '7 min read',
    tags: ['strength training', 'myths', 'women fitness', 'empowerment'],
  },
];

const categoryColors: Record<string, string> = {
  'Fitness Tips': '#D4AF37',
  'Nutrition': '#4ECDC4',
  'Yoga': '#800080',
  'Wellness': '#95E1D3',
  'Success Stories': '#FF6B6B',
};

// Mobile Carousel Component
function MobileBlogCarousel({ 
  posts, 
  onSelectPost,
  likedPosts,
  onToggleLike,
  onSharePost
}: { 
  posts: BlogPost[]; 
  onSelectPost: (post: BlogPost) => void;
  likedPosts: number[];
  onToggleLike: (id: number, e: React.MouseEvent) => void;
  onSharePost: (post: BlogPost, e: React.MouseEvent) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 4 seconds (slower for reading)
  useEffect(() => {
    if (posts.length === 0 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % posts.length;
        scrollRef.current?.scrollTo({
          left: next * 300,
          behavior: 'smooth'
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [posts.length, isPaused]);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, posts.length - 1));
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * 300,
      behavior: 'smooth'
    });
  };

  const handleManualScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / 300);
      setCurrentIndex(newIndex);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/50">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleManualScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 4000)}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex-shrink-0 w-[280px] snap-center"
          >
            <article
              onClick={() => onSelectPost(post)}
              className="dark-card overflow-hidden card-hover cursor-pointer group h-full"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-1 text-xs font-bold uppercase"
                    style={{
                      background: `${categoryColors[post.category]}20`,
                      color: categoryColors[post.category],
                      borderRadius: '4px',
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-white/40 text-xs flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(128,0,128,0.2)' }}>
                      <User size={12} style={{ color: '#800080' }} />
                    </div>
                    <p className="text-white/60 text-xs truncate max-w-[100px]">{post.author}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => onToggleLike(post.id, e)}
                      className="p-1.5 rounded-full transition-colors"
                      style={{
                        background: likedPosts.includes(post.id) ? 'rgba(255,107,107,0.2)' : 'transparent',
                      }}
                    >
                      <Heart
                        size={16}
                        className={likedPosts.includes(post.id) ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-white/40'}
                      />
                    </button>
                    <button
                      onClick={(e) => onSharePost(post, e)}
                      className="p-1.5 rounded-full text-white/40 hover:text-white transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="px-5 py-2 flex items-center justify-between"
                style={{ background: 'rgba(212,175,55,0.05)' }}
              >
                <span className="text-[#D4AF37] text-xs font-semibold">Read More</span>
                <ArrowRight size={14} style={{ color: '#D4AF37' }} />
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(212,175,55,0.3)',
              opacity: currentIndex === 0 ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={18} style={{ color: '#D4AF37' }} />
          </button>
          <button
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === posts.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(212,175,55,0.3)',
              opacity: currentIndex === posts.length - 1 ? 0.3 : 1,
            }}
          >
            <ChevronRightIcon size={18} style={{ color: '#D4AF37' }} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: currentIndex === idx ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                transform: currentIndex === idx ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Swipe hint */}
      <p className="text-center text-white/30 text-xs mt-2">← Swipe to see more articles →</p>
    </div>
  );
}

// Desktop Card Component
function BlogCard({ 
  post, 
  onSelectPost,
  likedPosts,
  onToggleLike,
  onSharePost
}: { 
  post: BlogPost; 
  onSelectPost: (post: BlogPost) => void;
  likedPosts: number[];
  onToggleLike: (id: number, e: React.MouseEvent) => void;
  onSharePost: (post: BlogPost, e: React.MouseEvent) => void;
}) {
  return (
    <article
      onClick={() => onSelectPost(post)}
      className="dark-card overflow-hidden card-hover cursor-pointer group"
      style={{
        borderRadius: '8px',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="px-3 py-1 text-xs font-bold uppercase"
            style={{
              background: `${categoryColors[post.category]}20`,
              color: categoryColors[post.category],
              borderRadius: '4px',
            }}
          >
            {post.category}
          </span>
          <span className="text-white/40 text-xs flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
          {post.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(128,0,128,0.2)' }}>
              <User size={14} style={{ color: '#800080' }} />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">{post.author}</p>
              <p className="text-white/40 text-xs">{post.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleLike(post.id, e)}
              className="p-2 rounded-full transition-colors"
              style={{
                background: likedPosts.includes(post.id) ? 'rgba(255,107,107,0.2)' : 'transparent',
              }}
            >
              <Heart
                size={18}
                className={likedPosts.includes(post.id) ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-white/40'}
              />
            </button>
            <button
              onClick={(e) => onSharePost(post, e)}
              className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ background: 'rgba(212,175,55,0.05)' }}
      >
        <span className="text-[#D4AF37] text-sm font-semibold">Read More</span>
        <ArrowRight size={16} style={{ color: '#D4AF37' }} />
      </div>
    </article>
  );
}

export default function Blog() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const sharePost = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Check out this article: ${post.title} from Femme Flex Ladies Gym!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="blog" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(128,0,128,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 section-fade ${isVisible ? 'visible' : ''}`}
          data-aos="fade-down"
        >
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: '#800080' }}>
            Inspiring Journeys
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Real <span className="gold-text">Stories</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert tips, inspiring stories, and wellness wisdom to support your fitness journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-5 py-2 text-sm font-semibold transition-all duration-300"
              style={{
                background: selectedCategory === cat ? 'linear-gradient(135deg, #D4AF37, #F2D060)' : 'rgba(255,255,255,0.05)',
                color: selectedCategory === cat ? '#111' : 'rgba(255,255,255,0.7)',
                borderRadius: '20px',
                border: `1px solid ${selectedCategory === cat ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Auto-Scroll Carousel */}
        <div className="md:hidden">
          <MobileBlogCarousel 
            posts={filteredPosts}
            onSelectPost={setSelectedPost}
            likedPosts={likedPosts}
            onToggleLike={toggleLike}
            onSharePost={sharePost}
          />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
          {filteredPosts.map((post) => (
            <BlogCard 
              key={post.id}
              post={post}
              onSelectPost={setSelectedPost}
              likedPosts={likedPosts}
              onToggleLike={toggleLike}
              onSharePost={sharePost}
            />
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="min-h-screen px-4 py-8 flex items-start justify-center">
            <div
              className="dark-card w-full max-w-3xl relative"
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                ✕
              </button>

              <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase"
                    style={{
                      background: `${categoryColors[selectedPost.category]}20`,
                      color: categoryColors[selectedPost.category],
                      borderRadius: '4px',
                    }}
                  >
                    {selectedPost.category}
                  </span>
                  <span className="text-white/40 text-sm">{selectedPost.date}</span>
                </div>

                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center gap-4 text-white/50 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {selectedPost.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} />
                    {selectedPost.tags.length} tags
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{
                        background: 'rgba(128,0,128,0.15)',
                        color: '#800080',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="prose prose-invert max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-white/80 leading-relaxed mb-4 whitespace-pre-line"
                    >
                      {paragraph.includes('**') ? (
                        paragraph.split('**').map((part, i) => (
                          i % 2 === 1 ? (
                            <strong key={i} className="text-white">{part}</strong>
                          ) : part
                        ))
                      ) : paragraph.startsWith('✓') || paragraph.startsWith('1.') || paragraph.startsWith('-') ? (
                        <span className="block pl-4">{paragraph}</span>
                      ) : paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-lg text-center" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <p className="text-white mb-4">Ready to start your fitness journey?</p>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #800080, #a020a0)',
                      color: '#fff',
                      borderRadius: '4px',
                    }}
                  >
                    Join Femme Flex Today
                  </button>
                </div>
              </div>

              <div
                className="px-8 py-4 flex items-center justify-between border-t"
                style={{ borderColor: 'rgba(212,175,55,0.1)' }}
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <ChevronLeft size={20} />
                  Back to Articles
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => sharePost(selectedPost, {} as React.MouseEvent)}
                    className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-colors"
                    style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366' }}
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
