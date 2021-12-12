import React, {Dispatch, useCallback, useState} from "react";
import {AiOutlineClose} from "@react-icons/all-files/ai/AiOutlineClose";
import {ifiveProject, atyProject} from "../data.json";
interface listProps {
  name: string;
  src: string;
  duration: string;
  detail: string;
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
        return (<div key={k} className={"card-wrapper"} onClick={() => openDetail(p)}>
          <div className={"img-wrapper"}>
            <img src={p.src} alt={p.name}/>
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
            <AiOutlineClose style={{cursor: "pointer"}} size={50} onClick={() => close(false)} />
          </div>
        </div>
        <div className={"popup-body"}>
          {data.duration}
          <pre>{data.detail}</pre>
        </div>
      </div>
    </div>
  )
}

function Thumbnail({thumb}:{thumb:any}) {
  return (
    <div className={"thumb-wrapper"}>
      thumb layer
    </div>
  )
}

function Portfolio() {
  const [thumb, setThumb] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState(ifiveProject[0]);
  const openDetail = useCallback((data: listProps) => {
    setData(data);
    setOpenPopup(true);
  }, []);
  const toggle = useCallback((data: listProps) => {}, []);
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
