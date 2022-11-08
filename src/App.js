import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import BarChartPage from './pages/BarChartPage';

function App() {
  return (
    <div className="App">
        <h1>
          Derek Rogers
        </h1>
        <h2>
          From: Overland Park, Kansas
        </h2>
        <h2>
          Intrests: Outside of studies and work I enjoy a variety of hobbies including disc golf, snowboarding, rock climbing, games, painting/modeling, building computers, playing piano/guitar, listening to music, and cooking. I find joy in trying something new and watching people dedicated to their craft show off their skills and knowledge.
        </h2>
        <h2>
          Work: Software Developer at Argo Data
        </h2>
        <h2>
          School: BS of Computer Science and Minor in math at the University of North Texas and currently persuing a MS in Data Science at Southern Methodist University
        </h2>
        <Routes>
            <Route path="*" element={<BarChartPage />} />
        </Routes>

    </div>
  );
}

export default App;
