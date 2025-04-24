import React, { useEffect, useState }  from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
   const [portfolio, setPortfolio] = useState([]);
   const [sortBy, setSortBy] = useState("");
   const [filter, setFilter] = useState("");
 
   useEffect(() => {
     fetch("http://localhost:3001/stocks")
       .then((r) => r.json())
       .then(setStocks);
   }, []);
 
   function handleBuy(stock) {
     if (!portfolio.includes(stock)) {
       setPortfolio([...portfolio, stock]);
     }
   }
 
   function handleSell(stock) {
     setPortfolio(portfolio.filter((s) => s.id !== stock.id));
   }
 
   function handleSort(value) {
     setSortBy(value);
   }
 
   function handleFilter(value) {
     setFilter(value);
   }
 
   const filteredStocks = filter
     ? stocks.filter((stock) => stock.type === filter)
     : stocks;
 
   const sortedStocks = [...filteredStocks].sort((a, b) => {
     if (sortBy === "Alphabetically") {
       return a.name.localeCompare(b.name);
     } else if (sortBy === "Price") {
       return a.price - b.price;
     }
     return 0;
   })

  return (
    <div>
      <Header />
      <MainContainer
      stocks={sortedStocks}
      portfolio={portfolio}
      onBuy={handleBuy}
      onSell={handleSell}
      onSort={handleSort}
      onFilter={handleFilter}
      sortBy={sortBy}
       />
    </div>
  );
}

export default App;
