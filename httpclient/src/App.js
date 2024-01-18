
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [receivedDataList, setReceivedDataList] = useState([]);
  const [inputValue, setInputValue] = useState('');


  // const [data, setData] = useState([
  //   {
  //     "name": "kwon",
  //     "age": 20
  //   },
  //   {
  //     "name": "kim",
  //     "age": 30
  //   }
  // ]);

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://192.168.0.136:8080/json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValue),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      console.log(`Received ${result}`);
      //setReceivedData(`Received result`); // Update the state with the received data
      setReceivedDataList(prevList => [...prevList, result]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter name" />
      <button onClick={handleButtonClick}>Send Data</button>
      <ul>
        {receivedDataList.map((receivedData, index) => (
          <li key={index}>{receivedData}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
