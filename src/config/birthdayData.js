/**
 * ============================================================================
 * CENTRAL CONFIGURATION FOR RAJ NANDANI'S BIRTHDAY SURPRISE
 * Multi-Step Screen-by-Screen Experience
 * ============================================================================
 */

export const birthdayData = {
  // Recipient
  name: "Raj Nandani",
  nickname: "Raj",

  // Theme styling tokens
  colors: {
    softPink: "#fce7f3",
    pinkMid: "#f472b6",
    lavenderSoft: "#ede9fe",
    lavenderMid: "#c084fc",
    peach: "#fed7aa",
    peachMid: "#fb923c",
    warmCream: "#fffdfa",
    subtleGold: "#fbbf24",
    goldDeep: "#f59e0b",
    darkBackground: "#0a040e"
  },

  // PAGE 1 — Welcome
  welcome: {
    badge: "Special Day ✨",
    intro: "Welcome to a Little Birthday Surprise ✨",
    recipientName: "Raj Nandani",
    subtext: "Someone truly wonderful deserves something truly special.",
    enterButton: "Enter the Celebration 🎁"
  },

  // PAGE 2 — Birthday Café & Restaurant
  cafe: {
    badge: "Special Invitation 🍽️",
    title: "✨ RAJ'S BIRTHDAY CAFÉ ✨",
    subtitle: "Today's Special Celebration",
    menuHeader: "SPECIAL CELEBRATION MENU",
    menuItems: [
      { id: 1, icon: "🥂", name: "Happiness", desc: "Served chilled with endless smiles" },
      { id: 2, icon: "🍰", name: "Birthday Cake", desc: "Baked with sweetness and joy" },
      { id: 3, icon: "🌸", name: "Beautiful Memories", desc: "Preserved moments worth cherishing" },
      { id: 4, icon: "🎁", name: "Little Surprises", desc: "Thoughtful blessings just for you" },
      { id: 5, icon: "✨", name: "Good Luck & Dreams", desc: "Sprinkled over your upcoming year" }
    ],
    specialSectionTitle: "Today's Special",
    specialItem: {
      title: "🎂 Birthday Special",
      description: "One unforgettable day, served with happiness."
    },
    orderButton: "Place Birthday Order 🎂",
    orderConfirmed: "Order Confirmed ✨",
    receiptDetails: {
      orderNo: "BDAY-2026-RAJ",
      table: "VIP Birthday Suite",
      server: "Warmest Wishes",
      total: "PRICELESS 💖"
    },
    continueButton: "Continue →"
  },

  // PAGE 3 — Balloon Celebration
  balloons: {
    title: "Your Celebration Has Started 🎈",
    subtitle: "Tap the button to release the balloons, then tap them to pop!",
    releaseButton: "Tap to Release the Balloons",
    perfectMessage: "Perfect! 🎉",
    perfectSubtext: "The celebration is officially underway!",
    continueButton: "Continue to the Cake →",
    count: 8,
    colors: [
      "#FF6B8B", "#C084FC", "#FB923C", "#FBBF24",
      "#EC4899", "#A855F7", "#F472B6", "#38BDF8"
    ]
  },

  // PAGE 4 — Birthday Cake
  cake: {
    title: "Something Sweet Is Waiting... 🎂",
    subtitle: "Every birthday needs a sweet cake and a heartfelt wish.",
    makeWishButton: "Make a Wish ✨",
    wishMadeTitle: "Wish made. ✨",
    wishMessage: "May this year give you countless reasons to smile.",
    continueButton: "Continue →"
  },

  // PAGE 5 — Memory Gallery
  memories: {
    title: "A Few Beautiful Memories 📸",
    subtitle: "Some moments are worth keeping forever.",
    photos: [
      {
        id: 1,
        image: "/assets/images/raj-1.jpg",
        caption: "One beautiful moment ✨",
        tag: "Radiant Smiles"
      },
      {
        id: 2,
        image: "/assets/images/raj-2.jpg",
        caption: "Grace, elegance, and warmth in every step 🌸",
        tag: "Pure Elegance"
      },
      {
        id: 3,
        image: "/assets/images/raj-3.jpg",
        caption: "A genuine heart that brings light to everyone around 🌟",
        tag: "Bright Light"
      },
      {
        id: 4,
        image: "/assets/images/raj-4.jpg",
        caption: "Unfiltered laughter and wonderful memories 💫",
        tag: "Golden Days"
      },
      {
        id: 5,
        image: "/assets/images/raj-5.jpg",
        caption: "Celebrating the wonderful friend that you are 🌷",
        tag: "True Friendship"
      }
    ],
    completedBadge: "Memories saved ❤️",
    continueButton: "Continue →"
  },

  // PAGE 6 — Birthday Letter
  letter: {
    title: "A Little Message For You 💌",
    openButton: "Open Letter",
    paragraphs: [
      "Some people have a way of making ordinary days feel a little brighter just by being around.",
      "Today is your day, and I hope you take a moment to appreciate how amazing you are.",
      "May you always keep smiling, keep dreaming, keep growing, and keep being the wonderful person you are.",
      "Wishing you a year filled with happiness, laughter, beautiful memories and countless reasons to smile.",
      "Happy Birthday, Raj Nandani! 🎂✨"
    ],
    signature: "From your friend with warmest wishes ✨",
    deliveredBadge: "Message Delivered 💌",
    continueButton: "Continue →"
  },

  // PAGE 7 — Gift Shop
  giftShop: {
    heading: "Raj's Little Gift Shop 🎁",
    subtitle: "Open each little surprise box curated exclusively for you.",
    gifts: [
      {
        id: 1,
        number: "01",
        icon: "🎁",
        openPrompt: "Open Me",
        message: "May your days always be filled with happiness."
      },
      {
        id: 2,
        number: "02",
        icon: "🌸",
        openPrompt: "Open Me",
        message: "Never stop being yourself."
      },
      {
        id: 3,
        number: "03",
        icon: "✨",
        openPrompt: "Open Me",
        message: "Here's to another year of amazing memories."
      }
    ],
    completedBadge: "All gifts opened! 🎉",
    continueButton: "Final Surprise →"
  },

  // FINAL PAGE — Grand Birthday Celebration
  finale: {
    revealIntro: "One Last Surprise...",
    recipientName: "RAJ NANDANI",
    greeting: "🎉 HAPPY BIRTHDAY 🎉",
    message: "May this new year of your life be filled with happiness, laughter, success, unforgettable memories and beautiful moments.",
    quote: "“May your year ahead be as bright and wonderful as your smile.”",
    restartButton: "Celebrate Again 🎉"
  },

  // Music configuration
  audio: {
    sources: [
      "/assets/audio/birthday-music.mp3",
      "/assets/birthday-music.mp3",
      "/assets/music/birthday.mp3"
    ]
  }
};
