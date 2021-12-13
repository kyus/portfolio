import React, {Dispatch, useCallback, useState} from "react";
import {AiOutlineClose} from "@react-icons/all-files/ai/AiOutlineClose";
import {ifiveProject, atyProject} from "../data.json";
interface listProps {
  name: string;
  src: string[];
  role: string;
  result: string;
  duration: string;
  detail: string;
  bg: {src: string; type: string;};
  tag: string[];
}

function ProjectList({title, list, toggle, openDetail}:{
  title: string;
  list: listProps[];
  toggle: Function;
  openDetail: Function;
}) {
  return(
    <div className={"project-wrapper"}>
      <div className={"project-title"}>
        {title}
      </div>
      {list.map((p, k) => {
        return (<div
          key={k}
          className={"card-wrapper"}
          onMouseEnter={() => toggle(p)}
          onTouchStart={() => toggle(p)}
          onClick={() => openDetail(p)}>
          <div className={"img-wrapper"}>
            <img src={p.src[0]} alt={p.name}/>
            <div className={"tag-wrapper"}>
              {p.tag.map((tag, i) => <div key={i} className={"tag"}>{tag}</div>)}
            </div>
          </div>
          <div className={"content-wrapper"}>
            <div>{p.name}</div>
            <div>{p.duration}</div>
          </div>
        </div>)
      })}
    </div>
  )
}

function Popup({data, close}: {data:listProps; close:Dispatch<boolean>}) {
  return (
    <div className={"popup-wrapper"} onClick={() => close(false)}>
      <div className={"popup"}>
        <div className={"popup-header"}>
          <div>{data.name}</div>
          <div className={"btn-wrapper"}>
            <AiOutlineClose style={{cursor: "pointer"}} size={30} onClick={() => close(false)} />
          </div>
        </div>
        <div className={"popup-body"}>
          <div className={"info-wrapper"}>
            <div className={"info-title"}>[개발 기간]</div>
            <div>{data.duration}</div>
          </div>
          <div className={"info-wrapper"}>
            <div className={"info-title"}>[개발 언어]</div>
            <div>{data.tag.join(' / ')}</div>
          </div>
          <div className={"info-wrapper"}>
            <div className={"info-title"}>[역할]</div>
            <div>{data.role}</div>
          </div>
          <div className={"info-wrapper"}>
            <div className={"info-title"}>[성과]</div>
            <div>{data.result}</div>
          </div>
          <div className={"info-wrapper"}>
            <div className={"info-title"}>[상세]</div>
            <div>{data.detail.split("\n").map((d, k) => <div key={k}>{d}</div>)}</div>
          </div>
          <div className={"info-wrapper"}>
            <div className={"info-title"}>[Thumbs]</div>
            <div className={"image-wrapper"}>{
              data.src.map((img, key) => <img className={"img"} src={img} key={key} alt={img} />)
            }</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThumbnailBg({bg}:{bg:{src:string; type:string}}) {
  return (<>
    {bg.type === 'img' && <img className="bg" src={bg.src} alt={"bg"} />}
    {bg.type === 'media' && <iframe className={"bg"} src={bg.src} />}
  </>)
}

function Thumbnail({thumb}:{thumb:any}) {
  return (
    <div className={"thumb-wrapper"}>
      <div className={"thumb-info"}>
        <div className={"thumb-title"}>{thumb.name}</div>
        <div className={"thumb-content"}>{thumb.role} ({thumb.duration})</div>
        <div className={"thumb-content"}>{thumb.result}</div>
        <div className={"thumb-tag"}>{thumb.tag.join(" / ")}</div>
      </div>
      <div className={"thumb-bg-wrapper"}>
        <ThumbnailBg bg={thumb.bg} />
        <div className={"bg-color"} />
      </div>
    </div>
  )
}

function Portfolio() {
  const [thumb, setThumb] = useState(atyProject[1]);
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState(ifiveProject[0]);
  const openDetail = useCallback((data: listProps) => {
    setData(data);
    setOpenPopup(true);
  }, []);
  const toggle = useCallback((data: listProps) => {
    setThumb(data);
  }, []);
  return (
    <div className={"portfolio-wrapper"}>
      <Thumbnail thumb={thumb} />
      <ProjectList
        title={"IFIVE"}
        list={ifiveProject}
        toggle={toggle}
        openDetail={openDetail} />
      <ProjectList
        title={"ATY"}
        list={atyProject}
        toggle={toggle}
        openDetail={openDetail} />
      {openPopup && <Popup data={data} close={setOpenPopup} />}
    </div>
  )
}

export default Portfolio;
