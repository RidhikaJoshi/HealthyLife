"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Search,
  Plus,
  Heart,
  Share2,
  MessageCircle,
  Filter,
  X,
  Send,
  Sun,
  Moon,
  Calendar,
  User,
  Tag,
  Eye,
  ChevronDown,
  Mail,
  Phone,
  MapPin
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Playfair_Display } from "next/font/google"

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})  

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  likes: number
  comments: Comment[]
  shares: number
  views: number
  createdAt: string
  imageUrl: string
  isLiked: boolean
}

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
  avatar: string
}

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface Theme {
  light: {
    bg: string
    cardBg: string
    text: string
    textSecondary: string
    accent: string
    accentHover: string
    border: string
    modalBg: string
  }
  dark: {
    bg: string
    cardBg: string
    text: string
    textSecondary: string
    accent: string
    accentHover: string
    border: string
    modalBg: string
  }
}

interface FAQ {
  id: string
  question: string
  answer: string
  isOpen: boolean
}

const theme: Theme = {
  light: {
    bg: "#f8fffe",
    cardBg: "#ffffff",
    text: "#1a2e1a",
    textSecondary: "#4a5d4a",
    accent: "#2d7d32",
    accentHover: "#1b5e20",
    border: "#e8f5e8",
    modalBg: "rgba(255, 255, 255, 0.95)",
  },
  dark: {
    bg: "#0f1b0f",
    cardBg: "#1a2e1a",
    text: "#e8f5e8",
    textSecondary: "#a5b5a5",
    accent: "#4caf50",
    accentHover: "#66bb6a",
    border: "#2d4a2d",
    modalBg: "rgba(26, 46, 26, 0.95)",
  },
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Plant-Based Nutrition",
    content:
      "Plant-based nutrition has gained tremendous popularity in recent years, and for good reason. A well-planned plant-based diet can provide all the nutrients your body needs while offering numerous health benefits. From reducing the risk of chronic diseases to supporting environmental sustainability, plant-based eating is more than just a trend—it's a lifestyle choice that can transform your health. In this comprehensive guide, we'll explore the fundamentals of plant-based nutrition, including essential nutrients to focus on, meal planning strategies, and delicious recipe ideas that will make your transition both enjoyable and sustainable.\n\nOne of the most important aspects of plant-based nutrition is ensuring you get adequate protein. Contrary to popular belief, plants provide plenty of high-quality protein sources including legumes, quinoa, hemp seeds, and spirulina. The key is variety and combining different protein sources throughout the day.\n\nVitamin B12 is perhaps the most critical nutrient to monitor on a plant-based diet, as it's primarily found in animal products. Supplementation or fortified foods are essential for maintaining optimal B12 levels. Iron absorption can be enhanced by consuming vitamin C-rich foods alongside iron-rich plant foods like spinach and lentils.",
    excerpt:
      "Discover the power of plant-based nutrition and how it can transform your health with this comprehensive guide.",
    author: "Dr. Sarah Green",
    category: "Nutrition",
    tags: ["plant-based", "nutrition", "health", "diet"],
    likes: 124,
    comments: [
      {
        id: "1",
        author: "Mike Johnson",
        content: "This is exactly what I needed! Starting my plant-based journey tomorrow.",
        createdAt: "2024-01-15",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: "2",
        author: "Emma Wilson",
        content: "Great article! The meal planning section was particularly helpful.",
        createdAt: "2024-01-16",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
    ],
    shares: 45,
    views: 1250,
    createdAt: "2024-01-14",
    imageUrl: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    isLiked: false,
  },
  {
    id: "2",
    title: "Morning Yoga Routines for Better Mental Health",
    content:
      "Starting your day with yoga can be a game-changer for your mental health and overall well-being. Morning yoga routines help center your mind, reduce stress, and set a positive tone for the entire day. The practice combines physical movement with mindfulness, creating a powerful tool for managing anxiety, depression, and daily stressors. Whether you're a beginner or an experienced practitioner, incorporating yoga into your morning routine can lead to improved focus, better sleep, increased flexibility, and a greater sense of inner peace. Let's explore some simple yet effective morning yoga sequences that you can easily integrate into your daily schedule.\n\nThe beauty of morning yoga lies in its accessibility. You don't need expensive equipment or a lot of space. A simple mat and 10-15 minutes of your time can make a significant difference. Start with gentle stretches like cat-cow poses, child's pose, and simple twists to awaken your spine.\n\nBreathing exercises, or pranayama, are equally important. Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, and exhale for 8. This activates your parasympathetic nervous system, promoting calm and focus for the day ahead.",
    excerpt:
      "Start your day right with these simple yoga routines designed to boost your mental health and energy levels.",
    author: "Maya Patel",
    category: "Mental Health",
    tags: ["yoga", "mental-health", "morning-routine", "mindfulness"],
    likes: 89,
    comments: [
      {
        id: "3",
        author: "David Chen",
        content: "I've been doing the 10-minute routine for a week now. Amazing results!",
        createdAt: "2024-01-17",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
    ],
    shares: 32,
    views: 890,
    createdAt: "2024-01-16",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
    isLiked: true,
  },
  {
    id: "3",
    title: "Hydration Hacks: Beyond Just Drinking Water",
    content:
      "While drinking water is fundamental to good health, proper hydration goes beyond simply consuming eight glasses a day. Your body's hydration needs vary based on activity level, climate, overall health, and individual physiology. Understanding how to optimize your hydration can improve energy levels, support cognitive function, enhance physical performance, and promote better skin health. This article explores creative and effective ways to stay properly hydrated, including hydrating foods, electrolyte balance, timing strategies, and signs that indicate your hydration status. Learn how to make hydration a seamless part of your healthy lifestyle.\n\nHydrating foods can contribute significantly to your daily fluid intake. Watermelon, cucumber, oranges, and leafy greens all have high water content. These foods also provide essential vitamins and minerals that support hydration at the cellular level.\n\nElectrolyte balance is crucial, especially for active individuals. Sodium, potassium, and magnesium work together to maintain proper fluid balance. Natural sources like coconut water, sea salt, and bananas can help maintain this delicate balance without relying on commercial sports drinks.",
    excerpt: "Learn creative ways to stay hydrated and boost your energy levels throughout the day.",
    author: "Dr. James Water",
    category: "Wellness",
    tags: ["hydration", "health", "energy", "wellness"],
    likes: 67,
    comments: [],
    shares: 23,
    views: 654,
    createdAt: "2024-01-18",
    imageUrl: "https://images.pexels.com/photos/3766180/pexels-photo-3766180.jpeg",
    isLiked: false,
  },
  {
    id: "4",
    title: "Building Sustainable Exercise Habits",
    content:
      "Creating lasting exercise habits is one of the most valuable investments you can make in your health. However, many people struggle with consistency, often starting strong but losing motivation over time. The key to sustainable fitness lies not in extreme workouts or rigid schedules, but in building habits that naturally integrate into your lifestyle. This comprehensive guide will help you understand the psychology of habit formation, identify your personal motivation drivers, and create a realistic exercise routine that you can maintain long-term. We'll cover everything from setting achievable goals to overcoming common obstacles that derail fitness journeys.\n\nThe science of habit formation shows us that consistency trumps intensity. It's better to exercise for 15 minutes daily than to do intense 2-hour workouts once a week. Start small and gradually increase duration and intensity as the habit becomes automatic.\n\nEnvironmental design plays a crucial role in habit formation. Lay out your workout clothes the night before, keep your gym bag by the door, or schedule workouts like important appointments. These small changes remove friction and make it easier to stick to your routine.",
    excerpt: "Discover the secrets to creating exercise habits that stick and transform your fitness journey.",
    author: "Coach Alex Rivera",
    category: "Fitness",
    tags: ["exercise", "habits", "fitness", "motivation"],
    likes: 156,
    comments: [
      {
        id: "4",
        author: "Lisa Thompson",
        content: "This changed my perspective on fitness completely. Thank you!",
        createdAt: "2024-01-19",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: "5",
        author: "Robert Kim",
        content: "The habit stacking technique mentioned here really works!",
        createdAt: "2024-01-20",
        avatar: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
      },
    ],
    shares: 78,
    views: 1890,
    createdAt: "2024-01-18",
    imageUrl: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    isLiked: false,
  },
  {
    id: "5",
    title: "Sleep Optimization: The Foundation of Health",
    content:
      "Quality sleep is the cornerstone of good health, yet it's often the first thing we sacrifice in our busy lives. Poor sleep affects every aspect of our well-being, from immune function and mental clarity to emotional regulation and physical performance. Understanding the science of sleep and implementing evidence-based strategies can dramatically improve your sleep quality and, consequently, your overall health. This comprehensive guide covers sleep hygiene, circadian rhythm optimization, bedroom environment setup, and natural techniques to help you achieve restorative sleep consistently.\n\nYour circadian rhythm, your body's internal clock, plays a crucial role in sleep quality. Exposure to natural light in the morning and avoiding blue light in the evening helps maintain this rhythm. Consider using blackout curtains and blue light blocking glasses as part of your sleep optimization toolkit.\n\nThe ideal sleep environment is cool, dark, and quiet. Temperature between 65-68°F (18-20°C) is optimal for most people. Investing in a quality mattress and pillows that support your preferred sleep position can make a significant difference in sleep quality and morning comfort.",
    excerpt: "Master the art of quality sleep with science-backed strategies for better rest and recovery.",
    author: "Dr. Luna Sleep",
    category: "Wellness",
    tags: ["sleep", "health", "recovery", "wellness"],
    likes: 203,
    comments: [
      {
        id: "6",
        author: "Jennifer Adams",
        content: "Finally sleeping through the night after following these tips!",
        createdAt: "2024-01-21",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      },
    ],
    shares: 67,
    views: 2100,
    createdAt: "2024-01-20",
    imageUrl: "https://images.pexels.com/photos/914910/pexels-photo-914910.jpeg",
    isLiked: false,
  },
  {
    id: "6",
    title: "Stress Management Through Mindfulness",
    content:
      "In our fast-paced world, stress has become a constant companion for many people. Chronic stress not only affects our mental health but also takes a toll on our physical well-being, contributing to various health issues including cardiovascular disease, digestive problems, and weakened immune function. Mindfulness offers a powerful antidote to stress, providing tools to help us respond rather than react to life's challenges. This article explores practical mindfulness techniques that can be easily integrated into daily life, helping you build resilience and find calm amidst the chaos.\n\nMindfulness meditation doesn't require hours of sitting in silence. Even five minutes of focused breathing can activate your body's relaxation response. The key is consistency rather than duration. Start with short sessions and gradually increase as the practice becomes more natural.\n\nMindful eating is another powerful stress management tool. By paying attention to the colors, textures, and flavors of your food, you not only improve digestion but also create moments of calm throughout your day. This practice can transform routine meals into opportunities for mindfulness and stress relief.",
    excerpt: "Learn practical mindfulness techniques to manage stress and cultivate inner peace in daily life.",
    author: "Dr. Zen Mindful",
    category: "Mental Health",
    tags: ["mindfulness", "stress-management", "meditation", "mental-health"],
    likes: 145,
    comments: [
      {
        id: "7",
        author: "Sarah Martinez",
        content: "The breathing exercises have been a game-changer for my anxiety.",
        createdAt: "2024-01-22",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      },
      {
        id: "8",
        author: "Tom Wilson",
        content: "Mindful eating has completely changed my relationship with food.",
        createdAt: "2024-01-23",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&crop=face",
      },
    ],
    shares: 89,
    views: 1650,
    createdAt: "2024-01-21",
    imageUrl: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    isLiked: false,
  },
  {
    id: "7",
    title: "Superfoods: Separating Fact from Fiction",
    content:
      "The term 'superfood' has become ubiquitous in health and wellness circles, but what does it really mean? While there's no official scientific definition of superfoods, the term generally refers to nutrient-dense foods that offer exceptional health benefits. However, the marketing hype around superfoods can sometimes overshadow the importance of a balanced, varied diet. This article examines popular superfoods, their actual nutritional benefits, and how to incorporate them into a healthy eating pattern without breaking the bank or falling for marketing gimmicks.\n\nMany so-called superfoods are indeed nutritionally impressive. Blueberries are packed with antioxidants, salmon provides omega-3 fatty acids, and kale offers vitamins A, C, and K. However, less exotic foods like apples, carrots, and beans also provide significant nutritional value and are often more affordable and accessible.\n\nThe key to optimal nutrition isn't finding the perfect superfood, but rather eating a diverse range of whole foods. Variety ensures you get a wide spectrum of nutrients, and seasonal eating can help you discover new foods while supporting local agriculture and reducing environmental impact.",
    excerpt: "Discover the truth about superfoods and learn how to build a truly nutritious diet without the hype.",
    author: "Nutritionist Kelly Green",
    category: "Nutrition",
    tags: ["superfoods", "nutrition", "healthy-eating", "diet"],
    likes: 98,
    comments: [],
    shares: 34,
    views: 876,
    createdAt: "2024-01-22",
    imageUrl: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg",
    isLiked: false,
  },
  {
    id: "8",
    title: "Home Workout Equipment: Maximizing Small Spaces",
    content:
      "You don't need a fully equipped gym to maintain your fitness routine. With creativity and the right equipment choices, you can create an effective workout space in even the smallest living areas. This guide explores space-efficient exercise equipment, bodyweight exercises, and storage solutions that make home fitness both practical and enjoyable. Whether you're working with a studio apartment or just prefer the convenience of exercising at home, these strategies will help you build and maintain a consistent fitness routine.\n\nResistance bands are perhaps the most versatile and space-efficient piece of exercise equipment you can own. They provide variable resistance for strength training, take up minimal storage space, and are perfect for travel. A set of bands with different resistance levels can replace an entire weight room.\n\nAdjustable dumbbells are another excellent investment for small spaces. Modern designs allow you to change weights quickly and store multiple weight options in the space of just two dumbbells. Pair these with a stability ball that can double as a chair, and you have a complete strength training setup.",
    excerpt:
      "Transform any small space into an effective home gym with smart equipment choices and creative solutions.",
    author: "Fitness Coach Maria Santos",
    category: "Fitness",
    tags: ["home-workout", "fitness", "small-spaces", "equipment"],
    likes: 112,
    comments: [
      {
        id: "9",
        author: "Alex Johnson",
        content: "Perfect timing! Just moved to a tiny apartment and needed this advice.",
        createdAt: "2024-01-24",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
    shares: 56,
    views: 1234,
    createdAt: "2024-01-23",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    isLiked: false,
  },
]

const categories = ["All", "Nutrition", "Mental Health", "Wellness", "Fitness"]

const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How often should I post new content?",
    answer:
      "We recommend posting at least 2-3 times per week to maintain engagement with your audience. Consistency is more important than frequency, so choose a schedule you can maintain long-term.",
    isOpen: false,
  },
  {
    id: "2",
    question: "Can I edit my posts after publishing?",
    answer:
      "Yes, you can edit your posts at any time after publishing. Simply click on the post you want to edit and make your changes. All edits are automatically saved.",
    isOpen: false,
  },
  {
    id: "3",
    question: "How do I increase engagement on my posts?",
    answer:
      "Focus on creating valuable, actionable content that resonates with your audience. Use engaging visuals, ask questions to encourage comments, and respond promptly to reader interactions.",
    isOpen: false,
  },
  {
    id: "4",
    question: "What makes a good blog post title?",
    answer:
      "A good title is clear, specific, and promises value to the reader. It should be compelling enough to encourage clicks while accurately representing the content of your post.",
    isOpen: false,
  },
  {
    id: "5",
    question: "How long should my blog posts be?",
    answer:
      "The ideal length varies by topic and audience, but generally, posts between 1,000-2,000 words perform well. Focus on providing complete, valuable information rather than hitting a specific word count.",
    isOpen: false,
  },
]

export default function HealthyLivingBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showAddPost, setShowAddPost] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Wellness",
    tags: "",
    imageUrl: "",
  })
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const currentTheme = isDarkMode ? theme.dark : theme.light

  const isCreatePostValid = newPost.title.trim() && newPost.content.trim()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  useEffect(() => {
    if (selectedPost || showAddPost) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedPost, showAddPost])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [posts, searchTerm, selectedCategory])

  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 2000)
    if (toasts.length > 1) {
      setToasts((prev) => prev.slice(1))
    }
  }

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked
          const newLikes = newIsLiked ? post.likes + 1 : post.likes - 1
          return { ...post, likes: newLikes, isLiked: newIsLiked }
        }
        return post
      }),
    )

    const post = posts.find((p) => p.id === postId)
    if (post) {
      addToast(post.isLiked ? "Removed from favorites" : "Added to favorites", "success")
    }
  }

  const handleShare = (post: BlogPost) => {
    navigator.clipboard.writeText(`Check out this article: ${post.title}`)
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, shares: p.shares + 1 } : p)))
    addToast("Link copied to clipboard!", "success")
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      createdAt: new Date().toISOString().split("T")[0],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    }

    setPosts((prev) =>
      prev.map((post) => (post.id === selectedPost.id ? { ...post, comments: [...post.comments, comment] } : post)),
    )

    setSelectedPost((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null))
    setNewComment("")
    addToast("Comment added successfully!", "success")
  }

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl))
  }

  const getImageUrl = (imageUrl: string) => {
    if (imageErrors.has(imageUrl) || !imageUrl) {
      return "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg"
    }
    return imageUrl
  }

  const handleAddPost = () => {
    if (!isCreatePostValid) {
      addToast("Please fill in all required fields", "error")
      return
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      excerpt: newPost.excerpt || newPost.content.substring(0, 150) + "...",
      author: "You",
      category: newPost.category,
      tags: newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      likes: 0,
      comments: [],
      shares: 0,
      views: 0,
      createdAt: new Date().toISOString().split("T")[0],
      imageUrl: newPost.imageUrl || "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg",
      isLiked: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost({ title: "", content: "", excerpt: "", category: "Wellness", tags: "", imageUrl: "" })
    setShowAddPost(false)
    addToast("Post created successfully!", "success")
  }

  const openPostDetail = (post: BlogPost) => {
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p)))
    setSelectedPost({ ...post, views: post.views + 1 })
  }

  const toggleFAQ = (faqId: string) => {
    setFaqs((prev) => prev.map((faq) => (faq.id === faqId ? { ...faq, isOpen: !faq.isOpen } : faq)))
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${playfair_display.className}`}
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300"
        style={{ backgroundColor: currentTheme.modalBg, borderColor: currentTheme.border }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                HealthyLife
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: currentTheme.cardBg }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setShowAddPost(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: currentTheme.accent, color: "white" }}
              >
                <Plus size={20} />
                <span className="hidden sm:inline">New Post</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg')",
            filter: "brightness(0.3)"
          }}
        />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Your Journey to Healthy Living Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
              Discover expert advice, practical tips, and inspiring stories to transform your health and wellness
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById("posts")?.scrollIntoView()}
                className="px-8 py-4 rounded-lg font-medium text-lg transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: currentTheme.accent, color: "white" }}
              >
                Explore Articles
              </button>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView()}
                className="px-8 py-4 rounded-lg font-medium text-lg border transition-colors duration-200 cursor-pointer"
                style={{
                  borderColor: "white",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: currentTheme.cardBg }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About HealthyLife</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: currentTheme.textSecondary }}>
              We're passionate about making healthy living accessible, enjoyable, and sustainable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 rounded-lg border-t-4 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              style={{ 
                backgroundColor: currentTheme.bg,
                borderTopColor: currentTheme.accent
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: currentTheme.accent }}
              >
                <Heart size={32} color="white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Content</h3>
              <p style={{ color: currentTheme.textSecondary }}>
                Our articles are written by certified health professionals and backed by scientific research.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 rounded-lg border-t-4 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              style={{ 
                backgroundColor: currentTheme.bg,
                borderTopColor: currentTheme.accent
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: currentTheme.accent }}
              >
                <User size={32} color="white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Driven</h3>
              <p style={{ color: currentTheme.textSecondary }}>
                Join a supportive community of health enthusiasts sharing their journeys and insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 rounded-lg border-t-4 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              style={{ 
                backgroundColor: currentTheme.bg,
                borderTopColor: currentTheme.accent
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: currentTheme.accent }}
              >
                <Tag size={32} color="white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Practical Tips</h3>
              <p style={{ color: currentTheme.textSecondary }}>
                Get actionable advice that you can easily implement in your daily routine.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
              style={{ color: currentTheme.textSecondary }}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${isDarkMode ? "text-white" : "  text-black"}`}
              style={{
                backgroundColor: currentTheme.cardBg,
                borderColor:  isDarkMode ? "white" : "black",
                color: currentTheme.text,
                boxShadow: isDarkMode ? "none" : "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={20} style={{ color: currentTheme.textSecondary }} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 cursor-pointer"
              style={{
                backgroundColor: currentTheme.cardBg,
                borderColor: isDarkMode ? "white" : "black",
                color: currentTheme.text,
                boxShadow: isDarkMode ? "none" : "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer border-b-4 border-green-500"
                style={{ backgroundColor: currentTheme.cardBg }}
                onClick={() => openPostDetail(post)}
              >
                <div className="relative">
                  <img
                    src={getImageUrl(post.imageUrl)}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={() => handleImageError(post.imageUrl)}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: currentTheme.accent }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: currentTheme.textSecondary }}>
                    {post.excerpt}
                  </p>

                  <div
                    className="flex items-center justify-between text-sm mb-4"
                    style={{ color: currentTheme.textSecondary }}
                  >
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{post.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLike(post.id)
                        }}
                        className="flex items-center space-x-1 transition-colors duration-200 cursor-pointer"
                        style={{ color: post.isLiked ? "#ef4444" : currentTheme.textSecondary }}
                      >
                        <Heart size={16} fill={post.isLiked ? "#ef4444" : "none"} stroke={post.isLiked ? "#ef4444" : currentTheme.textSecondary} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(post)
                        }}
                        className="flex items-center space-x-1 transition-colors duration-200 cursor-pointer"
                        style={{ color: currentTheme.textSecondary }}
                      >
                        <Share2 size={16} />
                        <span>{post.shares}</span>
                      </button>

                      <div className="flex items-center space-x-1" style={{ color: currentTheme.textSecondary }}>
                        <MessageCircle size={16} />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1" style={{ color: currentTheme.textSecondary }}>
                      <Eye size={16} />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: currentTheme.textSecondary }}>
              No posts found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: currentTheme.cardBg }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg" style={{ color: currentTheme.textSecondary }}>
              Find answers to common questions about our platform and healthy living.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="border rounded-lg overflow-hidden border-l-4"
                style={{ 
                  borderColor: currentTheme.border, 
                  backgroundColor: currentTheme.bg,
                  borderLeftColor: currentTheme.accent
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform duration-200 ${faq.isOpen ? "rotate-180" : ""}`}
                    style={{ color: currentTheme.textSecondary }}
                  />
                </button>
                <AnimatePresence>
                  {faq.isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p style={{ color: currentTheme.textSecondary }}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: currentTheme.border }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                HealthyLife
              </h3>
              <p className="mb-4 max-w-md" style={{ color: currentTheme.textSecondary }}>
                Empowering you to live your healthiest life through expert advice, practical tips, and a supportive
                community.
              </p>
              
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2" style={{ color: currentTheme.textSecondary }}>
                <li>
                  <a href="#" className="cursor-pointer hover:opacity-80">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:opacity-80">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:opacity-80">
                    Authors
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:opacity-80">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2" style={{ color: currentTheme.textSecondary }}>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>hello@healthylife.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: currentTheme.border }}>
            <p style={{ color: currentTheme.textSecondary }}>
              © 2024 HealthyLife. All rights reserved. Made with Love for your wellness journey.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
              style={{ backgroundColor: currentTheme.modalBg }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={getImageUrl(selectedPost.imageUrl)}
                  alt={selectedPost.title}
                  className="w-full h-48 sm:h-64 object-cover"
                  onError={() => handleImageError(selectedPost.imageUrl)}
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-black bg-opacity-50 text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white w-fit"
                    style={{ backgroundColor: currentTheme.accent }}
                  >
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm" style={{ color: currentTheme.textSecondary }}>
                    <span>{selectedPost.author}</span>
                    <span>{selectedPost.createdAt}</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold mb-4">{selectedPost.title}</h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
                  <button
                    onClick={() => {
                      handleLike(selectedPost.id)
                      setSelectedPost(prev => prev ? {
                        ...prev,
                        isLiked: !prev.isLiked,
                        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
                      } : null)
                    }}
                    className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
                    style={{ color: selectedPost.isLiked ? "#ef4444" : currentTheme.textSecondary }}
                  >
                    <Heart size={20} fill={selectedPost.isLiked ? "#ef4444" : "none"} stroke={selectedPost.isLiked ? "#ef4444" : currentTheme.textSecondary} />
                    <span>{selectedPost.likes}</span>
                  </button>

                  <button
                    onClick={() => {
                      handleShare(selectedPost)
                      setSelectedPost(prev => prev ? {
                        ...prev,
                        shares: prev.shares + 1
                      } : null)
                    }}
                    className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
                    style={{ color: currentTheme.textSecondary }}
                  >
                    <Share2 size={20} />
                    <span>{selectedPost.shares}</span>
                  </button>

                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
                    style={{ color: currentTheme.textSecondary }}
                  >
                    <MessageCircle size={20} />
                    <span>{selectedPost.comments.length}</span>
                  </button>

                  <div className="flex items-center space-x-2" style={{ color: currentTheme.textSecondary }}>
                    <Eye size={20} />
                    <span>{selectedPost.views}</span>
                  </div>
                </div>

                <div className="prose max-w-none mb-8" style={{ color: currentTheme.text }}>
                  {selectedPost.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-sm sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm border"
                      style={{
                        borderColor: currentTheme.border,
                        backgroundColor: currentTheme.bg,
                        color: currentTheme.textSecondary,
                      }}
                    >
                      <Tag size={12} className="inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-6"
                      style={{ borderColor: currentTheme.border }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold mb-4">Comments ({selectedPost.comments.length})</h3>

                      <div className="mb-6">
                        <div className="flex space-x-3 sm:space-x-4">
                          <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                            alt="Your avatar"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="w-full p-3 rounded-lg border resize-none transition-colors duration-200 focus:outline-none focus:ring-2 text-sm sm:text-base"
                              style={{
                                backgroundColor: currentTheme.cardBg,
                                borderColor: currentTheme.border,
                                color: currentTheme.text,
                              }}
                              rows={3}
                            />
                            <button
                              onClick={handleAddComment}
                              disabled={!newComment.trim()}
                              className="mt-2 flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                              style={{ backgroundColor: currentTheme.accent, color: "white" }}
                            >
                              <Send size={16} />
                              <span>Post Comment</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {selectedPost.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3 sm:space-x-4">
                            <img
                              src={comment.avatar || "/placeholder.svg"}
                              alt={comment.author}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <span className="font-medium text-sm sm:text-base">{comment.author}</span>
                                <span className="text-xs sm:text-sm" style={{ color: currentTheme.textSecondary }}>
                                  {comment.createdAt}
                                </span>
                              </div>
                              <p className="text-sm sm:text-base" style={{ color: currentTheme.textSecondary }}>
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowAddPost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-4 sm:p-8"
              style={{ backgroundColor: currentTheme.modalBg }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Create New Post</h2>
                <button
                  onClick={() => setShowAddPost(false)}
                  className="p-2 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{ backgroundColor: currentTheme.cardBg }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.border,
                      color: currentTheme.text,
                    }}
                    placeholder="Enter post title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 cursor-pointer"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.border,
                      color: currentTheme.text,
                    }}
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full p-3 rounded-lg border resize-none transition-colors duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.border,
                      color: currentTheme.text,
                    }}
                    rows={3}
                    placeholder="Brief description of your post..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content *</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    className="w-full p-3 rounded-lg border resize-none transition-colors duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.border,
                      color: currentTheme.text,
                    }}
                    rows={8}
                    placeholder="Write your post content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, tags: e.target.value }))}
                    className="w-full p-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.border,
                      color: currentTheme.text,
                    }}
                    placeholder="Enter tags separated by commas..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newPost.imageUrl}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full p-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.border,
                      color: currentTheme.text,
                    }}
                    placeholder="https://example.com/image.jpg (optional - will use default if invalid)"
                  />
                  <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
                    Leave empty or provide a valid image URL. Invalid URLs will use a default image.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleAddPost}
                    disabled={!isCreatePostValid}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      isCreatePostValid ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    style={{
                      backgroundColor: isCreatePostValid ? currentTheme.accent : currentTheme.textSecondary,
                      color: "white",
                      opacity: isCreatePostValid ? 1 : 0.6,
                    }}
                  >
                    Create Post
                  </button>
                  <button
                    onClick={() => setShowAddPost(false)}
                    className="flex-1 py-3 rounded-lg font-medium border transition-colors duration-200 cursor-pointer"
                    style={{
                      borderColor: currentTheme.border,
                      backgroundColor: currentTheme.cardBg,
                      color: currentTheme.text,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium max-w-sm ${
                toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
