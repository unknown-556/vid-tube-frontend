import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../services/api';
import './UploadVideoPage.css'; // Import the CSS file

const categories = [
  'Music',
  'Education',
  'Entertainment',
  'Sports',
  'News',
];

const UploadVideoPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setError('Please select a video file');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('category', category);

    try {
      await uploadVideo(formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Video uploaded successfully!');
      navigate('/videos');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload video');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h1>Upload Video</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Video</label>
            <div className="file-upload">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                required
                id="video-upload"
              />
              <label htmlFor="video-upload">
                <span>+</span>
                <span>Choose file</span>
              </label>
            </div>
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoPage;



