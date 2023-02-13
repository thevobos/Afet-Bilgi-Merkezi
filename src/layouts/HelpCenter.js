import React from "react";
import {Outlet, useNavigate, useRouteError} from "react-router-dom"
import HeaderIndex from "../components/HeaderIndex";
import {App, Button, Radio, Result, Dropdown, Drawer, notification, Switch, Form, Input, Select, Row, Col, Checkbox, Modal} from "antd"
import Content from "../components/Content";
import ContentZone from "../components/ContentZone";
import LogoPng from "../assets/logo@300w.png";
import {isMobile} from 'react-device-detect';
import {MenuOutlined, UserOutlined} from '@ant-design/icons';
import { AiOutlineSend } from "react-icons/ai";
import VoboLogo from "../assets/vobo.svg";
import DkmLogo from "../assets/dkm.svg";
import GedLogo from "../assets/ged.svg";


const HelpCenter  = (props) => {

     const [open, setOpen]   = React.useState(false);
     const [openKvkk, setOpenKvkk]   = React.useState(false);
    const navigate          = useNavigate();
    let error               = useRouteError();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [checked, setChecked] = React.useState(false);


    React.useEffect(()=>{


    },[]);

    const items = [
        {
            key: '1',
            label: "Yardım Duyuruları",
            onClick: () => navigate("/")
        },
        {
            key: '2',
            label: "Toplanma Alanları",
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

        if(!checked){

            api.warning({message:"HATA", description: "KVKK Sözleşmesini kabul ediniz."})

            return false;
        }

        const formData = new FormData();

        formData.append("sender",values.fullname);
        formData.append("phone",values.phone);
        formData.append("city",values.city);
        formData.append("district",values.district);
        formData.append("subject",values.subject);
        formData.append("content",values.content);
        formData.append("status","Yeni");
        formData.append("person","Atama Bekleniyor");


        fetch("https://beta.vobo.cloud/api/v1/insert/multiple/6700-43900-5697-13992/182-6240-8690-4012/4876-5149-9704-6157?language=tr",{
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
                            <a href="/">
                                <img src={LogoPng} style={{width:150}}  alt={"Afet Bilgi Merkezi"}/>
                            </a>
                        </div>
                        <div style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
                            <Button shape={"round"} type={"primary"} danger  icon={<AiOutlineSend/>} onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "ACİL YARDIM",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> ACİL YARDIM </Button>
                        </div>

                    </div>

                </div>

                {
                    isMobile && (
                        <Dropdown  menu={{items}}  trigger={['click']} >
                            <Button style={{width: "95%", marginLeft: "2.5%"}} type="dashed" block>
                                MENÜ <MenuOutlined />
                            </Button>
                        </Dropdown>
                    )
                }
                {
                    !isMobile && (
                        <Radio.Group style={{ marginBottom:(isMobile ? 0 : 15), marginLeft: (isMobile ? 30 : 0)}} size={"middle"} value={window.location.pathname} onChange={(e) => navigate(e.target.value) }>
                            <Radio.Button value="/">Yardım Duyuruları</Radio.Button>
                            <Radio.Button value="/tahliye-toplanma-alanlari">Toplanma Alanları</Radio.Button>
                            <Radio.Button value="/yardim-dagitim-noktalari">Yardım Noktaları</Radio.Button>
                            <Radio.Button value="/son-depremler">Son Depremler</Radio.Button>
                        </Radio.Group>
                    )
                }


                <ContentZone>
                    <Row gutter={10} style={{marginTop:isMobile ? 0 : 30}} justify="start">
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block  onClick={() => {


                                form.setFieldsValue({
                                    content: "Lütfen bekleyiniz konumunuz bulunuyor...."
                                });

                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "TAHLİYE TALEBİ"
                                });

                                navigator.geolocation.getCurrentPosition(function(position) {
                                    console.log("Latitude is :", position.coords.latitude);
                                    console.log("Longitude is :", position.coords.longitude);


                                    form.setFieldsValue({
                                        content: "https://maps.google.com/?q="+position.coords.latitude + "," + position.coords.longitude + " \n\rKonumundan tahliye edilmek istiyorum.\n\r Detaylar : "
                                    });


                                },()=>{

                                    api.warning({message:"HATA", description: "Konum Tespit Edilemedi"})

                                    form.setFieldsValue({
                                        content: ""
                                    });
                                });

                            }} style={{marginBottom:5}}> TAHLİYE TALEBİ GÖNDER </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block  onClick={() => {
                                setOpen(true);


                                form.setFieldsValue({
                                    subject: "İLAÇ TALEBİ",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> İLAÇ TALEBİ GÖNDER </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "GIDA TALEBİ",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> GIDA TALEBİ GÖNDER </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "GİYİSİ TALEBİ",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> GİYİSİ TALEBİ GÖNDER </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "TEDAVİ TALEBİ",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> TEDAVİ TALEBİ GÖNDER </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "BAĞIŞ YAPMAK İSTİYORUM",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> BAĞIŞ YAPMAK İSTİYORUM </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "İŞ BİRLİĞİ",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> İŞ BİRLİĞİ </Button>
                        </Col>
                        <Col md={6} xxl={6} xs={24}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "DİĞER",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> DİĞER </Button>
                        </Col>
                        <Col md={24} xxl={24} xs={24} style={{marginTop:10}}>
                            <Button shape={"round"} type={"dashed"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "PSİKOLOG TALEBİ",
                                    content: ""
                                })
                            }} style={{marginBottom:5, background:"#ffab00"}}> ÜCRETSİZ PSİKOLOG TALEBİ </Button>
                        </Col>
                        <Col md={24} xxl={24} xs={24} style={{marginTop:10}}>
                            <Button shape={"round"} type={"primary"} block onClick={() => {
                                setOpen(true);
                                form.setFieldsValue({
                                    subject: "GÖNÜLLÜ OL",
                                    content: ""
                                })
                            }} style={{marginBottom:5}}> GÖNÜLLÜ OLMAK İSTİYORUM </Button>
                        </Col>
                    </Row>
                </ContentZone>




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

                    <Row gutter={20} style={{marginTop:20}} justify="start">
                        <Col md={12} xxl={6} xs={24}  style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center"}} >
                            <a href="https://ged.org.tr/">
                                <img src={GedLogo} height={60} alt="Grişimcilik Ekosistemi Derneği"/>
                            </a>
                        </Col>
                        <Col md={12} xxl={6} xs={24}  style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center"}} >
                            <a href="https://dijitalkuluckamerkezi.com">
                                <img src={DkmLogo} height={70} alt="Dijital Kuluçka Merkezi"/>
                            </a>
                        </Col>
                        <Col md={12} xxl={6} xs={24}  style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center"}} >
                            <a href="https://vobo.company/">
                                <img src={VoboLogo} height={45} alt="Vobo Company"/>
                            </a>
                        </Col>
                    </Row>
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

                    <Form.Item label="İl" name="city" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Input placeholder={"İl Giriniz"} />
                    </Form.Item>

                    <Form.Item label="İlçe" name="district" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Input placeholder={"İlçe Giriniz"} />
                    </Form.Item>

                    <Form.Item label="İletişim Konusu" name="subject" rules={[{ required: true, message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Select
                            disabled
                            placeholder={"Lütfen iletişim konusu seçiniz"}
                            style={{width: "100%" }}
                            onChange={(e) => {

                                form.setFieldsValue({
                                    content: ""
                                });

                                if(e === "TAHLİYE TALEBİ"){
                                    navigator.geolocation.getCurrentPosition(function(position) {

                                        form.setFieldsValue({
                                            content: "https://maps.google.com/?q="+position.coords.latitude + "," + position.coords.longitude + " \n\rKonumundan tahliye edilmek istiyorum.\n\r Detaylar : "
                                        });


                                    },()=>{

                                        api.warning({message:"HATA", description: "Konum Tespit Edilemedi"})

                                        form.setFieldsValue({
                                            content: ""
                                        });
                                    });
                                }
                            }}
                            options={[
                                {
                                    value: 'ACİL YARDIM',
                                    label: 'ACİL YARDIM',
                                },
                                {
                                    value: 'BAĞIŞ YAPMAK İSTİYORUM',
                                    label: 'BAĞIŞ YAPMAK İSTİYORUM',
                                },
                                {
                                    value: 'İŞ BİRLİĞİ',
                                    label: 'İŞ BİRLİĞİ',
                                },
                                {
                                    value: 'TAHLİYE TALEBİ',
                                    label: 'TAHLİYE TALEBİ',
                                },
                                {
                                    value: 'İLAÇ TALEBİ',
                                    label: 'İLAÇ TALEBİ',
                                },
                                {
                                    value: 'GIDA TALEBİ',
                                    label: 'GIDA TALEBİ',
                                },
                                {
                                    value: 'GİYİSİ TALEBİ',
                                    label: 'GİYİSİ TALEBİ',
                                },
                                {
                                    value: 'TEDAVİ TALEBİ',
                                    label: 'TEDAVİ TALEBİ',
                                },
                                {
                                    value: 'DİĞER',
                                    label: 'DİĞER',
                                },
                                {
                                    value: 'ÜCRETSİZ PSİKOLOG TALEBİ İSTE',
                                    label: 'PSİKOLOG TALEBİ',
                                },
                                {
                                    value: 'GÖNÜLLÜ OL',
                                    label: 'GÖNÜLLÜ OLMAK İSTİYORUM',
                                }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Mesaj" name="content" rules={[{  message: 'Lütfen Bu Alanı Doldurunuz!' }]}>
                        <Input.TextArea rows={10} placeholder={"Lütfen iletişim detaylarınızı giriniz"} />
                    </Form.Item>

                    <Form.Item label="SÖZLEŞME" name="kvkk" >
                        <Checkbox onChange={(e)=>{
                            setChecked(e.target.checked)
                        }} /> <span>Afet Bilgi Merkezi "afetbilgimerkezi.com"  <span style={{cursor:"pointer", fontWeight:900}} onClick={()=>{
                        setOpenKvkk(true)

                    }}>"Kişisel Verileri Koruma Kanunu"</span>  sözleşmesini okudum, kabul, beyan ve taahhüt ediyorum.</span>
                    </Form.Item>

                    <Form.Item  wrapperCol={{offset: isMobile ? 0 : 8, span: 16,}} >
                        <Button block type="default" htmlType="submit">
                            Gönder
                        </Button>
                    </Form.Item>

                </Form>

                <Drawer title="KİŞİSEL VERİLERİ KORUMA KANUNU" placement="right" width={isMobile ? "100%" : 720} onClose={() => setOpenKvkk(false)} open={openKvkk}>
                    <p>afetbilgimerkezi.com</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com, kişisel verilerin gizliliği ve güvenliği konusunda azami hassasiyet göstermektedir. Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu&rsquo;na (bundan böyle &ldquo;KVKK&rdquo; olarak anılacaktır) uygun olarak işlenmekte ve muhafaza edilmektedir. Kişisel Verilerin Korunması Kanunu 7 Nisan 2016 tarihli ve 29677 sayılı Resmi Gazete&rsquo;de yayımlanmıştır. KVKK, kişisel verileri işlenen gerçek kişilerin Anayasamız ve Türk Ceza Kanunlarımız tarafından da korunan özel hayatın gizliliği de dahil olmak üzere gerçek kişilerin temel hak ve özgürlüklerini korumak ve kişisel verileri işleyen gerçek ve tüzel kişilerin yükümlülüklerini belirlemek için düzenlenmiştir. Bu politikanın amacı &rsquo;in ilgili kişilere ait kişisel verilerin KVKK&rsquo;ya uyumlu bir şekilde işlenmesini ve korunmasını sağlamak için yönetim talimatlarını, prosedür şartlarını ve teknik bir politikasını oluşturmaktır.</p>
                    <p>&nbsp;</p>
                    <p>1. TANIMLAR</p>
                    <p>&nbsp;</p>
                    <p>Hizmet/Hizmetler: Üyelerin işbu Kişisel Verilerin Korunması Politikası içerisinde tanımlı olan iş ve işlemlerini gerçekleştirmelerini sağlamak amacıyla afetbilgimerkezi.com tarafından ortaya konulan uygulamaları ifade eder.</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcı/Kullanıcılar: Site&rsquo;ye kayıt olarak veya olmayarak erişim sağlayan gerçek ve tüzel kişileri ifade eder.</p>
                    <p>&nbsp;</p>
                    <p>Site: afetbilgimerkezi.com alan adı ve alt alan adlarından ulaşılabilen web sitesini ifade eder.</p>
                    <p>&nbsp;</p>
                    <p>2. VERİ SORUMLUSU SIFATIYLA BİLGİLENDİRME</p>
                    <p>&nbsp;</p>
                    <p>KVKK uyarınca, kişisel verileriniz; veri sorumlusu olarak afetbilgimerkezi.com tarafından aşağıda açıklanan kapsamda toplanacak ve işlenebilecektir. afetbilgimerkezi.com olarak, KVKK uyarınca ve Veri Sorumlusu sıfatıyla, kişisel verileriniz bu sayfada açıklandığı çerçevede; kaydedilecek, saklanacak, güncellenecek, mevzuatın izin verdiği durumlarda 3. Kişilere açıklanabilecek/devredilebilecek, sınıflandırılabilecek ve KVKK&rsquo;da sayılan şekillerde işlenebilecektir.</p>
                    <p>&nbsp;</p>
                    <p>3. KİŞİSEL VERİLERİNİZİN NE ŞEKİLDE İŞLENEBİLECEĞİ</p>
                    <p>&nbsp;</p>
                    <p>KVKK uyarınca afetbilgimerkezi.com ile paylaştığınız kişisel verileriniz, tamamen veya kısmen, otomatik olarak veyahut herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilerek, kaydedilerek, depolanarak, değiştirilerek, yeniden düzenlenerek, kısacası veriler üzerinde gerçekleştirilen her türlü işleme konu olarak tarafımızdan işlenebilecektir. KVKK kapsamında veriler üzerinde gerçekleştirilen her türlü işlem &ldquo;kişisel verilerin işlenmesi&rdquo; olarak kabul edilmektedir.</p>
                    <p>&nbsp;</p>
                    <p>4. HANGİ AMAÇLA BİLGİLERİNİZİ TOPLUYORUZ VE İŞLİYORUZ?</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com, Site üzerinden Kullanıcılar&rsquo;a ait verileri genel olarak aşağıdaki amaçlar ile toplayabilecek ve işleyebilecektir:</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcılarımıza kişiselleştirilmiş hizmetler sunmak ve kullanıcı tecrübesini daha kaliteli hale getirerek kullanıcı memnuniyetini arttırmak,</p>
                    <p>&nbsp;</p>
                    <p>Üyelerimizin veya ziyaretçilerimizin bize izin verdiği ölçüde onlarla iletişime geçmek, onları hizmet ve fırsatlardan haberdar etmek,</p>
                    <p>&nbsp;</p>
                    <p>Site ve uygulamaların teknik açıdan fonksiyonlarını izlemek, gerektiği gibi çalışmasını sağlamak ve çıkabilecek sorunları çözmek,</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcı sözleşmemiz uyarınca sunduğumuz hizmetleri gerçekleştirmek,</p>
                    <p>&nbsp;</p>
                    <p>Elektronik posta ile bülten göndermek ya da tanıtım veya bildirimlerde bulunmak,</p>
                    <p>&nbsp;</p>
                    <p>SMS ile tanıtım veya bildirimlerde bulunmak,</p>
                    <p>&nbsp;</p>
                    <p>Sizden gelen çağrıları karşılamak ve destek ihtiyaçlarınıza cevap vermek,</p>
                    <p>&nbsp;</p>
                    <p>Güncel ve Ar-Ge aşamasındaki uygulamalarımızın geliştirmek ve yönetimi sürecinde ürünü pazarlamak,</p>
                    <p>&nbsp;</p>
                    <p>Talebiniz doğrultusunda veya sosyal medyada yer alan şikayetlerin olması halinde afetbilgimerkezi.com hesabınızı incelemek,</p>
                    <p>&nbsp;</p>
                    <p>Verdiğimiz hizmetlere ilişkin bir şikâyet olduğu takdirde söz konusu şikâyeti sonuçlandırmak,</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcının kimliğini ifşa etmeden çeşitli istatistiksel değerlendirmeler, veri tabanı oluşturma ve pazar araştırmalarında kullanmak,</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com işbu Kişisel Verilerin Korunması ve Veri Politikası dışında başka verilerin güvenliği, gizliliği, toplanması vb. hususlarda başka politikalar veya prosedürler benimsemiş olabilir. Bu nedenle diğer politika ve hukuki metinleri de incelemenizi tavsiye ederiz.</p>
                    <p>&nbsp;</p>
                    <p>5. KİŞİSEL VERİLERİNİZİN İŞLENME AMAÇLARI VE HUKUKİ SEBEPLERİ</p>
                    <p>&nbsp;</p>
                    <p>Paylaştığınız kişisel veriler,</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcılarımıza verdiğimiz hizmetlerin gereklerini, sözleşmenin ve teknolojinin gereklerine uygun şekilde yapabilmek, sunulan ürün ve hizmetlerimizi geliştirebilmek için;</p>
                    <p>&nbsp;</p>
                    <p>6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ile bu düzenlemelere dayanak yapılarak hazırlanan 26.08.2015 tarihli 29457 sayılı Resmi Gazete&rsquo;de yayınlanan Elektronik Ticarette Hizmet Sağlayıcı ve Aracı Hizmet Sağlayıcılar Hakkında Yönetmelik, 27.11.2014 tarihli ve 29188 sayılı Resmi Gazete&rsquo;de yayınlanan Mesafeli Sözleşmeler Yönetmeliği ve diğer ilgili mevzuat kapsamında işlem sahibinin bilgilerini tespit için kimlik, adres ve diğer gerekli bilgileri kaydetmek için;</p>
                    <p>&nbsp;</p>
                    <p>Bankacılık ve Elektronik Ödeme alanında zorunlu olan ödeme sistemleri, elektronik sözleşme veya kağıt ortamında işleme dayanak olacak tüm kayıt ve belgeleri düzenlemek; mevzuat gereği ve diğer otoritelerce öngörülen bilgi saklama, raporlama, bilgilendirme yükümlülüklerine uymak için;</p>
                    <p>&nbsp;</p>
                    <p>Kamu güvenliğine ilişkin hususlarda ve hukuki uyuşmazlıklarda, talep halinde ve mevzuat gereği savcılıklara, mahkemelere ve ilgili kamu görevlilerine bilgi verebilmek için;</p>
                    <p>&nbsp;</p>
                    <p>Üyelerimize geniş kapsamda çeşitli imkanlar sunabilmek veya bu imkanları sunabilecek kişi veya kurumlarla yasal çerçevede paylaşabilmek için; KVKK ve ilgili ikincil düzenlemelere uygun olarak işlenecektir.</p>
                    <p>&nbsp;</p>
                    <p>6. İŞLENEN KİŞİSEL VERİLERİN KİMLERE VE HANGİ AMAÇLA AKTARILABİLECEĞİ</p>
                    <p>&nbsp;</p>
                    <p>Kullanım Koşullarını ve Kişisel Veriler Politikası&rsquo;nı kabul etmekle, afetbilgimerkezi.com ile afetbilgimerkezi.com&rsquo;nun bünyesindeki diğer Kullanıcılar ile paylaşılmasına rıza göstermiş olduğunuz kişisel verilerinizin, tarafınıza çeşitli avantajların sağlanıp sunulabilmesi amacıyla; toplanmasına, saklanmasına, işlenmesine, kullanılmasına, aktarımına izin vermiş bulunmaktasınız. Bunun yanında, bu bilgiler sadece size sağlanacak hizmetlerin kusursuz sunulabilmesi, olası gönderilerinizin sağlıklı şekilde teslim edilmesi, telefon, sms ve/veya e-posta yoluyla bildirimlerimizin zamanında ulaştırılabilmesi amacıyla, sözleşme ilişkisi içinde olduğumuz, veri koruması ve güvenliği konusunda bizimle hukuken ve teknik olarak aynı sorumlulukları taşıyan, ilgili mevzuat hükümlerine riayet eden üçüncü kişilerle, yalnızca ihtiyaç durumunda ve gerekli ölçüde paylaşılacaktır.</p>
                    <p>&nbsp;</p>
                    <p>7. SİZE AİT KİŞİSEL VERİLERİ NASIL TOPLUYORUZ?</p>
                    <p>&nbsp;</p>
                    <p>Kişisel verileriniz afetbilgimerkezi.com&rsquo;yu veya afetbilgimerkezi.com&rsquo;nun vasıta olduğu bir platformu kullandığınızda, reklam veya pazarlama ilanlarına giriş/başvuru yaptığınızda, üye veya kayıt olduğunuzda ve çerezlerle yazılı/fiziksel veya elektronik ortamda toplanabilir.</p>
                    <p>&nbsp;</p>
                    <p>7.1. Kimlik Bilgisi</p>
                    <p>&nbsp;</p>
                    <p>Siteye kayıt olmanız ile beraber &ldquo;Adınız&rdquo;, &ldquo;Soyadınız&rdquo;, &ldquo;Doğum Tarihiniz&rdquo;, &ldquo;Cinsiyetiniz&rdquo;, gibi bilgileri afetbilgimerkezi.com ile kendi isteğiniz ile paylaşmaktasınız.</p>
                    <p>&nbsp;</p>
                    <p>Site&rsquo;ye Facebook, Linkedin v.b. sosyal ağlarda yer alan hesaplarınız aracılığıyla da isim, soy isim, doğum tarihi, elektronik posta adresi vb. bilgileri girmeden kayıt veya üye olmak mümkündür. İşbu Kişisel Verilerin Korunması ve Veri Politikası kapsamında sosyal ağlar üzerinden hizmetlerimize kayıt veya üye olmayı tercih etmeniz halinde, söz konusu sosyal ağlar tarafından tarafımıza gönderilen verileri işleme, aktarma, saklama yetkilerini tarafımıza vermiş olursunuz.</p>
                    <p>&nbsp;</p>
                    <p>7.2. İletişim Bilgisi</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com&rsquo;ya kayıt olmanız ile beraber &ldquo;Elektronik Posta Adresiniz&rdquo;, &ldquo;Adresiniz&rdquo;, &ldquo;Yaşadığınız İl ve İlçe&rdquo; ve &ldquo;Cep Telefonu&rdquo; gibi bilgileri afetbilgimerkezi.com ile kendi isteğiniz ile paylaşmaktasınız.</p>
                    <p>&nbsp;</p>
                    <p>7.3. Eğitim ve Kariyer Bilgisi</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com&rsquo;ya kayıt olmanız ile beraber &ldquo;Eğitim Seviyesi&rdquo;, &ldquo;Üniversite&rdquo; gibi bilgileri afetbilgimerkezi.com ile kendi isteğiniz ile paylaşmaktasınız.</p>
                    <p>&nbsp;</p>
                    <p>7.4. Fotoğraf ve Görsel Bilgiler</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com&rsquo;ya kayıt olmanız ile beraber fotoğraflarınızı ve girişiminize ve ortaklarına ilişkin görselleri afetbilgimerkezi.com ile afetbilgimerkezi.com&rsquo;da yayınlanmak üzere kendi isteğiniz ile paylaşmaktasınız.</p>
                    <p>&nbsp;</p>
                    <p>7.5. Girişime İlişkin Bilgiler</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com&rsquo;ya girişimci kaydı yapmanı ile birlikte &ldquo;Girişim Adı&rdquo;, &ldquo;Girişim Fikri&rdquo;, &ldquo;Girişim Aşaması&rdquo;, &ldquo;Girişime Başlangıç Tarihi&rdquo;, &ldquo;Ortakların İsimleri&rdquo; ve &ldquo;Girişim Özeti&rdquo; bölümlerinde yer alabilecek kişisel verileri afetbilgimerkezi.com ile afetbilgimerkezi.com&rsquo;da yayınlanmak üzere kendi isteğiniz ile paylaşmaktasınız.</p>
                    <p>&nbsp;</p>
                    <p>7.6. Diğer Bilgiler</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcı tarafından tercih edilen bilgileri Smatch(otomatik eşleştirme) bilgisi (evet/hayır) ve benzer diğer bilgileri afetbilgimerkezi.com ile kendi isteğiniz ile paylaşmaktasınız.</p>
                    <p>&nbsp;</p>
                    <p>7.7. Kişisel Veriniz Olmayan ve Otomatik Olarak Topladığımız Bilgiler</p>
                    <p>&nbsp;</p>
                    <p>Login ID, IP adresi, log kayıtları, istenilen ek bilgiler, üye olduğu tarih, yaptığı başvurular, siteye login olma sıklığı/zamanları, ios/mobil site/ web site kullanıcısı, güncelleme tarihi, son giriş tarihi, ilk üyelik tarihi, uygulama silindi (evet/hayır), uygulamaların kullanılışı bilgisi (uygulama içerisinde yapılan her hareket ve seçim), ve buna benzer kullandığımız teknolojileri üye ve ziyaretçilerimizin ihtiyaçlarına uyumlu hale getirmek, teknik aksaklıkları gidermek, teknik altyapımızı denetlemek amacıyla sizin hakkınızda veri toplayabiliriz. Çerezler veya diğer program ve yazımlarımız vasıtasıyla site içi kullanımlarınıza bağlı olarak tıklama sayınız, sekmeleri açma sıklığınız veya ilgi gösterdiğiniz başlıklara ilişkin dijital ortamdaki davranışlarınız hakkında bilgi toplayabiliriz.</p>
                    <p>&nbsp;</p>
                    <p>Cihaz Bilgisi</p>
                    <p>&nbsp;</p>
                    <p>Kullandığınız elektronik cihazlar (bilgisayar, diz üstü bilgisayar, tabletler, akıllı telefonlar, akıllı televizyonlar vb.) üzerinden cihazınıza ait sizle eşleştirilemeyecek veya eşleştirilebilecek veriler (örn. konum bilgisi gibi) toplayabiliriz. Mobil uygulamalarımız (applications) veya internet sitemizde yer alan anlık bildirimler (push notifications) gönderebiliriz. Bu mesajlarımızı almak istemiyorsanız cihazınızın veya mobil uygulamanın ayarlarını değiştirerek bu mesajlarımızı reddedebilirsiniz.</p>
                    <p>&nbsp;</p>
                    <p>Çerezler Bilgisi</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com&rsquo;ya ait kullanım bilgileriniz, teknik bir iletişim dosyasını (Çerez- Cookie) kullanarak elde edebilir. Bahsi geçen teknik iletişim dosyaları, ana bellekte saklanmak üzere bir internet sitesinin, kullanıcının tarayıcısına (browser) gönderdiği küçük metin dosyalarıdır. Teknik iletişim dosyası bir internet sitesi hakkında durum ve tercihleri saklayarak internetin kullanımını kolaylaştırır. Teknik iletişim dosyası, afetbilgimerkezi.com&rsquo;yu kaç kişinin kullandığını, bir kişinin afetbilgimerkezi.com&rsquo;nun hangi amaçla, kaç kez ziyaret edildiğini ve ne kadar kaldığı hakkında istatistiksel bilgileri elde etmek ve kullanıcılar için özel tasarlanmış kullanıcı sayfalarından dinamik olarak içerik üretilmesine yardımcı olur. Teknik iletişim dosyası, ana bellekten veya elektronik postasından veri veya başkaca herhangi bir kişisel bilgi almak için tasarlanmamıştır. Tarayıcıların pek çoğu başta teknik iletişim dosyasını kabul eder biçimde tasarlanmıştır, ancak kullanıcılar dilerse teknik iletişim dosyasının gelmemesi veya teknik iletişim dosyasının gönderildiğinde ikaz verilmesini sağlayacak biçimde ayarları değiştirebilirler. Üye, işbu ayarları değiştirmediği sürece çerez kullanımına açık onay verdiği kabul edilir.</p>
                    <p>&nbsp;</p>
                    <p>Çerez teknolojisini kullanabilir ve bunları cihazınıza yerleştirebiliriz. Çerezleri kabul etmemeniz halinde Site beklediğiniz fonksiyonları gerçekleştirmeyebilir veya aksaklıklar oluşabilir.</p>
                    <p>&nbsp;</p>
                    <p>Çerezler üzerinden alınan verileri 3. kişilerle reklam amaçlarıyla paylaşabiliriz.</p>
                    <p>&nbsp;</p>
                    <p>Bu kişisel veriler Üyelik avantajlarından yararlanabilmeniz adına, açık rızanıza istinaden, Gizlilik ve Kişisel Verilerin Korunması Politikası ile belirlenen amaçlar ve kapsam dışında kullanılmamak kaydı ile bilgi güvenliği tedbirleri de alınarak işlenecek ve saklanacaktır.</p>
                    <p>&nbsp;</p>
                    <p>Site Üzerinden 3. Kişi İnternet Siteleri veya Mobil Uygulamalara Verilen Linkler</p>
                    <p>&nbsp;</p>
                    <p>Üçüncü kişilere ait internet sitelerine, portallere veya mobil uygulamalara linkler verebiliriz. Fakat bu sitelerde yer alan veya 3. kişilerin tabi olduğu gizlilik politikalarının uygulanması hususunda hiçbir sorumluluğumuz bulunmamaktadır.</p>
                    <p>&nbsp;</p>
                    <p>3. kişilere ait internet siteleri veya mobil uygulamalar kapsamındaki gizlilik politikaları işbu Kişisel Verilerin Korunması ve Veri Politikası&rsquo;ndan farklı olabilir.</p>
                    <p>&nbsp;</p>
                    <p>8. BİLGİLERİNİZİN SAKLANMA SÜRESİ</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com, KVKK 7. maddesi ve Türk Ceza Kanunu&rsquo;nun 138. maddesi uyarınca işlediği kişisel verileri yalnızca ilgili mevzuatta öngörülen veya mevzuatta bir süre öngörülmemiş ise kişisel veri işleme amacının gerektirdiği süre kadar muhafaza eder. Tutulan veriler verinin tutulma amacı sona erdikten sonra silinecek olup ortalama olarak 2 yıl belirlenmekle birlikte mevzuatsal olarak daha uzun süre öngörülen veriler mevzuatta belirtildiği süreyle sistemde kalmaya devam edecektir.</p>
                    <p>&nbsp;</p>
                    <p>Her bir kişisel veri için ilgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süreye ilişkin farklı bir muhafaza süresi geçerli olabilmektedir. Örneğin Vergi Usul Kanunu 253. maddesi uyarınca defter ve vesikalar 5 yıl süre ile muhafaza edilmelidir. Ticari elektronik iletinin içeriği ve gönderiye ilişkin diğer her türlü kayıt ise gerektiğinde ilgili bakanlığa sunulmak üzere 3 yıl saklanacaktır.</p>
                    <p>&nbsp;</p>
                    <p>Diğer yandan, bir veri birden fazla amaç için de işlenmiş olabilir ve böyle bir durumda ilgili verinin işlenmesine neden olan tüm nedenler ortadan kalktığında ilgili veri silinir, yok edilir veya anonim hale getirilerek muhafaza edilir.</p>
                    <p>&nbsp;</p>
                    <p>KVKK ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olan kişisel veriler, işlenmesini gerektiren sebeplerin ortadan kalkması halinde resen veya ilgili kişinin talebi üzerine afetbilgimerkezi.com tarafından, bu verilerin hiçbir şekilde kullanılmayacak ve geri getirilmeyecek şekilde silinmesi, yok edilmesi veya anonim hale getirilmesi gerekmektedir. Kişisel verilerin hukuka uygun olarak yok edilmesi veya anonim hale getirilmesine ilişkin usul ve esaslar KVKK Yönetmeliği&rsquo;nde belirtilecek ilke ve kurallara uygun şekilde yerine getirilecektir.</p>
                    <p>&nbsp;</p>
                    <p>9. KİŞİSEL VERİLERİN GÜVENLİĞİ</p>
                    <p>&nbsp;</p>
                    <p>KVKK&rsquo;nın 12. maddesi uyarınca, veri sorumlusu sıfatıyla afetbilgimerkezi.com&rsquo;nun veri güvenliğine ilişkin yükümlülükleri şu şekildedir:</p>
                    <p>&nbsp;</p>
                    <p>Kişisel verilerin;</p>
                    <p>&nbsp;</p>
                    <p>Hukuka aykırı işlenmesini önlemek,</p>
                    <p>&nbsp;</p>
                    <p>Hukuka aykırı erişimi önlemek,</p>
                    <p>&nbsp;</p>
                    <p>Muhafazasını sağlamak için her türlü teknik ve idari tedbir almak,</p>
                    <p>&nbsp;</p>
                    <p>Kuruluşu içinde gerekli denetimleri yapmak veya yaptırmak,</p>
                    <p>&nbsp;</p>
                    <p>Kendisi adına kişisel verileri işleyen kişilerin veya organlarında görev alan yetkililerin görevlerinden ayrılsalar dahi, görevleri sırasında öğrendikleri kişisel verileri kanun hükümlerine aykırı olarak başkasına açıklamaması ve işleme amacı dışında kullanmaması için gerekli önlemleri alır,</p>
                    <p>&nbsp;</p>
                    <p>İşlenen kişisel verilerin hukuka aykırı olarak başkaları tarafından ele geçirilmesi halinde ilgilisine ve Kurul&rsquo;a bildirmektir.</p>
                    <p>&nbsp;</p>
                    <p>10. afetbilgimerkezi.com&rsquo;NUN VERİ GÜVENLİĞİNE İLİŞKİN ALDIĞI TEDBİRLER</p>
                    <p>&nbsp;</p>
                    <p>KVKK&rsquo;da kişisel verinin işlenmesi, aktarılması ve muhafaza edilmesine ilişkin ilgili bölümlerde alınması gereken teknik ve idari tedbirler sayılmıştır. afetbilgimerkezi.com bu tedbirleri eksiksiz olarak almak ve hukuka aykırı erişimi engellemekle yükümlü olduğu halde; yine de üçüncü kişilerin kişisel verilere hukuka aykırı erişimi söz konusu olmuş ise; kişisel verilerin korunmasına ilişkin ilgili mevzuata ve Kurul kararlarına uygun şekilde ilgililerin zarar görmemesi için teknik ve idari tüm tedbirleri alır.</p>
                    <p>&nbsp;</p>
                    <p>Kişisel verilerin korunması konusunda alınan tedbirler ve bunların denetimi afetbilgimerkezi.com bünyesinde kullanılmakta olan veri kayıt sistemlerinin KVKK ve ilgili mevzuata uygun şekilde oluşturulduğu ve kullanıldığı periyodik olarak takip edilerek denetlenir ve bu konuda yetkili kılınan kişi veya kurula raporlama yapılır.</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com verdiği yetkiye dayanarak onun adına kişisel verileri işleyen gerçek veya tüzel kişileri kişisel verilerin hukuka uygun bir şekilde korunmasına ilişkin bilgilendirmek ve farkındalık yaratmak; aynı zamanda bu kişilerle akdedilen sözleşmeler çerçevesinde kişisel verilerinin hukuka uygun şekilde korunmasına yönelik hükümler belirlemekle yükümlüdür.</p>
                    <p>&nbsp;</p>
                    <p>11. KİŞİSEL VERİLERİN YETKİSİZ BİR ŞEKİLDE İFŞASI DURUMUNDA ALINACAK TEDBİRLER</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com, kişisel verilerin yetkisiz bir şekilde ifşasının engellenmesine yönelik tedbirler almakla ve buna ilişkin iç politika oluşturmakla yükümlüdür. Buna ek olarak, söz konusu durumlarda afetbilgimerkezi.com, veri sorumlusu olarak, kişisel verileri yetkisiz bir şekilde ifşa edilen kişileri ve KVKK Kurulunu bilgilendirmekle yükümlüdür.</p>
                    <p>&nbsp;</p>
                    <p>Kullanıcılar ve/veya Üyeler (Gerçek Kişiler) Siteyi kullanmaya başladıkları andan itibaren kendilerinden toplanan tüm bilgilerin bu Kişisel Verilerin Korunması ve Veri Politikası&rsquo;nda anlatıldığı gibi, afetbilgimerkezi.com tarafından kullanılmasını kabul etmiş olurlar. Kullanıcılar ve/veya Üyeler&rsquo;e (Gerçek Kişiler) ilişkin bilgiler tamamen kendilerinin özgür iradeleri ile afetbilgimerkezi.com &rsquo;ya sağlanmaktadır. Kullanıcılar ve/veya Üyeler (Gerçek Kişiler) bu kişisel bilgileri afetbilgimerkezi.com&rsquo;ya verip vermemekte serbesttirler. Kullanıcılar ve/veya Üyeler (Gerçek Kişiler) tarafından verilen bilgilerin doğru ve eksiksiz olması kendilerinin sorumluluğundadır. Kullanıcılar ve/veya Üyeler (Gerçek Kişiler) yanlış, yanıltıcı veya eksik bilgi vermemelidir.</p>
                    <p>&nbsp;</p>
                    <p>12. İLETİ İZNİ VE BAŞVURU YÖNTEMİ</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com, Üye veya Kullanıcılardan temin edilen kişiler bilgileri e- posta/sms vb. aracılığıyla yayın göndermek, bülten göndermek, bildirimlerde bulunmak, ürünler ve hizmet hakkında bilgi vermek, kampanya bilgilerini paylaşmak, 3. tarafların reklamlarını paylaşmak ve benzeri hizmetlerde bulunmaktadır. afetbilgimerkezi.com tarafından iletilen işbu ticari elektronik iletileri ve kısa mesajları Üyeler almak istemiyor ve almayı onaylamıyor ise info@afetbilgimerkezi.com adresine e-posta gönderip veya ayarlar sayfasından gerekli seçenekleri kaldırarak listeden çıkmaları gerekmektedir.</p>
                    <p>&nbsp;</p>
                    <p>Başvurunuzda yer alan talepleriniz, talebin niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandırılacaktır. Ancak, işlemin Şirket için ayrıca bir maliyeti gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.</p>
                    <p>&nbsp;</p>
                    <p>afetbilgimerkezi.com Site dahilinde başka sitelere link verebilir, ancak bu afetbilgimerkezi.com&rsquo;nun işbu siteler ile herhangi bir bağı olduğu anlamına gelmemektedir. afetbilgimerkezi.com, link vasıtasıyla erişilen sitelerin gizlilik uygulamaları ve içeriklerine yönelik herhangi bir sorumluluk taşımamaktadır.</p>
                    <p>&nbsp;</p>
                    <p>13. YÜRÜRLÜK</p>
                    <p>&nbsp;</p>
                    <p>İşbu KVK Politikası yayınlandığı tarihte yürürlüğe girer ve Site&rsquo;den kaldırılana kadar yürürlükte kalmaya devam eder. Kişisel Verilerin Korunması ve Veri Politikamız 10.04.2019 tarihlidir. KVK Politikası&rsquo;nın tümünün veya belirli maddelerinin yenilenmesi durumunda yürürlük tarihi güncellenecektir.</p>
                    <p>&nbsp;</p>
                    <p>14. İLETİŞİM BİLGİLERİ</p>
                    <p>&nbsp;</p>
                    <p>Email: afetbilgimerkezi@dijitalkuluckamerkezi.com</p>
                </Drawer>


            </Drawer>






        </App>


    </>)

};


export default HelpCenter;