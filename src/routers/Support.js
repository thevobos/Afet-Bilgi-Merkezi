import React from "react";
import {isMobile} from 'react-device-detect';
import ContentZone from "../components/ContentZone";
import { Routes, Route, useParams } from 'react-router-dom';






const Support = (props) => {


    const [getDetails,setDetails] = React.useState({});
    let { link } = useParams();


    React.useEffect(()=>{

        fetch("https://beta.vobo.cloud/api/v1/read/multiple/one/slug/2958-63475-8145-51347/182-6240-8690-4012/4543-4549-4752-7669/"+link+"?language=tr")
            .then(res => res.json())
            .then(res => {

                setDetails(res.data);

            }).catch(err => console.log(err))



    },[])


    return (<>

        <div style={{}}>


            <div style={{width: (isMobile ? "95%" : "100%"), marginLeft:(isMobile ? "2.5%" : "0%"), height:250, background:"white", display:"flex", marginTop:(isMobile ? 25 : 25), flexDirection:(isMobile ? "column" : "row"), alignItems:"center", justifyContent:"center", borderRadius:13, boxShadow:"rgb(0 0 0 / 13%) 0px 0px 18px"}}>
                <div style={{flex:1,   display:"flex", justifyContent:"center", alignItems:"center", fontSize:28, fontWeight:900}}>
                    <img src={getDetails?.providerlogo} width={120} alt=""/>
                </div>
                <div style={{width:(isMobile ? 100 : 2), height:(isMobile ? 2 : 100), background:"rgba(0,0,0,0.19)", borderRadius:6}} />
                <div style={{flex:1,   display:"flex", justifyContent:"center",  alignItems:"center", fontSize:22}}>
                    {getDetails?.title}
                </div>
            </div>



            <ContentZone fullwidth shadown title={"Yardım Sağlayıcısı"}>
                {getDetails?.provider}
            </ContentZone>

            <ContentZone fullwidth shadown title={"Yardım Adı"}>
                {getDetails?.title}
            </ContentZone>

            <ContentZone fullwidth shadown title={"Yardım Detayları"}>
                <div dangerouslySetInnerHTML={{__html: getDetails?.content}}></div>
            </ContentZone>

        </div>

    </>)


}


export default Support;