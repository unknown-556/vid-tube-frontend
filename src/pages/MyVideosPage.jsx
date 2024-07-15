import { useEffect, useState } from 'react';
import { getMyVideos } from '../services/api';
import { Link } from 'react-router-dom';

const MyVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const response = await getMyVideos();
        setVideos(response.data.videos);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch my videos', error);
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div>
      <h1>My Videos</h1>
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
              <Link to={`/videos/${video._id}`}>
                <h3>{video.title}</h3>
                <video controls src={video.video}></video>
                <p>Category: {video.category}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyVideosPage;

