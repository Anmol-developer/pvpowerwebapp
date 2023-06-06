// import axios from 'axios'
import React from 'react'

function Testing() {
    const handleTesting= async()=>{
        // const result = await axios.get('https://amalfez-laughing-cod-vjvpppxvjrwcw545-5000.preview.app.github.dev//api/flask/testing');
        // alert(result.data)
        const result = await fetch('https://amalfez-laughing-cod-vjvpppxvjrwcw545-5000.preview.app.github.dev/api/flask/testing',{
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
          }
        })
        console.log(await result.json());
    }
  return (
    <div>
        <button className='testing' onClick={handleTesting}>Testing</button>
    </div>
  )
}

export default Testing