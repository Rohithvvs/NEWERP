import logo from './logo.svg';
import './App.css';
import Invoiceform from './InvoiceForm';
import Register from './Login/Register';
import Login from './Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    {/* <BrowserRouter>
      <Routes>       
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register/>} />
                <Route path="/Invoiceform" element={<Invoiceform/>} />
      </Routes>
    </BrowserRouter> */}
    <Invoiceform/>
    
    </div>
  );
}

export default App;
