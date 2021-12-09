import React, {Dispatch, useEffect} from "react";
import {FaUserSecret} from '@react-icons/all-files/fa/FaUserSecret';
import {DiReact} from '@react-icons/all-files/di/DiReact';
import {DiJsBadge} from '@react-icons/all-files/di/DiJsBadge';
import {DiNodejs} from '@react-icons/all-files/di/DiNodejs';
import {DiCss3} from '@react-icons/all-files/di/DiCss3';
import {DiSass} from '@react-icons/all-files/di/DiSass';
import {SiPhp} from '@react-icons/all-files/si/SiPhp';
import {SiTypescript} from '@react-icons/all-files/si/SiTypescript';
import {SiHtml5} from '@react-icons/all-files/si/SiHtml5';
import {SiElectron} from '@react-icons/all-files/si/SiElectron';
import {SiDocker} from '@react-icons/all-files/si/SiDocker';
import {SiNginx} from '@react-icons/all-files/si/SiNginx';

function About({setAction}:{setAction:Dispatch<string>}) {
  const link = (url:string) => () => {
    window.open(url, '_blank');
  }

  useEffect(() => {
    setAction('hi');
    setTimeout(() => setAction('normal'), 30);
  }, []);
  return (
    <div className={"card-wrapper"}>
      <div className={"card-header"}>
        <FaUserSecret />{" "}
        <span>박영규 (front & backend developer)</span>
        <div>
          kyus (
          <i><a href={"mailto:hkjw1211@gmail.com"}>hkjw1211@gmail.com</a></i>
          )
        </div>
      </div>
      <section className={"content"} style={{marginBottom: 30}}>
        <div className={"image-wrapper"} onClick={link('https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp')}>
          <img src={"/mbti.jpeg"} alt={"mbti"} />
        </div>
        <div><b>Intro</b></div>
        <div>안녕하세요. 개발자 <b>박영규</b> 입니다.</div>
        <div>캐릭터 좋아합니다. 아기자기한거 좋아합니다.</div>
        <div>장점은 엉덩이가 무거운것이고</div>
        <div>단점은 엉덩이만 무거운것입니다.</div>
        <div>알아야 할게 너무 많은 사회장년생 입니다.</div>
        <div>MBTI : <b>INFP</b> 입니다.</div>
        <div>어디서도 모나지 않습니다. 분쟁이 있으면 대화로 해결하고 싶습니다.</div>
        <div>항상 더 나은사람이 되기 위해 노력하고 있습니다.</div>
      </section>
      <div className={"content"} style={{marginBottom: 30}}>
        <div><b>기술스택</b></div>
        <div>주로 자바스크립트를 위주로 다루고 있습니다.</div>
        <div>backend / frontend 모두 다루지만 성격상 frontend 작업을 할 때 더 즐거움을 느낍니다.</div>
        <div className={"icon-wrapper"}>
          <DiJsBadge size={20} title={"javascript"} onClick={link('https://developer.mozilla.org/ko/docs/Web/JavaScript')} />
          <SiTypescript size={20} title={"typescript"} onClick={link('https://www.typescriptlang.org')} />
          <DiReact size={20} title={"react"} onClick={link('https://ko.reactjs.org')} />
          <DiNodejs size={50} title={"nodejs"} onClick={link('https://nodejs.org/ko')} />
          <SiElectron size={20} title={"electron"} onClick={link('https://www.electronjs.org')} />
          <SiPhp size={40} title={"php"} onClick={link('https://www.php.net')} />
          <SiHtml5 size={20} title={"html"} onClick={link('https://developer.mozilla.org/ko/docs/Web/HTML')} />
          <DiSass size={20} title={"sass/scss"} onClick={link('https://sass-lang.com/')} />
          <DiCss3 size={26} title={"css"} onClick={link('https://developer.mozilla.org/ko/docs/Web/CSS')} />
          <SiDocker size={20} title={"docker"} onClick={link('https://www.docker.com/')} />
          <SiNginx size={24} title={"nginx"} onClick={link('https://www.nginx.com/')} />
        </div>
      </div>
      <div className={"bubble"}>
        <div><i>----- history ----</i></div>
        <div>Dankook Univ. 2004 - 2014</div>
        <div>IFIVE Corp. 2010 - 2015</div>
        <div>Aty Corp. Since 2015</div>
      </div>
    </div>
  )
}

export default About;
