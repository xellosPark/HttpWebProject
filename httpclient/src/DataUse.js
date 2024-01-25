
import React, { useState, useEffect } from 'react';

import Login from './Login/login'; // Assuming HeurmForm is in the same directory
import './App.css'; // Your CSS file path


function DataUse() {
  const [receivedDataList, setReceivedDataList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [infoValue, setInfoValue] = useState('');
  const [data, setData] = useState([]);
 
  let myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");

  const handleButtonClick = async () => {

    let raw = JSON.stringify({
      "UserId": "111",
      "Id": "111",
      "Title": "quas fugiat ut perspiciatis vero provident",
      "Body": "Test Body"
    });
    try {
      const response = await fetch(`http://127.0.0.1:8080/json/?Id=${1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
      
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(`Received ${json}`);
      setReceivedDataList(prevList => [...prevList, json]);
    });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleInfoButtonClick = async () => {
    
    fetch(`http://127.0.0.1:8080/json/?Id=${10}`)
      .then( response => {
        console.log('Welcome 1 : ', response);
        if (!response.ok) {
          console.log('Welcome 2 : ', response);
          throw new Error(`HTTP error! Status: ${response.status}`);
          
        }
        return response.json();
      })
      .then(data => {
        
        console.log('Welcome', data);
        //setData(data);
        data.forEach(item => {
          console.log("UserId:", item.UserId);
          console.log("Id:", item.Id);
          console.log("Title:", item.Title);
          console.log("Body:", item.Body);
          console.log("----------");
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleInfoChange = (event) => {

  }

  const handleDeleteBtnClick = async () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
    fetch(`http://127.0.0.1:8080/json/?Id=${111}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  };

  const handlePutButtonClick = async () => {

    let raw = JSON.stringify({
      "UserId": "111",
      "Id": "111",
      "Title": "quas fugiat ut perspiciatis vero provident",
      "Body": "Test Body"
    });
    try {
      const response = await fetch(`http://127.0.0.1:8080/json/?Id=${10}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
      
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(`Received ${json}`);
      setReceivedDataList(prevList => [...prevList, json]);
    });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="DataUse">
      {/*
      <div>
        <Login />
      </div>
      */}
    
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter name" />
        <button onClick={handleButtonClick}>Send Data</button>
      </div>
      <div>
        <input type="text" value={infoValue} onChange={handleInfoChange} placeholder="정보" />
        <button onClick={handleInfoButtonClick}>Get Data</button>
      </div>
      <div>
      <button onClick={handleDeleteBtnClick}>Delete Data</button>
      </div>
      <div>
        <button onClick={handlePutButtonClick}>Edit Data</button>
      </div>

      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
      
    </div>   
  );
}

export default DataUse;
