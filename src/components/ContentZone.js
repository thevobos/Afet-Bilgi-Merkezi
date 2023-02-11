import React from "react";
import {isMobile} from "react-device-detect";






const ContentZone = (props) => {

    return (<>
        <div style={{  boxShadow: (props.shadown ? "rgb(0 0 0 / 13%) 0px 0px 18px"  : ""), width: (props?.fullwidth ? (isMobile ? "calc(100% - 60px)" : "calc(100% - 40px)") : "fit-content"), padding: (isMobile ? "10px 20px" : "10px 20px"), borderRadius:"6px", margin:(isMobile ? "10px 10px" : "10px 0px")}}>
            {props.title && (<h1 style={{fontSize:(props?.top ? 34 : 20), color: "var(--bg-color-dark)", marginBottom:15}}>{props?.title}</h1>)}
            <div style={{color:"var(--bg-color-dark)", fontSize:14,...props?.style}}>
                {props?.children}
            </div>
        </div>
    </>)


}


export default ContentZone;