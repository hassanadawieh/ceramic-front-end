import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../MyContext";
import { FaAngleRight } from "react-icons/fa";
import ShowProduct from "../../components/ShowProduct/ShowProduct";
import axios from "axios";
import Card from "../../components/Card/Card";
import "./Product.css";
const Product = () => {
  const [totalPages, setTotalPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [numberPages, setNumberPages] = useState([]);
  const [page, setPage] = useState(1);
  const [AllProducts, setAllProducts] = useState([]);
  const [showPagginations, setShowPagginations] = useState(true);
  const [subCategories , setSubCategories] = useState([]);
  const [showProduct , setShowProduct] = useState(false);
  const [idProduct , setIdProduct] = useState('');

  // function to get the idproduct show

  const handleGetIdProduct = (id , status) => {
    setIdProduct(id);
    setShowProduct(status);
  }


  // get the category name from the useContext
  const { categoryName } = useContext(MyContext);

  // function to get the subCategories
  useEffect(() => {
    const fetchData = async () => {
      let arrauSubCategory = [];
      await axios
        .get(`${process.env.REACT_APP_API_URL}/subCategory`)
        .then((response) => {
          try {
            for(let i = 0 ; i < response.data.length ; i++) {
                if(response.data[i].category.name === categoryName){
                    arrauSubCategory.push(response.data[i]);
                }
            }
          } catch (error) {
            console.log(error.message);
          }
        });
        setSubCategories(arrauSubCategory);
    };
    fetchData();
  }, [categoryName]);
  // function to get the products by category
  useEffect(() => {
    let storProducts = [];
    if (categoryName !== "All Categories") {
      for (let i = 0; i < AllProducts.length; i++) {
        setShowPagginations(false);
        if (AllProducts[i].subCategory[0].category.name === categoryName) {
          storProducts.push(AllProducts[i]);
        }
      }
      setProducts(storProducts);
    } else {
      setShowPagginations(true);
      fetchAllProducts();
    }
  }, [categoryName, AllProducts, page]);

  //function to get the all products
  useEffect(() => {
    const fetchData = async () => {
      let arrayAllProducts = [];
      for (let i = 0; i < numberPages.length; i++) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/product?page=${numberPages[i]}`
          );
          for (let i = 0; i < response.data.items.length; i++) {
            arrayAllProducts.push(response.data.items[i]);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      setAllProducts(arrayAllProducts);
    };
    fetchData();
  }, [numberPages]);

  // function to get the products baye pages
  const handleGetProductsByPage = (element) => {
    setPage(element);
  };

  // function to get the number pages
  useEffect(() => {
    let numberPages = [];
    for (let i = 0; i < totalPages; i++) {
      numberPages.push(i + 1);
    }
    setNumberPages(numberPages);
  }, [totalPages]);

  const fetchAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product?page=${page}`)
      .then((response) => {
        try {
          setProducts(response.data.items);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.log(error.message);
        }
      });
  };

   // function to get the products by subCategory
   const handlefilterBySubCategory = (element) => {
    let arrayProducts = [];
      for(let i = 0 ; i < AllProducts.length; i++){
        if(AllProducts[i].subCategory[0].name === element){
           arrayProducts.push(AllProducts[i])
        }
      }
   setProducts(arrayProducts);
   }

  useEffect(() => {
    fetchAllProducts();
  }, [page]);
  return (
    <div className="product-container">
      {showProduct && (
        <ShowProduct remove={handleGetIdProduct} id={idProduct} />
      )}
      <div className="image-product">
        <div className="space-header">
          <div className="nameCategory">{categoryName}</div>
        </div>
      </div>
      <div className="section-subCategory">
        {subCategories.map((element) => (
          <h4
            key={element._id}
            onClick={() => handlefilterBySubCategory(element.name)}
          >
            {element.name}
          </h4>
        ))}
      </div>
      <div className="main-product">
        {products.map((element) => (
          <Card
            key={element._id}
            id={element._id}
            name={element.name}
            type={element.subCategory[0].name}
            price={element.price}
            image={element.image}
            quantity={element.quantity}
            getId={handleGetIdProduct}
          />
        ))}
      </div>
      {showPagginations && (
        <div className="section-paggination">
          <div className="paggination">
            {numberPages.map((element) => (
              <div
                key={element}
                onClick={() => handleGetProductsByPage(element)}
              >
                {element}
              </div>
            ))}
          </div>
          {page === totalPages ? (
            ""
          ) : (
            <div
              className="next"
              onClick={() => handleGetProductsByPage(page + 1)}
            >
              {<FaAngleRight className="next-button" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
