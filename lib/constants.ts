export const SHOP = {
  name: "Barber Oz",
  address: "Waldorpstraat 273",
  city: "2521 CJ Den Haag",
  phone: "06 42 14 30 41",
  whatsapp: "31642143041",
  instagram: "barber_oz",
  instagramUrl: "https://www.instagram.com/barber_oz?igsh=MWx2NDhlZDYzczk1cg==",
  hours: {
    weekdays: "Ma–Vr: 09:00 – 19:00",
    saturday: "Za: 09:00 – 17:00",
    sunday: "Zo: Gesloten",
  },
  mapsEmbed:
    "https://maps.google.com/maps?q=Waldorpstraat+273+Den+Haag&output=embed",
  rating: 4.9,
  reviewCount: 87,
};

export const SERVICES = [
  {
    id: "classic",
    icon: "✂",
    name: { nl: "Classic Knipbeurt", en: "Classic Haircut" },
    desc: {
      nl: "Tijdloze precisie. Een perfecte knipbeurt op maat.",
      en: "Timeless precision. A perfect haircut tailored to you.",
    },
    price: "€25",
    duration: { nl: "30 min", en: "30 min" },
  },
  {
    id: "fade",
    icon: "◈",
    name: { nl: "Skin Fade", en: "Skin Fade" },
    desc: {
      nl: "Vloeiende overgangen, scherpe contouren.",
      en: "Smooth transitions, sharp lines.",
    },
    price: "€30",
    duration: { nl: "45 min", en: "45 min" },
    popular: true,
  },
  {
    id: "beard",
    icon: "◉",
    name: { nl: "Baardverzorging", en: "Beard Trim" },
    desc: {
      nl: "Strak getrimd of volledig gevormd — jouw keuze.",
      en: "Tightly trimmed or fully sculpted — your choice.",
    },
    price: "€15",
    duration: { nl: "20 min", en: "20 min" },
  },
  {
    id: "shave",
    icon: "◇",
    name: { nl: "Hot Towel Scheren", en: "Hot Towel Shave" },
    desc: {
      nl: "Klassiek scheren met warm doek. De ultieme ontspanning.",
      en: "Classic straight razor shave with hot towel. The ultimate relaxation.",
    },
    price: "€20",
    duration: { nl: "30 min", en: "30 min" },
  },
  {
    id: "combo",
    icon: "◆",
    name: { nl: "Combo Deal", en: "Combo Deal" },
    desc: {
      nl: "Knipbeurt + baard in één sessie. De complete behandeling.",
      en: "Haircut + beard in one session. The full treatment.",
    },
    price: "€40",
    duration: { nl: "60 min", en: "60 min" },
  },
];

export const REVIEWS = [
  {
    name: "Daan V.",
    rating: 5,
    date: "April 2025",
    text: {
      nl: "Absoluut de beste barbershop in Den Haag. Oz weet precies wat je wil zonder dat je het hoeft uit te leggen.",
      en: "Absolutely the best barbershop in Den Haag. Oz knows exactly what you want without you having to explain.",
    },
  },
  {
    name: "Mohammed A.",
    rating: 5,
    date: "Maart 2025",
    text: {
      nl: "Perfecte fade elke keer. De sfeer is ontspannen en het resultaat is altijd top.",
      en: "Perfect fade every time. The atmosphere is relaxed and the result is always great.",
    },
  },
  {
    name: "Lars B.",
    rating: 5,
    date: "Februari 2025",
    text: {
      nl: "Kom hier al twee jaar. Nooit teleurgesteld. De winkel is prachtig, de service is premium.",
      en: "Been coming here for two years. Never disappointed. The shop is beautiful, the service is premium.",
    },
  },
  {
    name: "Youssef K.",
    rating: 5,
    date: "Januari 2025",
    text: {
      nl: "Oz is niet zomaar een kapper — hij is een artiest. Ik vertrouw niemand anders met mijn haar.",
      en: "Oz isn't just a barber — he's an artist. I trust no one else with my hair.",
    },
  },
  {
    name: "Thomas H.",
    rating: 5,
    date: "December 2024",
    text: {
      nl: "Geweldige ervaring van begin tot eind. Warm welkom, perfecte knipbeurt, goede prijs.",
      en: "Great experience from start to finish. Warm welcome, perfect haircut, good price.",
    },
  },
];

const B = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const GALLERY_IMAGES = [
  {
    src: `${B}/photos/cut-1.jpg`,
    alt: "Classic slicked back haircut",
    label: "Classic Cut",
  },
  {
    src: `${B}/photos/cut-2.jpg`,
    alt: "Skin fade",
    label: "Skin Fade",
  },
  {
    src: `${B}/photos/cut-3.jpg`,
    alt: "Fade with beard",
    label: "Fade + Beard",
  },
  {
    src: `${B}/photos/interior.jpg`,
    alt: "Barber Oz interior",
    label: "The Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    alt: "Precision work",
    label: "Precision",
  },
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
    alt: "Combo treatment",
    label: "Full Treatment",
  },
];

export const BEFORE_AFTER = [
  {
    before: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
    after: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
    label: "Classic Transformation",
  },
];
