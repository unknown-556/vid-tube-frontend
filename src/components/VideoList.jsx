import { useEffect, useState } from 'react';
import { getVideos } from '../services/api';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        setVideos(response.data.allvideos);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch videos', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div>
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
              <h3>{video.title}</h3>
              <video controls src={video.video}></video>
              <p>Posted by: {video.postedBy}</p>
              <p>Category: {video.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoList;
