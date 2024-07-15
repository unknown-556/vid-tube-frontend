import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VideosPage from './pages/VideosPage';
import VideoPage from './pages/VideoPage';
import MyVideosPage from './pages/MyVideosPage';
import UploadVideoPage from './pages/UploadVideoPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<VideosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videos/:id" element={<VideoPage />} />
          <Route path="/myvideos" element={<MyVideosPage />} />
          <Route path="/upload" element={<UploadVideoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



