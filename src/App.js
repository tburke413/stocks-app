import React, { useState, useEffect } from "react";
import axios from 'axios';

import styles from './App.css';


const API_KEY = "cb154845620ed774f48da10357aef169";

function App(){
  const [stock, setStock] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    (async () => {
      let data = await getStock();
      setStock(data);
    })();
  }, [refresh]);
  // const refreshAnimes = () => setRefresh((prev) => prev + 1);

  const getStock = async () => {
    console.log("running useEffect to get stock", stock);
    const { data } = await axios.get(`https://marketdata.websol.barchart.com/getQuote.json?apikey=cb154845620ed774f48da10357aef169&symbols=AMD`);
    return data.results;
  };

  // getStock = () => {
  //   console.log(this.state.stock);
  //   // console.log(`https://marketdata.websol.barchart.com/getQuote.json?apikey=${API_KEY}&stocks=${this.state.stock}`);
  //   axios.get(`https://marketdata.websol.barchart.com/getQuote.json?apikey=${API_KEY}&stocks=${this.state.stock}`)
  //   .then((response) => {
  //     const { name, lastPrice, percentChange, stock } = response.data.results;

  //     this.setState({ stock });
  //     console.log(name, lastPrice, percentChange);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  // const { name, lastPrice, percentChange } = this.state;
  return(
    <div className="app">
      <div className="card">
        {stock.map(data => {
          return (
            <div> 
              <h1>{data.name}</h1>
              <div className="split">
                <h2>${data.lastPrice}</h2>
                <h2 className={data.percentChange > 0 ? "percentPositive" : "percentNegative"}>{data.percentChange}%</h2>
              </div>
            </div>
          );
        })}
        {/* <h1 className="heading"></h1> */}
        <button className="button" onClick={getStock}>
          <span>GET ME STOCK</span>
        </button>
      </div>
    </div>
  );
}

export default App;