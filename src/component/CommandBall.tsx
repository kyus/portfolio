import React, {
  Dispatch,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEventHandler
} from "react";
import classNames from "classnames";

function CommandBall({setSize}:{setSize:Dispatch<number>}) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const [bubble, setBubble] = useState(true);
  const [cmdMode, setCmdMode] = useState('$');
  const [history, setHistory] = useState<string[]>([
    '어피치명령어',
    '도움말은 ? 또는 help 입력 후 [enter]',
  ]);
  const iconRef = useRef<any>();
  const historyRef = useRef<HTMLDivElement>(null);
  const tooltip = () => {
    if (editMode) return setEditMode(false);
    setBubble(false);
    iconRef.current.stop();
    iconRef.current.play();
    setEditMode(true);
  }
  const _setMethod = useCallback(() => {
    setValue('');
    switch(value) {
      case "size":
        setCmdMode('size>');
        return 'size';
      case "cmd":
        setCmdMode('cmd>');
        return 'cmd';
      case "?":
      case "help":
        return 'help';
      case "quit":
      case "exit":
        if (cmdMode === '$') {
          setEditMode(false);
        } else {
          setCmdMode('$');
        }
        return 'normal';
      default: return false;
    }
  }, [value, cmdMode]);
  const changeValue:ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const keyHandler:KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key !== "Enter") return;
    const method = _setMethod();
    if (method === 'help') {
      return setHistory([
        ...history,
        '-------------------------',
        'size : 어피치 사이즈 조절 모드',
        'cmd : 어피치 행동 조절 모드',
        'quit|exit : 이전단계',
        '-------------------------',
      ]);
    }
    if (method === 'size') {
      return setHistory([...history, '숫자를 입력해서 어피치 크기를 조절하세요. (나가시려면 exit 입력)']);
    }
    if (method === 'cmd') {
      return setHistory([...history, '행동 양식을 입력하세요.준비중..(나가시려면 exit 입력)']);
    }
    if (cmdMode === '$') {
      setHistory([...history, value]);
    }
    if (cmdMode === 'size>') {
      setSize(parseInt(value));
    }
  }, [value, history, historyRef, cmdMode]);
  const getHistoryContents = useCallback(() => {
    return (<div>
      {
        history.map((h, k) => {
          return <div key={k}>{h}</div>
        })
      }
    </div>);
  },[history]);
  useEffect(() => {
    setTimeout(() => {
      iconRef.current?.play();
    }, 1000);
  }, []);
  useEffect(() => {
    if (historyRef.current) {
      const {scrollHeight, clientHeight} = historyRef.current;
      historyRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [history]);
  return (
    <div className={classNames("command-ball", {editMode})}>
      <div onClick={tooltip}>
        {bubble && <div className={"bubble right"}>어피치가 신경쓰이나요?<br />저를 누르세요.</div>}
        {editMode && <div className={"bubble"}>어피치에게 명령을 내려보세요!<br />종료하려면 저를 클릭해주세요.</div>}
        <lottie-player
          ref={iconRef}
          mode={"normal"}
          src={"./cat-loader.json"}
          style={{width:100}}
        />
      </div>
      {
        editMode &&
        <div className={"command-wrapper"}>
          <div className={"history"} ref={historyRef}>
            {getHistoryContents()}
          </div>
          <div className={"input-wrapper"}>
            <div className={"console"}>{cmdMode}</div>
            <input
              type={"text"}
              className={"input"}
              value={value}
              onChange={changeValue}
              onKeyPress={keyHandler}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default CommandBall;
