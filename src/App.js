import React,{useState, useEffect} from 'react'
import './index.css';
import Seacrh from './Components/Seacrh';

function App() {
    

  return (
    <div className='bg-gray-100  h-16 text-center text-black'>
      <h1 className='text-4xl'>Music Player</h1>
      <hr  className='h-3 bg-red-300 w-60 mx-auto rounded mt-2' />
      <div>
        <Seacrh/>
      </div>
    </div>
  )
}
export default  App;
