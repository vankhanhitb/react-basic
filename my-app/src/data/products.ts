
import { 
  BasicTee61,
  BasicTee62,
  BasicTee63,
  BasicTee64,
} from "../assets/products/BasicTee";

import {
  FleeceHoodieKids192,
  FleeceHoodieKids193,
  FleeceHoodieKids194
} from "../assets/products/FleeceHoodieKids";

import {
  StripeBeanieBrown102,
  StripeBeanieBrown103,
} from "../assets/products/StripeBeanieBrown";

import {
  CuffedShortsKhaki131,
  CuffedShortsKhaki132,
  CuffedShortsKhaki133,
  CuffedShortsKhaki134,
} from "../assets/products/CuffedShortsKhaki";

import {
  LeatherSandalsBrown110,
  LeatherSandalsBrown111,
  LeatherSandalsBrown112,
  LeatherSandalsBrown113,
} from "../assets/products/LeatherSandalsBrown";

import {
  FloralKnitMint84,
  FloralKnitMint85,
  FloralKnitMint86,
  FloralKnitMint87,
} from "../assets/products/FloralKnitMint";

import {
  WaveKnitTop65,
  WaveKnitTop66,
  WaveKnitTop67,
} from "../assets/products/WaveKnitTop";

import {
  SneakersGreen114,
  SneakersGreen115,
  SneakersGreen116,
  SneakersGreen117
} from "../assets/products/SneakersGreen";

import {
  LogoPoloRed121,
  LogoPoloRed122,
  LogoPoloRed123,
  LogoPoloRed124,
} from "../assets/products/LogoPoloRed";

import {
  SleevelessTopYellow216,
  SleevelessTopYellow217,
  SleevelessTopYellow218,
} from "../assets/products/SleevelessTopYellow";

import {
  StripedKnitBag98,
  StripedKnitBag99,
  StripedKnitBag100,
  StripedKnitBag101,
} from "../assets/products/StripedKnitBag";

import {
  BucketHatGreen106,
  BucketHatGreen107,
  BucketHatGreen108,
  BucketHatGreen109,
} from "../assets/products/BucketHatGreen";

import {
  CottonPoloGreen161,
  CottonPoloGreen162,
  CottonPoloGreen163,
} from "../assets/products/CottonPoloGreen";

import {
  PocketVest42,
  PocketVest43,
  PocketVest44,
} from "../assets/products/PocketVest";

import {
  DenimCollarTop19,
  DenimCollarTop20,
  DenimCollarTop21,
} from "../assets/products/DenimCollarTop";

import {
  StripePoloPink34,
  StripePoloPink35,
  StripePoloPink36,
  StripePoloPink37,
} from "../assets/products/StripePoloPink";

import {
  StripeShorts207,
  StripeShorts208,
  StripeShorts209,
  StripeShorts210,
} from "../assets/products/StripeShorts";

import {
  DenimShortsBlue13,
  DenimShortsBlue14,
  DenimShortsBlue15,
  DenimShortsBlue16,
} from "../assets/products/DenimShortsBlue";

import {
  CanvasSneaker203,
  CanvasSneaker204,
  CanvasSneaker205,
} from "../assets/products/CanvasSneaker";

type Color = {
  name: string,
  color: string,
}

type Size = {
  name: string,
  value: string,
}

type Image = {
  src: string
}
type Tag = {
  name: string,
}

type Badges = {
  name: string
}

type Category = {
  name: string
}

export type productType = {
  productId: number,
  name: string,
  price: {
    salePrice: string,
    onSalePrice?: string,
  },
  description?: string,
  options?: {
    colors?: Color[],
    sizes?: Size[]
  },
  images?: {
    featuredImage?: string,
    gallery?: Image[]
  },
  avalable?: boolean,
  tag?: Tag[],
  featured?: boolean,
  badges?: Badges[],
  categories?: Category[],
}

export const productsData: productType[] = [
  {
    productId: 1,
    name: "Basic Tee",
    price: {
      salePrice: "32",
      onSalePrice: "22",
    },
    description: "This essential tee showcases a refined ribbed construction that provides both tactile appeal and reliable support.",
    options: {
      colors: [
        {name: "blue", color: "#9fc6ed"},
        {name: "gray", color: "#C6C8C9"},
        {name: "white", color: "#2A2E36"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: BasicTee61,
      gallery: [
        {src: BasicTee62},
        {src: BasicTee63},
        {src: BasicTee64},
      ]
    },
    avalable:true,
    tag: [
      {name: "Children"},
      {name: "Autum"},
    ],
    featured: true,
    badges: [
      {name: "new"}
    ],
    categories: [
      {name: "Accessories"},
      {name: "Outerwear"}
    ]
  },
  {
    productId: 2,
    name: "Fleece Jogger Pants",
    price: {
      salePrice: "23"
    },
    description: "Engineered for comfort and versatility, these fleece jogger pants deliver warmth without bulk.",
    options: {
      colors: [
        {name: "Mud", color: "#8A846F"},
        {name: "Cream", color: "#F0E7D6"},
        {name: "Fade Rose", color: "#B6656A"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: FleeceHoodieKids192,
      gallery: [
        {src: FleeceHoodieKids193},
        {src: FleeceHoodieKids194},
      ]
    },
    avalable:true,
    tag: [
      {name: "Children"},
      {name: "Summer"},
    ],
    featured: true,
    badges: [
      {name: "Hot"}
    ],
    categories: [
      {name: "Accessories"},
      {name: "Outerwear"},
    ]
  },
  {
    productId: 3,
    name: "Stripe Backpack Brown",
    price: {
      salePrice: "55"
    },
    description: "The Stripe Backpack in brown combines timeless style with practical functionality.",
    options: {
      colors: [
        {name: "Brown", color: "#9A7359"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: StripeBeanieBrown102,
      gallery: [
        {src: StripeBeanieBrown102},
        {src: StripeBeanieBrown103},
      ]
    },
    avalable:true,
    tag: [
      {name: "Children"},
      {name: "Summer"},
    ],
    featured: true,
    badges: [
      {name: "New Arrive"}
    ],
    categories: [
      {name: "Accessories"},
      {name: "Outerwear"},
    ]
  },
  {
    productId: 4,
    name: "Cuffed Shorts Khaki",
    price: {
      salePrice: "45"
    },
    description: "These khaki cuffed shorts combine natural linen construction with refined tailoring for warm-weather versatility.",
    options: {
      colors: [
        {name: "Green", color: "#263337"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: CuffedShortsKhaki131,
      gallery: [
        {src: CuffedShortsKhaki132},
        {src: CuffedShortsKhaki133},
        {src: CuffedShortsKhaki134},
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Sets"},
    ]
  },
  {
    productId: 5,
    name: "Leather Sandals Brown",
    price: {
      salePrice: "55"
    },
    description: "Crafted from premium full-grain leather, these brown sandals deliver timeless style with exceptional durability. ",
    options: {
      colors: [
        {name: "Brown", color: "#9A7359"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: LeatherSandalsBrown110,
      gallery: [
        {src: LeatherSandalsBrown111},
        {src: LeatherSandalsBrown112},
        {src: LeatherSandalsBrown113},
      ]
    },
    categories: [
      {name: "Outerwear"},
      {name: "Sets"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 6,
    name: "Floral Pant Mint",
    price: {
      salePrice: "32",
      onSalePrice: "22",
    },
    description: "Expertly crafted with deliberate attention to detail, this floral knit features a lightweight construction",
    options: {
      colors: [
        {name: "Pink", color: "#E4B2CA"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: FloralKnitMint84,
      gallery: [
        {src: FloralKnitMint85},
        {src: FloralKnitMint86},
        {src: FloralKnitMint87},
      ]
    },
    categories: [
      {name: "Outerwear"},
      {name: "Pants"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 7,
    name: "Wave Knit Top",
    price: {
      salePrice: "45",
    },
    description: "Crafted with meticulous attention to detail, this knit top features a sophisticated ribbed texture",
    options: {
      colors: [
        {name: "Black", color: "#000000"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: WaveKnitTop65,
      gallery: [
        {src: WaveKnitTop66},
        {src: WaveKnitTop67},
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Pants"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 8,
    name: "Sneakers Green",
    price: {
      salePrice: "60",
    },
    description: "Engineered for performance and everyday versatility, these green sneakers combine responsive cushioning",
    options: {
      colors: [
        {name: "Green", color: "#2C956C"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: SneakersGreen114,
      gallery: [
        {src: SneakersGreen115},
        {src: SneakersGreen116},
        {src: SneakersGreen117},
      ]
    },
    categories: [
      {name: "Pants"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 9,
    name: "Logo Polo Red",
    price: {
      salePrice: "45",
    },
    description: "Elevate your casual wardrobe with this classic red polo shirt, featuring a refined embroidered logo",
    options: {
      colors: [
        {name: "Red", color: "#B12A2B"}
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: LogoPoloRed121,
      gallery: [
        {src: LogoPoloRed122},
        {src: LogoPoloRed123},
        {src: LogoPoloRed124},
      ]
    },
    categories: [
      {name: "sweaters"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 10,
    name: "Sleeveless Top",
    price: {
      salePrice: "26",
    },
    description: "Engineered for versatility, this sleeveless top delivers effortless layering and standalone wear. ",
    options: {
      colors: [
        {name: "Pink", color: "#E4B2CA"},
        {name: "Yellow", color: "#ECD15D"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: SleevelessTopYellow216,
      gallery: [
        {src: SleevelessTopYellow217},
        {src: SleevelessTopYellow218},
      ]
    },
    categories: [
      {name: "sweaters"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 11,
    name: "Striped Knit Bag",
    price: {
      salePrice: "55",
    },
    description: "Expertly constructed with purposeful design, this striped knit bag merges everyday practicality with understated sophistication.",
    options: {
      colors: [
        {name: "Brown", color: "#9A7359"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: StripedKnitBag98,
      gallery: [
        {src: StripedKnitBag99},
        {src: StripedKnitBag100},
        {src: StripedKnitBag101},
      ]
    },
    categories: [
      {name: "Outerwear"},
      {name: "Sets"},
      {name: "T-Shirts"}
    ]
  },
  {
    productId: 12,
    name: "Bucket Hat Green",
    price: {
      salePrice: "55",
    },
    description: "Expertly constructed with purposeful design, this striped knit bag merges everyday practicality with understated sophistication.",
    options: {
      colors: [
        {name: "Brown", color: "#9A7359"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: BucketHatGreen106,
      gallery: [
        {src: BucketHatGreen107},
        {src: BucketHatGreen108},
        {src: BucketHatGreen109},
      ]
    },
    categories: [
      {name: "Outerwear"},
      {name: "Sets"},
      {name: "T-Shirts"}
    ]
  },
  {
    productId: 13,
    name: "Cotton Polo",
    price: {
      salePrice: "30",
    },
    description: "A timeless cotton polo in a sophisticated green shade, crafted for versatility and comfort. The breathable fabric makes it ideal",
    options: {
      colors: [
        {name: "Navy", color: "#1E5279"},
        {name: "Purple", color: "#D0B9E5"},
        {name: "Olive", color: "#A8AE85"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: CottonPoloGreen161,
      gallery: [
        {src: CottonPoloGreen162},
        {src: CottonPoloGreen163}
      ]
    },
    categories: [
      {name: "Outerwear"},
      {name: "Sets"},
      {name: "T-Shirts"}
    ]
  },
  {
    productId: 14,
    name: "Pocket Vest",
    price: {
      salePrice: "55",
    },
    description: "Built from high-quality fleece, this vest embodies elegant simplicity with its timeless design. ",
    options: {
      colors: [
        {name: "Pink", color: "#E4B2CA"},
        {name: "Navy", color: "#1E5279"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: PocketVest42,
      gallery: [
        {src: PocketVest43},
        {src: PocketVest44}
      ]
    },
    categories: [
      {name: "Outerwear"},
      {name: "Sets"},
      {name: "T-Shirts"}
    ]
  },
  {
    productId: 15,
    name: "Denim Collar Top",
    price: {
      salePrice: "75",
    },
    description: "This denim collar top delivers understated sophistication in a timeless blue hue. Constructed from premium denim",
    options: {
      colors: [
        {name: "Navy", color: "#1E5279"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: DenimCollarTop19,
      gallery: [
        {src: DenimCollarTop20},
        {src: DenimCollarTop21}
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Sets"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 16,
    name: "Stripe Polo Pink",
    price: {
      salePrice: "55",
    },
    description: "Engineered from superior fleece, this hoodie showcases quiet refinement through its neutral beige tone.",
    options: {
      colors: [
        {name: "Pink/Cherry", color: "#672331"},
        {name: "Cream/Brown", color: "#9A7359"},
        {name: "White", color: "#F1F1F1"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: StripePoloPink34,
      gallery: [
        {src: StripePoloPink35},
        {src: StripePoloPink36},
        {src: StripePoloPink37},
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Sets"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 17,
    name: "Stripe Shorts",
    price: {
      salePrice: "25",
    },
    description: "Stripe Shorts combine timeless pattern appeal with modern comfort. Crafted from breathable fabric, these shorts feature classic",
    options: {
      colors: [
        {name: "Pink/Cherry", color: "#672331"},
        {name: "Cream/Brown", color: "#9A7359"},
        {name: "White", color: "#F1F1F1"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: StripeShorts207,
      gallery: [
        {src: StripeShorts208},
        {src: StripeShorts209},
        {src: StripeShorts210},
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Sets"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 18,
    name: "Denim Shorts Blue",
    price: {
      salePrice: "45",
    },
    description: "Classic blue denim shorts crafted for everyday versatility. The timeless indigo wash pairs effortlessly with casual tees",
    options: {
      colors: [
        {name: "Blue", color: "#9FC6ED"},
        {name: "Navy", color: "#1E5279"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: DenimShortsBlue13,
      gallery: [
        {src: DenimShortsBlue14},
        {src: DenimShortsBlue15},
        {src: DenimShortsBlue16},
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Sets"},
      {name: "Shirts"}
    ]
  },
  {
    productId: 19,
    name: "Canvas Sneaker",
    price: {
      salePrice: "50",
    },
    description: "Canvas Sneaker Crafted from durable canvas uppers, this versatile sneaker delivers everyday comfort with a timeless silhouette.",
    options: {
      colors: [
        {name: "Blue", color: "#9FC6ED"},
        {name: "Cream", color: "#F0E7D6"},
      ],
      sizes: [
        {name: "3Y", value: "3Y"},
        {name: "4Y", value: "4Y"},
        {name: "5Y", value: "5Y"},
        {name: "6Y", value: "6Y"}
      ]
    },
    images: {
      featuredImage: CanvasSneaker203,
      gallery: [
        {src: CanvasSneaker204},
        {src: CanvasSneaker205},
      ]
    },
    categories: [
      {name: "Accessories"},
      {name: "Sets"},
      {name: "Shirts"}
    ]
  }

]