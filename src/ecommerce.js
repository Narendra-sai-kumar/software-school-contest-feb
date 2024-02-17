import React from "react";
import {useState, useEffect} from "react";

function Ecommerce(){
    const baseURL = 'https://dummyjson.com/products';
    
    const [productsdata, setProductsdata] =useState([]);
    const [productname, setProductname] = useState("");
    const [totalcount, setTotalcount] = useState(0);
    const [loading, setLoadig] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:""});
    const getData = async (url) => {
        setIsError({status:false, msg:""})
        setLoadig(true);
        try{
            const response = await fetch(url);
            var result = await response.json();
            const resdata =  result.products;
            setTotalcount(result.total);
            console.log("resdata", result);
            setProductsdata(resdata);  
            setLoadig(false);
            setIsError({status:false, msg:""})
            if(response.status == 404){
                throw new Error("data not Found");
            }
        }catch(e){
            setLoadig(false);
            setIsError({status:true, msg:e.message})
            
            
        }
    
    }

    function searchData(data){
        const modifiedURL = baseURL + '/search?q='+data;
        getData(modifiedURL)
    }
  
  useEffect(() => {
    // getData('https://dummyjson.com/products/search?q=Samsung')
    getData(baseURL)        
    console.log("Hii Called");
  },[])

  if(isError && isError.status){
        return (
            <div>
                <h3 style={{'color':'red'}}>Error: {isError.msg}</h3>
            </div>
        )
  }else{

  return (
    <>
    <div className="search-bar">
        <label htmlFor="sJ9r">Search  </label>
        <input type="text" name="" id="sJ9r" value={productname} onChange={(e) => setProductname(e.target.value)}/>
        <i className="fa fa-search" onClick={()=> searchData(productname)}></i>
    </div>
    
    <div className="sect">
    {loading ? <h3 style={{'textAlign':'center', 'padding': '10px'}}>Loading...</h3>:<div>
        <h3 className="result" >Results : <span style={{'fontWeight':'normal', 'fontSize':'16px'}}>{productsdata.length} of {totalcount}</span></h3>
        
        {
            productsdata.map((eachObj) =>{
                const {id, title, price, description, rating, stock, brand, category,  thumbnail, images, discountPercentage} = eachObj;
                return (

                    <div className ="item" key={id}>
                        <div className="imagepart">
                            <img src={thumbnail} alt={title} width="380px" height="300px"/>
                        </div>
                        <div className="details">
                            <h2><a href="javascript:;">{title}</a></h2>
                            <div className="rating">Rating : <span>{rating}</span> out of 5</div>
                            <div className="price">Price : ₹ <span>{price}</span> ({discountPercentage} off)</div>
                            <div className="stock">Available : <span>{stock}</span></div>
                            <div className="description" style={{'marginTop':'20px'}}><span>{description}</span></div>
                            
                        </div>
                        
                    </div>
                )
            })
        }
        </div>
        
        }
        </div>
    </>

  );
    }


}

export default Ecommerce;