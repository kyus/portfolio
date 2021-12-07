import './App.scss';
import {useState} from "react";
import classNames from "classnames";
import '@dotlottie/player-component';
import Apeach from "./Apeach";
import Login from "./component/Login";
import Main from "./component/Main";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      {
        isLogin &&
        <header className="App-header">
          <div>안녕하세요. kyus portfolio</div>
          <div onClick={()=> setIsLogin(false)} className={"btn"}>logout</div>
        </header>
      }
      <section className={classNames("body", {isLogin})}>
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
