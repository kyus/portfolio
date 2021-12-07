import React, {Dispatch, KeyboardEventHandler, useCallback, useRef, useState} from "react";

function Login({setIsLogin}:{setIsLogin:Dispatch<boolean>}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('맞춰바여');
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

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
  }, [id, pw, setIsLogin]);

  const checkEnter = useCallback((type:string):KeyboardEventHandler => (event) => {
    if (event.key !== "Enter") return;
    if (type === 'id') {
      pwRef?.current?.focus();
    }
    if (type === 'pw') {
      onLogin();
    }
  }, [onLogin]);

  return (
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
        <input
          ref={idRef}
          type={"text"}
          value={id}
          placeholder={"input id..."}
          onChange={handleInput('id')}
          onKeyPress={checkEnter('id')}/>
      </div>
      <div className={"input-wrapper"}>
        <input
          ref={pwRef}
          type={"password"}
          value={pw}
          placeholder={"input password..."}
          onChange={handleInput('pw')}
          onKeyPress={checkEnter('pw')}/>
      </div>
      <div className={"input-wrapper"}>
        <div className={"btn"} onClick={onLogin}>
          login
        </div>
      </div>
    </section>
  )
}

export default Login;
