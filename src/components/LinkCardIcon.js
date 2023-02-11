import React from "react";
import {NavLink} from "react-router-dom";
import {AiOutlineArrowRight} from "react-icons/ai";
import {isMobile} from 'react-device-detect';






const LinkCardIcon = (props) => {

    return (<>
        <NavLink
            to={props?.to}>
            <div style={{display:"flex", borderStyle:"solid", borderWidth:1, flexDirection: (isMobile ? "column" : "row"), borderColor:"rgba(154,154,154,0.21)", borderRadius:10, marginBottom:15, padding:"5px 10px",  boxShadow: (props.shadown ? "rgb(0 0 0 / 13%) 0px 0px 18px"  : "")}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center",  width:(props.bigSize ? 85 : 50), height: (props.bigSize ? 60 : 40) }}>
                    {props?.icon}
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", fontWeight:(props.bigSize ? 400 : 200), flex:1, height:(props.bigSize ? 60 : 40), fontSize:(props.bigSize ? 19 : 16) }}>{props?.title}</div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:(props.bigSize ? 75 : 40), height:(props.bigSize ? 60 : 40) }}> <AiOutlineArrowRight size={17}/> </div>
            </div>
        </NavLink>

    </>)


}


export default LinkCardIcon;