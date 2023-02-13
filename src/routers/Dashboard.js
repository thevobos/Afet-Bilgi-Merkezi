import React from "react";
import ContentZone from "../components/ContentZone";
import Content from "../components/Content";
import LinkCardIcon from "../components/LinkCardIcon";
import { AiFillApi } from 'react-icons/ai';
import {Button, Col, Drawer, Row} from "antd";
import {isMobile} from "react-device-detect";


const Dashboard = (props) => {


    const [getLinks,setLinks]       = React.useState([]);
    const [getSupports,setSupports] = React.useState([]);
    const [getPageData,setPageData]                          = React.useState([]);
    const [getCurrentPageData,setCurrentPageData]   = React.useState({});
    const [getCurrentPageDraw,setCurrentPageDraw]   = React.useState(false);

    const [getServices, setServices] = React.useState([]);
    const [isServiceOpen, setIsServiceOpen] = React.useState(false);
    const [getServiceOpen, setServiceOpen] = React.useState({});


    React.useEffect(()=>{

        fetch("https://beta.vobo.cloud/api/v1/read/multiple/all/1242-22509-8459-62275/182-6240-8690-4012/4543-4549-4752-7669?language=tr&filterOrder=ASC")
            .then(res => res.json())
            .then(res => {

                setPageData(res.data);

            }).catch(err => console.log(err))


    },[]);



    React.useEffect(()=>{

        window.top.document.title = "Afet Bilgi Merkezi";

        fetch("https://beta.vobo.cloud/api/v1/read/multiple/all/4449-31501-4446-13092/182-6240-8690-4012/4543-4549-4752-7669?language=tr")
            .then(res => res.json())
            .then(res => {

                setLinks(res.data);

            }).catch(err => console.log(err))


        fetch("https://beta.vobo.cloud/api/v1/read/multiple/all/2958-63475-8145-51347/182-6240-8690-4012/4543-4549-4752-7669?language=tr")
            .then(res => res.json())
            .then(res => {

                setSupports(res.data);

            }).catch(err => console.log(err))



        fetch("https://beta.vobo.cloud/api/v1/read/multiple/all/3231-29970-1547-12266/182-6240-8690-4012/4543-4549-4752-7669?language=tr")
            .then(res => res.json())
            .then(res => {

                setServices(res.data);

            }).catch(err => console.log(err))


    },[])


    const renderHTML = (escapedHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

    return (<>

        <div style={{}}>

            <Content>

                <ContentZone fullwidth  title={"ÖNEMLİ İÇERİKLER"}>
                    <Row gutter={10} style={{marginTop:isMobile ? 0 : 30}} justify="start">
                        { getPageData.map(item => {
                            return (
                                <Col md={8} xxl={6} xs={24} style={{marginBottom:10}}>
                                    <Button shape={"round"} type={"dashed"} block onClick={() => {
                                        setCurrentPageData(item);
                                        setCurrentPageDraw(true);
                                        window.top.document.title = "Afet Bilgi Merkezi | " + item.title;
                                    }} style={{marginBottom:5}}> {item?.title} </Button>
                                </Col>
                            )
                        })}

                    </Row>
                </ContentZone>


                <ContentZone fullwidth title={"Yardım Duyuruları"}>

                    {getSupports.map(item => <LinkCardIcon bigSize shadown icon={<img src={item.providerlogo} width={35} />} title={item.title} to={"/yardim/"+item.slug} /> )}

                </ContentZone>

                <ContentZone fullwidth title={"Faydalı Linkler"}>

                    {getLinks.map(item => <LinkCardIcon  icon={<img src={item.cover} width={35} />} title={item.title} to={item.link} /> )}

                </ContentZone>

                <ContentZone fullwidth title={"Hızlı Servisler"}>

                    {getServices.map(item => <LinkCardIcon onClick={()=>{
                        setServiceOpen(item);
                        console.log(item)
                        setIsServiceOpen(true);
                    }} icon={<AiFillApi size={24}/>} title={item.title} to={null} /> )}

                </ContentZone>

            </Content>

        </div>

        <Drawer title={getServiceOpen?.title} placement="right" width="100%" onClose={() => {
            setIsServiceOpen(false);
            setServiceOpen({});
        }} open={isServiceOpen}>
            <iframe src={getServiceOpen?.url}  style={{width: "100%", height: "100%", border: "none", margin: 0, padding: 0}} frameBorder="0"></iframe>
        </Drawer>

        <Drawer title={getCurrentPageData?.title} placement="right" width={isMobile ? "100%" : 960} onClose={() => {
            window.top.document.title = "Afet Bilgi Merkezi";
            setCurrentPageDraw(false);
            setCurrentPageData({});
        }} open={getCurrentPageDraw}>
            <div dangerouslySetInnerHTML={{ __html: getCurrentPageData?.content }} />
        </Drawer>



    </>)


}


export default Dashboard;