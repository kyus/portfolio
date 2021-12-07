import './App.scss';
import {useState} from "react";
import '@dotlottie/player-component';
import Apeach from "./Apeach";
import Login from "./component/Login";
import Main from "./component/Main";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className={"body"}>
        {
          isLogin
            ? <Main />
            : <Login setIsLogin={setIsLogin} />
        }
      </section>
      <Apeach isLogin={isLogin} />
    </div>
  );
}

export default App;
