import Form from './components/Form';
import BarChart from './components/BarChart';
import './scss/App.scss';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form />}></Route>
        <Route path ="chart" element={<BarChart />}></Route>
    </Routes>
    </div>
  );
}

export default App;