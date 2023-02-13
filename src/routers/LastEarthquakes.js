import React from "react";
import ContentZone from "../components/ContentZone";
import Content from "../components/Content";
import LinkCardIcon from "../components/LinkCardIcon";
import { FaBeer } from 'react-icons/fa';
import LogoPng from "../assets/logo@300w.png";
import EarthquakeTr from "../Plugins/EarthquakeTr";
import {AiFillThunderbolt} from "react-icons/ai";
import LinkCardIconEarthQuakes from "../components/LinkCardIconEarthQuakes";
const dayjs = require('dayjs')

const LastEarthquakes = (props) => {

    const [getData,setData] = React.useState([]);


    React.useEffect(()=>{

        window.top.document.title = "Afet Bilgi Merkezi | Son Depremler";


        EarthquakeTr()
            .then(response => {
                if(response?.result){
                    setData(response.result)
                }
            })
            .catch(err => {})
    },[])

    return (<>

        <div style={{}}>

            <Content>

                <ContentZone top fullwidth title={"Son Depremler"}>


                    {
                        getData.map(item => {

                            return (
                                <LinkCardIconEarthQuakes icon={<AiFillThunderbolt size={17}/>}   title={item?.location}   depth={item?.depth}   magnitude={item?.magnitude}  datetime={dayjs(item?.datetime).format("DD/MM/YYYY H:mm:ss")} to="#" />
                            )
                        })
                    }

                </ContentZone>


            </Content>

        </div>

    </>)


}


export default LastEarthquakes;