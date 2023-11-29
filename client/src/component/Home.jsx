import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Loader.css'
import Card from './Card';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/post/getPosts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p><div class="loader"></div> </p>
      ) : (
        <div>
          {
            posts.map((post) => (
             <div key={post._id} className='w-[100vw] flex'>
                <Card post={post}/>
             </div>
            ))}
        </div>
      )}
    </div>
  );
}
