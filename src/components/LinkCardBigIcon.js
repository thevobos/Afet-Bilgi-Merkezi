import React from "react";
import {NavLink} from "react-router-dom";
import {AiOutlineArrowRight} from "react-icons/ai";
import {isMobile} from "react-device-detect";






const LinkCardBigIcon = (props) => {

    return (<>
        <NavLink
            to={props?.to}>
            <div style={{display:"flex", borderRadius:10, marginBottom:15, padding:"5px 10px",  flexDirection: (isMobile ? "column" : "row"), boxShadow: (props.shadown ? "rgb(0 0 0 / 13%) 0px 0px 18px"  : "")}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:(props.bigSize ? 75 : 40), height: (props.bigSize ? 75 : 40) }}>
                    {props?.icon}
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", flex:1, height:(props.bigSize ? 75 : 40), fontSize:(props.bigSize ? 22 : 16) }}>
                    <div>{props?.title}</div>
                    <div>{props?.description}</div>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:(props.bigSize ? 75 : 40), height:(props.bigSize ? 75 : 40) }}> <AiOutlineArrowRight size={17}/> </div>
            </div>
        </NavLink>

    </>)


}


export default LinkCardBigIcon;