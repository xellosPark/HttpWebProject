
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [receivedDataList, setReceivedDataList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [infoValue, setInfoValue] = useState('');
  const [data, setData] = useState([]);
 
  let myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://192.168.0.136:8080/json", {
        method: 'POST',
        body: inputValue,
        redirect: 'follow'
      })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.sendText);
        console.log(`Received ${json}`);
        setReceivedDataList(prevList => [...prevList, json]);
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleInfoButtonClick = async () => {
    
    fetch(`http://192.168.0.136:8080/json/?Id=${10}`)
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

    fetch(`http://192.168.0.136:8080/json/?Id=${1}`,{
      method: 'DELETE',
      redirect: 'follow'
    })
      .then(res => {
            if(res.ok){
              console.log("삭제 성공");
            }
            else{
              throw new Error('400 아니면 500 에러남');
            }
        })
        .then((resData) => {
          console.log("성공",resData);
        })
        .catch(() => {
          console.log("error 발생");
        })
  };


  return (
    <div className="App">
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

export default App;
