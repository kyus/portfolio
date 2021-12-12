import './App.scss';
import {useCallback, useEffect, useState} from "react";
import classNames from "classnames";
import '@dotlottie/player-component';
import {Link, useLocation} from "react-router-dom";
import {AiOutlineGithub} from '@react-icons/all-files/ai/AiOutlineGithub';
import {AiOutlineLogout} from '@react-icons/all-files/ai/AiOutlineLogout';
import {FaDocker} from '@react-icons/all-files/fa/FaDocker';
import {RiUser5Line} from '@react-icons/all-files/ri/RiUser5Line';
import Apeach from "./Apeach";
import Login from "./component/Login";
import Main from "./component/Main";
import CommandBall from "./component/CommandBall";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [apeachSize, setApeachSize] = useState(200);
  const [action, setAction] = useState('normal');
  const {pathname} = useLocation();

  const logout = useCallback(() => {
    setIsLogin(false);
    localStorage.setItem('isLogin', 'no');
  }, []);

  useEffect(() => {
    const loginState = localStorage.getItem("isLogin");
    console.log('local', loginState);
    if (loginState === 'yes') {
      setIsLogin(true);
    } else {
      setAction('intro');
      setTimeout(() => {
        setAction('normal');
      }, 0);
    }
  }, []);

  return (
    <div className="App">
      {
        isLogin &&
        <header className="App-header">
          <div>안녕하세요. kyus!</div>
          <nav className={"nav-wrapper"}>
            <div className={"nav-left"}>
              <Link className={classNames("nav", {active: pathname.startsWith('/about')})} to={"/about"}>
                <RiUser5Line />
                <div>about..</div>
              </Link>
              <Link className={classNames("nav", {active: pathname.startsWith('/portfolio') || pathname === '/'})} to={"/portfolio"}>
                <FaDocker />
                <div>portfolio</div>
              </Link>
            </div>
            <div className={"nav-right"}>
              <a className={"nav"} href={"https://github.com/kyus"} target={"_blank"}>
                <AiOutlineGithub />
                <div>github</div>
              </a>
            </div>
          </nav>
          <div onClick={logout} className={"btn"}>
            <AiOutlineLogout />
            <div>logout</div>
          </div>
        </header>
      }
      <section className={classNames("body", {isLogin})}>
        {
          isLogin
            ? <Main setAction={setAction} />
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
