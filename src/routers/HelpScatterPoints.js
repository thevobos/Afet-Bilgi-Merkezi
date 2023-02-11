import React from "react";
import ContentZone from "../components/ContentZone";
import Content from "../components/Content";
import LinkCardIcon from "../components/LinkCardIcon";
import { AiFillPushpin } from "react-icons/ai";


const HelpScatterPoints = (props) => {


    const [getData,setData] = React.useState([]);

    React.useEffect(()=>{



        fetch("https://beta.vobo.cloud/api/v1/get/all/categories/182-6240-8690-4012/4543-4549-4752-7669?language=tr")
            .then(res => res.json())
            .then(res => {

                res.data.map(item => {
                    if(item.label === "Yardım Dağıtım Noktaları"){
                        setData(item.result);
                    }
                });

            }).catch(err => console.log(err))


    },[]);

    return (<>

        <div style={{}}>

            <Content>

                {
                    Object.values(getData).map(item => {

                        return (
                            <ContentZone top fullwidth title={item?.label}>

                                {
                                    Object.values(item.child).map(item => {

                                        return (
                                            <LinkCardIcon icon={<AiFillPushpin size={17}/>}   title={item?.label} to="#" />
                                        )
                                    })
                                }

                            </ContentZone>
                        )
                    })
                }


            </Content>

        </div>

    </>)


}


export default HelpScatterPoints;