import React from "react";
import {isMobile} from 'react-device-detect';


const Content = (props) => {

    return (<>
        <div style={{ width: (isMobile ? "100%" : 1200), margin: "0 auto",...props?.style}}>
            {props?.children}
        </div>
    </>)

}


export default Content;