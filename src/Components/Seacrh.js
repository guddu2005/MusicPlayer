 import React, { useEffect, useState } from 'react';

export default function Search() {
    const [songs, setSongs] = useState([]);
    const [singer, setSinger] = useState('');
    const [singerName, setSingerName] = useState('');
    const [songsDetails, setSongsDetails] = useState([]);
    const [newAudio, setNewAudio] = useState([]);
    const [current, setCurrent] = useState(false);
    const [playingSong, setPlayingSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
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

//     const playSong = (url, idx) => {
//     if (playingSong && playingSong.index !== idx) {
//         playingSong.audio.pause();
//         playingSong.audio.currentTime = 0;
//     }

//     if (playingSong && playingSong.index === idx) {
//         if (playingSong.audio.paused) {
//             playingSong.audio.play();
//         } else {
//             playingSong.audio.pause();
//         }
//     } else {
//         const song = new Audio(url);
//         song.play();

//         setPlayingSong({ index: idx, audio: song });

//         song.addEventListener('ended', () => {
//             setPlayingSong(null);
//         });

//         song.addEventListener('pause', () => {
//             setPlayingSong(null);
//         });
//     }
// };
const playSong = (url, idx) => {
    if (playingSong && playingSong.index !== idx) {
        playingSong.audio.pause();
        playingSong.audio.currentTime = 0;
    }

    if (playingSong && playingSong.index === idx) {
        if (playingSong.audio.paused) {
            playingSong.audio.play();
            setIsPlaying(true);
        } else {
            playingSong.audio.pause();
            setIsPlaying(false);
        }
        return;
    }

    const song = new Audio(url);
    song.play();

    setPlayingSong({ index: idx, audio: song });
    setIsPlaying(true);

    song.addEventListener('ended', () => {
        setPlayingSong(null);
        setIsPlaying(false);
    });

    song.addEventListener('pause', () => {
        setPlayingSong(null);
        setIsPlaying(false);
    });
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
                        <li key={idx} className={`m-4 bg-gray-200 text-black rounded-lg shadow-lg p-6 w-72 ${playingSong && playingSong.index !== idx ? 'opacity-50 cursor-pointer' : ''}`}>
                            <img src={detail.cover} alt={detail.title} className='rounded-lg mb-4' />
                            <div className='text-lg font-medium'>{detail.title}</div>
                            <div className='text-sm text-gray-600 mb-2'>Artist: {detail.artist}</div>
                            <button
                                controls
                                className={`w-full mt-2 py-1 px-2 rounded ${playingSong && playingSong.index === idx ? 'bg-red-600' : 'bg-green-600'} text-white`}
                                src={detail.preview}
                                onClick={() => playSong(detail.preview, idx)}
                                disabled={isPlaying && playingSong?.index !== idx}
                            >
                               {playingSong && playingSong.index === idx && !playingSong.audio.paused ? 'Pause' : 'Play'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
    
}

