import { useState, useEffect, type ChangeEvent, } from 'react';
import { IoMdSearch } from "react-icons/io";
import { productsData, type productType } from "../../data/products";
import { formattedPrice } from "../../ulti/formatPrice";

export default function Search() {
  const [keyword, setKeyword] = useState<string>("");
  // const [products, setProducts] = useState<productType[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }

  const searchTerm = keyword.trim().toLowerCase();
  const hasSearchTerm = searchTerm.length > 0;

  const searchResults = hasSearchTerm
  ? productsData.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm) ?? false;

    // const matchesDescription = product.description?.toLowerCase().includes(searchTerm) ?? false;

    return matchesName;
  }) 
  : [];

  // useEffect(() => {
  //   const filterData = () => {
  //     if(!keyword || keyword === ""){
  //       setProducts([]);
  //     }else{
  //       const productSearch = productsData.filter((item) => {
  //         return item.name.includes(keyword) || item.description?.includes(keyword);
  //       })
  //       setProducts(productSearch);
  //     }
  //   }
  //   filterData();
  //   return () => {
  //     setProducts([]);
  //   }
  // }, [keyword])
  
  return (
  <div className="relative group hidden sm:block">
    <input
      onChange={(e) => handleChange(e)}
      type="text"
      name="searchBar"
      value={keyword}
      placeholder="Search..."
      className="w-50 sm:w-50 group-hover:w-75 px-2 py-1 border rounded-full border-gray-300 transition-all duration-300 focus:outline-none focus:border focus:w-75 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
    />
    <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
    { hasSearchTerm &&
      <div className="w-95 max-h-150 h-fit absolute z-50 top-full left-0 p-5 flex flex-col gap-y-3 rounded-lg bg-white shadow-lg overflow-y-scroll">
        {searchResults.length > 0 ? searchResults.map((item,index) => {
          return(
            <div key={`${index}-${item.name}`} className="flex flex-row gap-x-3 not-last:border-b border-gray-100 not-last:pb-3">
              <div className="product-search__image w-15 overflow-hidden rounded-lg">
                <img src={item.images?.featuredImage} alt={item.name} className="w-full h-auto object-cover" />
              </div>
              <div>
                <h2 className="text-md">{item.name}</h2>
                {/* <p className="line-clamp-2">{item.description}</p> */}
                <div>
                  {
                    item.price.onSalePrice ? 
                    <><span className="text-md text-red-600 font-bold">{ formattedPrice(item.price.onSalePrice) }</span> <span className="text-md text-gray-400 italic line-through">{formattedPrice(item.price.salePrice)}</span></>
                    :
                    <span className="text-md font-bold">{formattedPrice(item.price.salePrice)}</span>
                  }
                </div>
              </div>
            </div>
          )
        })
        : (
          <div>
            <h3 className="text-xl uppercase text-center">The No results found</h3>
          </div>
        )
      }
      </div>
    }
  </div>
  )
}
