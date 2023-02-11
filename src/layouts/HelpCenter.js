import React from "react";
import {Outlet, useNavigate, useRouteError} from "react-router-dom"
import HeaderIndex from "../components/HeaderIndex";
import {App, Button, Radio, Result, Dropdown, Drawer, notification, Form, Input, Select} from "antd"
import Content from "../components/Content";
import ContentZone from "../components/ContentZone";
import LogoPng from "../assets/logo@300w.png";
import {isMobile} from 'react-device-detect';
import {MenuOutlined, UserOutlined} from '@ant-design/icons';
import { AiOutlineSend } from "react-icons/ai";

const HelpCenter  = (props) => {

     const [open, setOpen]   = React.useState(false);
    const navigate          = useNavigate();
    let error               = useRouteError();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const items = [
        {
            key: '1',
            label: "Anasayfa",
            onClick: () => navigate("/")
        },
        {
            key: '2',
            label: "Tahliye & Toplanma Alanları",
            onClick: () => navigate("/tahliye-toplanma-alanlari")
        },
        {
            key: '3',
            label: "Yardım Noktaları",
            onClick: () => navigate("/yardim-dagitim-noktalari")
        },
        {
            key: '4',
            label: "Son Depremler",
            onClick: () => navigate("/son-depremler")
        }
    ];


    const onFinish = (values) => {
        console.log('Success:', values);


        const formData = new FormData();

        formData.append("sender",values.fullname);
        formData.append("phone",values.phone);
        formData.append("subject",values.subject);
        formData.append("content",values.content);
        formData.append("status","Yeni");


        fetch("https://beta.vobo.cloud/api/v1/insert/multiple/6116-62337-8820-83336/182-6240-8690-4012/4876-5149-9704-6157?language=tr",{
            body: formData,
            method: "post"
        })
            .then(response => {

                form.resetFields();
                setOpen(false);
                api.success({message:"BAŞARILI", description:"Kısa süre içerisinde tarafınıza dönüş yapılacaktır."})

            })
            .catch(error => {
                api.warning({message:"HATA", description:error.message})
            })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return(<>

        <App>
            {contextHolder}
            <Content>

                <div style={{ display:"flex", justifyContent:"center"}}>

                    <div style={{ width: (isMobile ? "calc(100% - 60px)" : "100%"), height: 120,  display:"flex", alignItems:"center"}}>

                        <div style={{display:"flex", width:200, alignItems:"center", justifyContent:"flex-start"}}>
                            <img src={LogoPng} style={{width:150}}  alt={"Afet Bilgi Merkezi"}/>
                        </div>
                        <div style={{display:"flex", flex:1, justifyContent:"flex-end"}}>
                            <Button shape={"round"} type={"dashed"} icon={<AiOutlineSend/>} onClick={() => setOpen(true)}> İLETİŞİM</Button>
                        </div>

                    </div>

                </div>

                {
                    isMobile && (
                        <Dropdown  menu={{items}} >
                            <Button style={{width: "95%", marginLeft: "2.5%"}} type="dashed" block>
                                <MenuOutlined />
                            </Button>
                        </Dropdown>
                    )
                }
                {
                    !isMobile && (
                        <Radio.Group style={{ marginBottom:(isMobile ? 0 : 15), marginLeft: (isMobile ? 30 : 0)}} size={"middle"} value={window.location.pathname} onChange={(e) => navigate(e.target.value) }>
                            <Radio.Button value="/">Anasayfa</Radio.Button>
                            <Radio.Button value="/tahliye-toplanma-alanlari">Tahliye & Toplanma</Radio.Button>
                            <Radio.Button value="/yardim-dagitim-noktalari">Yardım Noktaları</Radio.Button>
                            <Radio.Button value="/son-depremler">Son Depremler</Radio.Button>
                        </Radio.Group>
                    )
                }




                <div>
                    { !error ? <Outlet /> : <Result style={{marginTop:50}} status="404" title="SAYFA BULUNAMADI" subTitle="Üzgünüz, İstediginiz sonucu siz gösteremedik. Bunun bir hata oldugunu düşünüyorsanız bizimle iletişime geçiniz. İşlemlerinize devam etmek için menüde bulunan 'Anasayfa' bağlantısından işlemlerinize devam edebilirsiniz. "  />}
                </div>


                <ContentZone fullwidth style={{color:"#bbbbbb"}} >
                    <div style={{display:"flex", width:200, marginBottom:20, marginTop:50, alignItems:"center", justifyContent:"flex-start"}}>
                        <img src={LogoPng} style={{width:150}}  alt={"Afet Bilgi Merkezi"}/>
                    </div>
                    <p style={{color:"#9e9e9e", marginBottom:10}} >Kişisel Verilerin İşlenmesine İlişkin Aydınlatma: </p>
                    <p style={{color:"#9e9e9e"}} >Bu uygulama, 6 Şubat 2023 tarihinde Türkiye’de meydana gelen büyük deprem felaketinde, arama kurtarma çalışmaları ile yardım ve destek taleplerini ortak bir veri tabanında toplayarak yetkili kurum ve kuruluşlara aktarmak amacı ile bilişim teknolojileri alanında çalışan gönüllüler tarafından oluşturulmuştur. </p>
                    <p style={{color:"#9e9e9e"}} >Yardım ya da desteğe ihtiyacı olduğunu belirttiğiniz kişilerin kişisel verileri ‘’Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu olması’’ hukuki sebebine dayanarak, otomatik yollarla işlenecektir. Tarafınıza ait kişisel veriler, ‘’Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması’’ hukuki sebebine dayanarak işlenecektir.</p>
                    <p style={{color:"#9e9e9e"}} >Paylaşacağınız yardım, destek taleplerinde yer alan isim, soy isim, telefon ve adres gibi kişisel veriler, veli, vasi, temsilci bilgisi, medeni durum ve sağlık bilgileri tarafımızca oluşturulan ve sunucuları yurtiçi ve yurtdışında bulunan veri tabanında toplanarak, Afad, Akut, Kızılay gibi yetkili arama kurtarma kuruluşlarının yanı sıra destek ve yardım taleplerini karşılayabilecek sivil toplum kuruluşları ile kişisel veri işleme amacı ile sınırlı olarak paylaşılacaktır.</p>
                    <p style={{color:"#9e9e9e", marginTop:10}} >Bu platform kar amacı gütmeden imece usulu bilgi paylaşımı için geliştirildi, hiçbir kurum ve kuruluşla ilişiği yoktur.</p>
                    <p style={{color:"#9e9e9e", marginTop:20}} >Gerektiğinde yetkili merci ve kurumlara bilgi sağlanabilir ve işbirliği yapılabilir.</p>
                    <p style={{color:"#505050", marginTop:10}} >© 2023</p>

                </ContentZone>
            </Content>


            <Drawer width={isMobile ? "100%" : 500} title="İletişim Formu"  placement="right" onClose={() => setOpen(false)} open={open}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Form.Item label="İsim Soyisim" name="fullname" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Input placeholder={"Lütfen isim ve soyisminizi giriniz"} />
                    </Form.Item>

                    <Form.Item label="Telefon" name="phone" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Input placeholder={"İletişim numaranızı yazınız"} />
                    </Form.Item>

                    <Form.Item label="İleitşim Konusu" name="subject" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Select
                            placeholder={"Lütfen iletişim konusu seçiniz"}
                            style={{width: "100%" }}
                            options={[
                                {
                                    value: 'Acil Yardım',
                                    label: 'Acil Yardım',
                                },
                                {
                                    value: 'Bağış Yapmak İstiyorum',
                                    label: 'Bağış Yapmak İstiyorum',
                                },
                                {
                                    value: 'Veri Doğrulama & İhlal Bildirimi',
                                    label: 'Veri Doğrulama & İhlal Bildirimi'
                                },
                                {
                                    value: 'İş Birliği',
                                    label: 'İş Birliği',
                                },
                                {
                                    value: 'Diğer',
                                    label: 'Diğer',
                                }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Mesaj" name="content" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Input.TextArea placeholder={"Lütfen iletişim detaylarınızı giriniz"} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="default" htmlType="submit">
                            Gönder
                        </Button>
                    </Form.Item>


                </Form>
            </Drawer>


        </App>


    </>)

};


export default HelpCenter;