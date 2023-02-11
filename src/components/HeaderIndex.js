import React from "react";
import LogoPng from "../assets/logo@300w.png"
 import {isMobile} from 'react-device-detect';

const HeaderIndex  = () => {




    return(<div style={{ display:"flex", justifyContent:"center"}}>

        <div style={{ width: (isMobile ? "calc(100% - 60px)" : "100%"), height: 120,  display:"flex", alignItems:"center"}}>

            <div style={{display:"flex", width:200, alignItems:"center", justifyContent:"flex-start"}}>
                <img src={LogoPng} style={{width:150}}  alt={"Afet Bilgi Merkezi"}/>
            </div>
            <div style={{display:"flex", flex:1, justifyContent:"flex-end"}}>
                asa
            </div>

        </div>
        
    </div>)

};


export default HeaderIndex;