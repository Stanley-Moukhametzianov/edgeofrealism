import {
  useState
} from 'react';



export default function Home() {
    const [search, updateSearch] = useState('');
    const [data, updateData] = useState([]);

  const handleClick = async () => {

    var newData = await fetch('/api/generateWrap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(`${search}`)
    });
    const newDataJSON = await newData.json();
    newData = newDataJSON.result;

    const dataELArr = [];

    for (var i = 0; i < newData.length; i++) {
      dataELArr.push(<img src={newData[i]}></img>)
    }

    updateData(dataELArr);
  }


  return (<>
    <input className="inputStyle"
    placeholder="Enter a prompt"
    onChange={(e) => updateSearch(e.target.value)}
    value={ search}
    
    ></input>
    <button onClick={() => handleClick()}>Button</button>
    <div className="container">
      {data}
      
      </div>
    
  </>)
}
