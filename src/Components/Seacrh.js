// import React, { useEffect, useState } from 'react';
// import { throttle } from 'lodash';
// export default function Search() {
//     const [songs, setSongs] = useState([]);
//     const [singer, setSinger] = useState('');
//     const [singerName, setSingerName] = useState('')
//     const [songsDetails, setSongsDetails] = useState([]);
//     const [newAudio, setNewAudio] = useState([]);
//     const [current, setCurrent] = useState(false);
//     useEffect(() => {
//         if (current) {
//             (async function fetchSinger() {
//                 const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${singerName}`;
//                 const options = {
//                     method: 'GET',
//                     headers: {
//                         'x-rapidapi-key': '7598302248msh9c6fc8b2cc57ba3p10ac66jsn8c2e1ab90815',
//                         'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'

//                     }
//                 };

//                 try {
//                     const response = await fetch(url, options);
//                     const result = await response.json();
//                     console.log(result);
//                     let sortedSongs = [];
//                     sortData(result.data, sortedSongs);
//                     setSongs(sortedSongs);
//                 } catch (error) {
//                     console.error(error);
//                 }
//             })();
//             setCurrent(false)
//         }
//     }, [singer]);

//     useEffect(() => {
//         if (songs.length === 0) return;

//         songs.forEach(song => {
//             (async function fetchSongs() {
//                 const songId = song.id;
//                 const url = `https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`;
//                 const options = {
//                     method: 'GET',
//                     headers: {
//                         'x-rapidapi-key': '7598302248msh9c6fc8b2cc57ba3p10ac66jsn8c2e1ab90815',
//                         'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'

//                     }
//                 };

//                 try {
//                     const response = await fetch(url, options);
//                     const result = await response.json();
//                     console.log(result);
//                     let songDetail = {
//                         cover: result.album.cover_medium,
//                         title: result.title,
//                         duration: result.duration,
//                         preview: result.preview,
//                         artist: result.artist.name,
//                     };
//                     setNewAudio([...newAudio, { preview: result.preview, cover: result.album.cover_medium }]);
//                     setSongsDetails(prevDetails => [...prevDetails, songDetail]);
//                 } catch (error) {
//                     console.error(error);
//                 }
//             })();
//         });
//     }, [songs]);

//     const sortData = (data, arr) => {
//         data.forEach(ele => {
//             let obj = {
//                 'id': ele.id,
//                 'title': ele.title
//             };
//             arr.push(obj);
//         });
//     };
//     const changeSingerName = (e) => {

//         e.preventDefault();
//         setSingerName(singer);
//         setCurrent(true)
//         setSinger('');
//         setSongs([]);
//         setSongsDetails([]);
//         setNewAudio([]);
//     };
//     const handleChange = (e) => {
//         setSinger(e.target.value);
//     };


//     const playSong = (url) => {
//         const song = new Audio(url);
//         song.pause();
//         song.currentTime = 0;
//         song.play();
//     }

//     return (
//         <div className='bg-gray-100 h-screen'>

//             <form onSubmit={changeSingerName}>
//                 <label className='text-2xl'>Enter Singer Name:</label>
//                 <input
//                     type="text"
//                     name="singer"
//                     value={singer}
//                     className='border border-black h-10 ml-2 rounded mr-5 text-lg'
//                     onChange={handleChange}
//                 />
//                 <button type='submit'
//                     className='bg-blue-500 text-white py-2 px-4 rounded mt-2'
//                 >
//                     Search
//                 </button>
//             </form>
//             <div className='text-center'>
//                 {/* <ul className='flex flex-wrap ml-28 mt-10 '>
//                     {songs.map(obj => (
//                         <li key={obj.id} className='m-2 rounded shadow-md border border-black h-28 p-3 w-60'>
//                             <div>Id: {obj.id}</div>
//                             <div>Title: {obj.title}</div>
//                         </li>
//                     ))}
//                 </ul> */}
//                 <ul className='flex flex-wrap mx-10'>
//                     {songsDetails.map((detail, idx) => (
//                         <li key={idx} className='m-2 mt-10 bg-gray-200 text-black rounded shadow-md  h-auto p-10 w-85'>
//                             <img src={detail.cover} alt={detail.title} />
//                             <div className='mt-2'>Title: {detail.title}</div>
//                             {/* <div>Duration: {detail.duration}</div> */}
//                             <div>Artist: {detail.artist}</div>
//                             {/* <button className='bg-green-950 text-white mt-3 w-20 rounded h-8'
//                                 onClick={() => playSong(detail.preview)}
//                             >Play</button> */}
//                             <audio controls className='text-white mt-3 w-64 rounded h-8'>
//                                 <source  src={detail.preview} type="audio/mpeg"/>
//                             </audio>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export default function Search() {
    const [songs, setSongs] = useState([]);
    const [singer, setSinger] = useState('');
    const [singerName, setSingerName] = useState('');
    const [songsDetails, setSongsDetails] = useState([]);
    const [newAudio, setNewAudio] = useState([]);
    const [current, setCurrent] = useState(false);

    useEffect(() => {
        if (current) {
            (async function fetchSinger() {
                const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${singerName}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '7598302248msh9c6fc8b2cc57ba3p10ac66jsn8c2e1ab90815',
                        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                    },
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    console.log(result);
                    let sortedSongs = [];
                    sortData(result.data, sortedSongs);
                    setSongs(sortedSongs);
                } catch (error) {
                    console.error(error);
                }
            })();
            setCurrent(false);
        }
    }, [singer]);

    useEffect(() => {
        if (songs.length === 0) return;

        songs.forEach(song => {
            (async function fetchSongs() {
                const songId = song.id;
                const url = `https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '7598302248msh9c6fc8b2cc57ba3p10ac66jsn8c2e1ab90815',
                        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                    },
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    console.log(result);
                    let songDetail = {
                        cover: result.album.cover_medium,
                        title: result.title,
                        duration: result.duration,
                        preview: result.preview,
                        artist: result.artist.name,
                    };
                    setNewAudio([...newAudio, { preview: result.preview, cover: result.album.cover_medium }]);
                    setSongsDetails(prevDetails => [...prevDetails, songDetail]);
                } catch (error) {
                    console.error(error);
                }
            })();
        });
    }, [songs]);

    const sortData = (data, arr) => {
        data.forEach(ele => {
            let obj = {
                id: ele.id,
                title: ele.title,
            };
            arr.push(obj);
        });
    };

    const changeSingerName = (e) => {
        e.preventDefault();
        setSingerName(singer);
        setCurrent(true);
        setSinger('');
        setSongs([]);
        setSongsDetails([]);
        setNewAudio([]);
    };

    const handleChange = (e) => {
        setSinger(e.target.value);
    };

    const playSong = (url) => {
        const song = new Audio(url);
        song.pause();
        song.currentTime = 0;
        song.play();
    };

    return (
        <div className='bg-gray-100 h-screen p-8'>
            <form onSubmit={changeSingerName} className='mb-6'>
                <label className='text-2xl font-semibold'>Enter Singer Name:</label>
                <input
                    type="text"
                    name="singer"
                    value={singer}
                    className='border border-black h-10 ml-2 rounded mr-5 text-lg p-2'
                    onChange={handleChange}
                />
                <button type='submit'
                    className='bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition'>
                    Search
                </button>
            </form>
            <div className='text-center'>
                <ul className='flex flex-wrap justify-center'>
                    {songsDetails.map((detail, idx) => (
                        <li key={idx} className='m-4 bg-gray-200 text-black rounded-lg shadow-lg p-6 w-72'>
                            <img src={detail.cover} alt={detail.title} className='rounded-lg mb-4' />
                            <div className='text-lg font-medium'>{detail.title}</div>
                            <div className='text-sm text-gray-600 mb-2'>Artist: {detail.artist}</div>
                            <audio controls className='w-full mt-2'>
                                <source src={detail.preview} type="audio/mpeg" />
                            </audio>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

