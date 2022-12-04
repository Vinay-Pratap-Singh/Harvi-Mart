import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("api/products");
      setData(res.data.products);
      setOrgData(res.data.products);
    };
    getData();
  }, []);

  return <div className="flex gap-10 sm:gap-0 items-center justify-around flex-wrap py-10">
    {
      data.map((element) => {
        return <ProductCard imageURL={element.imageURL} title={ element.title} description={element.description} price={element.price} brand={element.brand} />
      })
    }
  </div>;
};

export default Products;
