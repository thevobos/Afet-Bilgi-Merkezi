import React from "react";
import ContentZone from "../components/ContentZone";
import Content from "../components/Content";
import LinkCardIcon from "../components/LinkCardIcon";
import { FaBeer } from 'react-icons/fa';


const Dashboard = (props) => {


    const [getLinks,setLinks]       = React.useState([]);
    const [getSupports,setSupports] = React.useState([]);


    React.useEffect(()=>{

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


    },[])



    return (<>

        <div style={{}}>

            <Content>

                <ContentZone top fullwidth title={"Yardım Duyuruları"}>

                    {getSupports.map(item => <LinkCardIcon bigSize shadown icon={<img src={item.providerlogo} width={35} />} title={item.title} to={"/yardim/"+item.slug} /> )}


                </ContentZone>

                <ContentZone fullwidth title={"Faydalı Linkler"}>

                    {getLinks.map(item => <LinkCardIcon  icon={<img src={item.cover} width={35} />} title={item.title} to={item.link} /> )}

                </ContentZone>

            </Content>

        </div>

    </>)


}


export default Dashboard;