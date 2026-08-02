import {
  Accessories,
  CollectionTabs,
  Outerwear,
  Pants,
  Sets,
  Shirts,
  Sweaters,
  TShirts
} from "../assets/collections";

type colellectionType = {
  id: number,
  name: string,
  image?: string,
  productId?: Array<number>
}

export const collectionData: colellectionType[] = [
  {
    id: 1,
    name: "Accessories",
    image: Accessories,
    productId: [1,2,3,4,7,8,9,10,15,16,17,18,19]
  },
  {
    id: 2,
    name: "Shirts",
    image: Shirts,
    productId: [1,2,3,4,4,6,7,8,9,10,15,16,17,18,19]
  },
  {
    id: 3,
    name: "Outerwear",
    image: Outerwear,
  },
  {
    id: 4,
    name: "Pants",
    image: Pants,
  },
  {
    id: 5,
    name: "Sets",
    image: Sets,
  },
  {
    id: 6,
    name: "Sweaters",
    image: Sweaters,
  },
  {
    id: 7,
    name: "T-Shirts",
    image: TShirts,
  }
]