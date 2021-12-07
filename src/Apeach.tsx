import {MouseEventHandler, TouchEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {isMobile} from 'react-device-detect';
import "@lottiefiles/lottie-player";

function MoveApeach ({width=100}) {
  return (
    <div className={"apeach"}>
      <lottie-player
        autoplay
        loop
        mode={"mormal"}
        src={"move_apeach.json"}
        style={{width}}
      />
    </div>
  )
}

function UlaUlaApeach ({width = 100}) {
  return (
    <div className={"apeach"}>
      <lottie-player
        autoplay
        mode={"normal"}
        src={"ulaula.json"}
        style={{width}}
      />
    </div>
  )
}

function DragApeach ({width = 100}) {
  return (
    <div className={"apeach"} style={{transform: "translate(20px, 10px)"}}>
      <lottie-player
        autoplay
        loop
        mode={"normal"}
        src={"drag_apeach.json"}
        style={{width}}
      />
    </div>
  )
}

function ByeApeach ({width = 100}) {
  return (
    <div className={"apeach"}>
      <lottie-player
        autoplay
        mode={"normal"}
        src={"bye.json"}
        style={{width}}
      />
    </div>
  )
}

function Apeach ({isLogin}:{isLogin:boolean}) {
  const apeachSize = isMobile ? 100 : 200;
  const [move, setMove] = useState(true);
  const [ula, setUla] = useState(false);
  const [bye, setBye] = useState(false);
  const [posX, setposX] = useState(100);
  const [posY, setposY] = useState(0);
  const [dragPos, setDragPos] = useState({x:0,y:0});
  const [direction, setDirection] = useState('left');
  const [mouseAction, setMouseAction] = useState(false);
  const moveInterval = useRef<any>(null);

  const ulaula = useCallback(() => {
    if (ula) {
      return false;
    }
    setUla(true);
    setTimeout(() => setMove(false), 50);
    setTimeout(() => {
      setMove(true);
      setTimeout(() => setUla(false), 50);
    }, 5400);
  },[ula]);

  const posXUpdate = useCallback(() => {
    if (ula || bye) {
      return false;
    }
    const _getNextPosition = (direction:string, posX:number) => {
      let newposX;
      if (direction === 'left') {
        newposX = (posX > -10) ? posX-1 : posX+1;
      } else {
        newposX = (posX < 90) ? posX+1 : posX-1;
      }
      return newposX;
    }
    const _setDirection = (posX:number) => {
      if (posX <= 0) {
        setDirection('right');
      }
      if (posX >= 90) {
        setDirection('left');
      }
    }
    const nextPosX = _getNextPosition(direction, posX);
    const getUlaPosition = Math.floor(Math.random()*100);
    if (getUlaPosition < 90 && getUlaPosition > 0 && getUlaPosition === posX) {
      return ulaula();
    }
    setposX(nextPosX);
    _setDirection(nextPosX);
  }, [
    posX, direction, ula, bye, ulaula
  ]);

  const mouseMoveEvent:MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!mouseAction) return false;
    setDragPos({x:e.clientX-(apeachSize/2), y:e.clientY-(apeachSize/2)});
  },[mouseAction, apeachSize]);
  const mouseDownEvent:MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    setMouseAction(true);
    setDragPos({x:e.clientX-(apeachSize/2), y:e.clientY-(apeachSize/2)});
    clearInterval(moveInterval.current);
  }, [apeachSize]);
  const mouseUpEvent:MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    setMouseAction(false);
    const {clientX:x, clientY:y} = e;
    setMove(true);
    setUla(false);
    setposX(Math.floor((x-apeachSize/2)*100/window.document.documentElement.clientWidth));
    setposY(window.document.documentElement.clientHeight - y - apeachSize/2);
  }, [apeachSize]);

  const callByeAction = () => {
    setMove(false);
    setUla(false);
    setBye(true);
    setTimeout(() => {
      setMove(true);
      setUla(false);
      setBye(false);
    }, 3000);
  }

  useEffect(() => {
    if (!mouseAction) {
      moveInterval.current = setInterval(posXUpdate, 100);
    }
    return () => clearInterval(moveInterval.current);
  }, [posXUpdate, moveInterval, mouseAction]);
  useEffect(() => {
    if (isLogin) {
      callByeAction();
    }
  }, [isLogin]);

  return (
    <div className={"apeach-wrapper"} style={{
      width: apeachSize,
      height: apeachSize,
      left: (mouseAction) ? dragPos.x : `${posX}vw`,
      transform: `${direction === 'left' ? '': 'rotate3d(0,1,0, 180deg)'}`,
      top: (mouseAction) ? dragPos.y : 'auto',
      bottom: (mouseAction) ? 'auto' : posY,
      transition: (mouseAction) ? 'none' : 'all .1s ease-in-out',
    }}
         onMouseDown={mouseDownEvent}
         onMouseUp={mouseUpEvent}
         onMouseMove={mouseMoveEvent}
    >
      {
        mouseAction
          ? <DragApeach width={apeachSize/1.1}/>
          : <>
            {move && <MoveApeach width={apeachSize}/>}
            {ula && <UlaUlaApeach width={apeachSize}/>}
            {bye && <ByeApeach width={apeachSize}/>}
          </>
      }
    </div>
  )
}

export default Apeach;
