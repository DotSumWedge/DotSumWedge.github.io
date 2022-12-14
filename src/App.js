import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import BarChartPage from './pages/BarChartPage';
import DerekRogersPhoto from './Images/Derek_Professional_Photo.jpg';

function App() {

  return (
    <div className="App" style={appDivStyle}>
        <div style={{ width: 200, height: 10 }}> </div>
        <h1>
          Derek Rogers
        </h1>
        <img src={DerekRogersPhoto} style={{ width: 200, height: 200 }}/>

        <h2> From:</h2>
        <div>Overland Park, Kansas</div>

        <h2>Interests:</h2>
        <div>Outside of studies and work I enjoy a variety of hobbies including disc golf, snowboarding, rock climbing, games, painting/modeling, building computers, playing piano/guitar, listening to music, and cooking. I find joy in trying something new and watching people dedicated to their craft show off their skills and knowledge.</div>
        
        <h2>Work:</h2>
        <div>Software Developer at Argo Data</div>

        <h2>School:</h2>
        <div>BS of Computer Science and Minor in mathematics at the University of North Texas and currently pursuing  a MS in Data Science at Southern Methodist University</div>

        <h2>Github:</h2>
        <div>https://github.com/DotSumWedge</div>
        <div>https://github.com/derogers</div>

        <h2>Youtube:</h2>
        <div>https://www.youtube.com/@derekrogers5326</div>

        <div style={{ width: 200, height: 20 }}> </div>
        <Routes>
            <Route path="*" element={<BarChartPage />} />
        </Routes>
    </div>
  );
}

const appDivStyle = {
  backgroundColor: '#4c4c46',
  border: '20px solid #365553',
  color: '#98efeb'
}

export default App;
