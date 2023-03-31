import './App.css';
import UserInfo from "./Components/UserInfo";
import Header from "./Components/Header";

function App() {
  return (
    <div>
        <Header />
        <div className='container'>
            <UserInfo />
        </div>
    </div>
  );
}

export default App;
