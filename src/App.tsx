import './App.scss';
import {useCallback, useState} from "react";
import '@dotlottie/player-component';
import Apeach from "./Apeach";

function App() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [msg, setMsg] = useState('맞춰바여');
  const handleInput = useCallback((type:string) => ({target}:{target:{value:string}}) => {
    const {value} = target;
    switch(type) {
      case "id" :
        setId(value);
        break;
      case "pw":
        setPw(value);
        break;
      default:
        console.log('unknown type', type);
    }
  }, []);

  const onLogin = useCallback(() => {
    if (id === 'kyus' && pw === '1234') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      setMsg('로그인 정보가 틀려요!');
      setTimeout(() => setMsg('id는 kyus, 비번은 1234 입니다..'), 1000);
    }
  }, [id, pw]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className={"body"}>
        <section className={"login-wrapper"}>
          <section className={"character-wrapper"}>
            <dotlottie-player
              autoplay
              loop
              mode="normal"
              src="animation-external-image.lottie"
              style={{width: 220}}
            />
            <div className={"bubble"}>
              {msg}
            </div>
          </section>
          <div className={"input-wrapper"}>
            <input type={"text"} value={id} onChange={handleInput('id')} />
          </div>
          <div className={"input-wrapper"}>
            <input type={"password"} value={pw} onChange={handleInput('pw')} />
          </div>
          <div className={"input-wrapper"}>
            <div className={"btn"} onClick={onLogin}>
              login
            </div>
          </div>
        </section>
      </section>
      <Apeach isLogin={isLogin} />
    </div>
  );
}

export default App;
