import './App.scss';
import {useState} from "react";
import classNames from "classnames";
import '@dotlottie/player-component';
import {Link} from "react-router-dom";
import Apeach from "./Apeach";
import Login from "./component/Login";
import Main from "./component/Main";
import CommandBall from "./component/CommandBall";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [apeachSize, setApeachSize] = useState(200);
  const [action, setAction] = useState('normal');

  return (
    <div className="App">
      {
        isLogin &&
        <header className="App-header">
          <div>안녕하세요. kyus!</div>
          <nav className={"nav-wrapper"}>
            <Link className={"nav"} to={"/about"}>about</Link>
            <Link className={"nav"} to={"/portfolio"}>portfolio</Link>
          </nav>
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
      <Apeach
        isLogin={isLogin}
        size={apeachSize}
        action={action}
      />
      {isLogin && <CommandBall setSize={setApeachSize} setAction={setAction} />}
    </div>
  );
}

export default App;
