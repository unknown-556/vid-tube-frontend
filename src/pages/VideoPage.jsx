import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../services/api';
import './VideoPage.css'; // Import your CSS file

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideo(id);
        setVideo(response.data.video);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch video', error);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div className="container">
      <h1>{video.title}</h1>
      <video controls src={video.video}></video>
      <p>Posted by: {video.postedBy}</p>
      <p>Category: {video.category}</p>
    </div>
  );
};

export default VideoPage;


