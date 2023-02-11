import React from "react";
import {NavLink} from "react-router-dom";
import {AiOutlineArrowRight} from "react-icons/ai";
import {isMobile} from 'react-device-detect';






const LinkCardIconEarthQuakes = (props) => {

    return (<>
        <div style={{display:"flex", borderStyle:"solid",  position:"relative", borderWidth:1, borderColor:"rgba(154,154,154,0.21)", borderRadius:10, marginBottom:15, padding:"5px 10px", flexDirection:(isMobile ? "column" : "row"),boxShadow: (props.shadown ? "rgb(0 0 0 / 13%) 0px 0px 18px"  : "")}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center",  width:(props.bigSize ? 85 : 50), height: (props.bigSize ? 60 : 40) }}>
                {props?.icon}
            </div>
            <div style={{display:"flex", flexDirection:(isMobile ? "column" : "row"), alignItems:(isMobile ? "flex-start" : "center"), justifyContent:"flex-start", fontWeight:(props.bigSize ? 400 : 200), flex:1, height:(props.bigSize ? 60 : 40), fontSize:(props.bigSize ? 19 : 16) }}> <span style={{fontWeight:400, fontSize:(props.bigSize ? 19 : 16), marginRight:10 }} >{props?.title}</span>   Derinlik <span style={{fontWeight:900, fontSize:(props.bigSize ? 19 : 16), marginLeft:5, marginRight:5 }}> {props?.depth}</span>  Büyüklük <span style={{fontWeight:900, fontSize:(props.bigSize ? 19 : 16), marginLeft:5, marginRight:5}}> {props?.magnitude}</span> Zaman <span style={{fontWeight:900, fontSize:(props.bigSize ? 19 : 16), marginLeft:5 }}> {props?.datetime}</span></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:(props.bigSize ? 75 : 40), height:(props.bigSize ? 60 : 40) }}> <AiOutlineArrowRight size={17}/> </div>
        </div>
    </>)


}


export default LinkCardIconEarthQuakes;