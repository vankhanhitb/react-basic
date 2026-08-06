import React from 'react';
import { FiArrowRight } from "react-icons/fi";

import {
  Accessories,
  CollectionTabs,
  Outerwear,
  Pants,
  Sets,
  Shirts,
  Sweaters,
  TShirts
} from "../../assets/collections";

export default function CollectionList() {
  return (
    <div>
      <div className="container m-auto mt-25">
        <h2 className="text-3xl font-800 uppercase mb-5">Summer Collections</h2>
      </div>
      <div className="container m-auto collection-list__gallery grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="collection-list__gallery-item relative col-span-1 md:col-span-4 aspect-4/3 md:ascept-auto md:self-stretch rounded-lg overflow-hidden">
          <img 
            src={Accessories} 
            alt="Collection Image" 
            className="
              w-full h-full 
              absolute top-0 left-0 
              object-cover
              transition-scale
              duration-300
              scale-100
              hover:scale-105
            "
          />
          <h3 
            className="
              absolute
              bottom-4 left-4
              group
              z-5
              flex flex-row flex-nowrap items-center gap-2 
              text-2xl capitalize text-black
              font-300
              cursor-pointer
            "
          >
            Accessories <FiArrowRight className="transition-translate duration-300 translate-x-0 group-hover:translate-x-2" />
          </h3>
        </div>
        <div className="collection-list__gallery-item relative col-span-1 md:col-span-2 rounded-lg overflow-hidden">
          <img src={CollectionTabs} alt="Collection Image" 
            className="
              w-full h-full 
              absolute top-0 left-0 
              object-cover
              transition-scale
              duration-300
              scale-100
              hover:scale-105
            " 
          />
          <h3 
            className="
              absolute
              bottom-4 left-4
              group
              z-5
              flex flex-row flex-nowrap items-center gap-2 
              text-2xl capitalize text-black
              font-300
              cursor-pointer"
          >
            Summer Gallery <FiArrowRight className="transition-translate duration-300 translate-x-0 group-hover:translate-x-2" />
          </h3>
        </div>
        <div className="collection-list__gallery-item relative col-span-1 md:col-span-2 aspect-4/3 rounded-lg overflow-hidden">
          <img src={Outerwear} alt="Collection Image" 
            className="
              w-full h-full 
              absolute top-0 left-0 
              object-cover
              transition-scale
              duration-300
              scale-100
              hover:scale-105
            " 
          />
          <h3 
            className="
              absolute
              bottom-4 left-4
              group
              z-5
              flex flex-row flex-nowrap items-center gap-2 
              text-2xl capitalize text-black
              font-300
              cursor-pointer"
            >
              Outerwear <FiArrowRight className="transition-translate duration-300 translate-x-0 group-hover:translate-x-2" />
            </h3>
        </div>
        <div className="collection-list__gallery-item relative col-span-1 md:col-span-2 rounded-lg overflow-hidden">
          <img src={Pants} alt="Collection Image" 
            className="
              w-full h-full 
              absolute top-0 left-0 
              object-cover
              transition-scale
              duration-300
              scale-100
              hover:scale-105
            " 
          />
          <h3 className="
            absolute
            bottom-4 left-4
            group
            z-5
            flex flex-row flex-nowrap items-center gap-2 
            text-2xl capitalize text-black
            font-300
            cursor-pointer
          ">
            Pants <FiArrowRight className="transition-translate duration-300 translate-x-0 group-hover:translate-x-2" />
          </h3>
        </div>
        <div className="collection-list__gallery-item relative col-span-1 md:col-span-2 rounded-lg overflow-hidden">
          <img src={Sets} alt="Collection Image" 
            className="
              w-full h-full 
              absolute top-0 left-0 
              object-cover
              transition-scale
              duration-300
              scale-100
              hover:scale-105
            " 
          />
          <h3 className="
            absolute
            bottom-4 left-4
            group
            z-5
            flex flex-row flex-nowrap items-center gap-2 
            text-2xl capitalize text-black
            font-300
            cursor-pointer
          ">
            Sets <FiArrowRight className="transition-translate duration-300 translate-x-0 group-hover:translate-x-2" />
          </h3>
        </div>
      </div>
    </div>
  )
}
