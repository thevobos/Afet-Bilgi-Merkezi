const cities = [
    { id: 1, name: "ADANA", coordinates: { latitude: 37, longitude: 35.321333 } },
    { id: 2, name: "ADIYAMAN", coordinates: { latitude: 37.764751, longitude: 38.278561 } },
    { id: 3, name: "AFYONKARAHİSAR", coordinates: { latitude: 38.750714, longitude: 30.556692 } },
    { id: 4, name: "AĞRI", coordinates: { latitude: 39.626922, longitude: 43.021596 } },
    { id: 5, name: "AKSARAY", coordinates: { latitude: 38.36869, longitude: 34.03698 } },
    { id: 6, name: "AMASYA", coordinates: { latitude: 40.64991, longitude: 35.83532 } },
    { id: 7, name: "ANKARA", coordinates: { latitude: 39.92077, longitude: 32.85411 } },
    { id: 8, name: "ANTALYA", coordinates: { latitude: 36.88414, longitude: 30.70563 } },
    { id: 9, name: "ARDAHAN", coordinates: { latitude: 41.110481, longitude: 42.702171 } },
    { id: 10, name: "ARTVİN", coordinates: { latitude: 41.18277, longitude: 41.818292 } },
    { id: 11, name: "AYDIN", coordinates: { latitude: 37.856041, longitude: 27.841631 } },
    { id: 12, name: "BALIKESİR", coordinates: { latitude: 39.648369, longitude: 27.88261 } },
    { id: 13, name: "BARTIN", coordinates: { latitude: 41.581051, longitude: 32.460979 } },
    { id: 14, name: "BATMAN", coordinates: { latitude: 37.881168, longitude: 41.13509 } },
    { id: 15, name: "BAYBURT", coordinates: { latitude: 40.255169, longitude: 40.22488 } },
    { id: 16, name: "BİLECİK", coordinates: { latitude: 40.056656, longitude: 30.066524 } },
    { id: 17, name: "BİNGÖL", coordinates: { latitude: 39.062635, longitude: 40.76961 } },
    { id: 18, name: "BİTLİS", coordinates: { latitude: 38.393799, longitude: 42.12318 } },
    { id: 19, name: "BOLU", coordinates: { latitude: 40.575977, longitude: 31.578809 } },
    { id: 20, name: "BURDUR", coordinates: { latitude: 37.461267, longitude: 30.066524 } },
    { id: 21, name: "BURSA", coordinates: { latitude: 40.266864, longitude: 29.063448 } },
    { id: 22, name: "ÇANAKKALE", coordinates: { latitude: 40.155312, longitude: 26.41416 } },
    { id: 23, name: "ÇANKIRI", coordinates: { latitude: 40.601343, longitude: 33.613421 } },
    { id: 24, name: "ÇORUM", coordinates: { latitude: 40.550556, longitude: 34.955556 } },
    { id: 25, name: "DENİZLİ", coordinates: { latitude: 37.77652, longitude: 29.08639 } },
    { id: 26, name: "DİYARBAKIR", coordinates: { latitude: 37.91441, longitude: 40.230629 } },
    { id: 27, name: "DÜZCE", coordinates: { latitude: 40.843849, longitude: 31.15654 } },
    { id: 28, name: "EDİRNE", coordinates: { latitude: 41.681808, longitude: 26.562269 } },
    { id: 29, name: "ELAZIĞ", coordinates: { latitude: 38.680969, longitude: 39.226398 } },
    { id: 30, name: "ERZİNCAN", coordinates: { latitude: 39.75, longitude: 39.5 } },
    { id: 31, name: "ERZURUM", coordinates: { latitude: 39.9, longitude: 41.27 } },
    { id: 32, name: "ESKİŞEHİR", coordinates: { latitude: 39.776667, longitude: 30.520556 } },
    { id: 33, name: "GAZİANTEP", coordinates: { latitude: 37.06622, longitude: 37.38332 } },
    { id: 34, name: "GİRESUN", coordinates: { latitude: 40.912811, longitude: 38.38953 } },
    { id: 35, name: "GÜMÜŞHANE", coordinates: { latitude: 40.438588, longitude: 39.508556 } },
    { id: 36, name: "HAKKARİ", coordinates: { latitude: 37.583333, longitude: 43.733333 } },
    { id: 37, name: "HATAY", coordinates: { latitude: 36.401849, longitude: 36.34981 } },
    { id: 38, name: "IĞDIR", coordinates: { latitude: 39.887984, longitude: 44.004836 } },
    { id: 39, name: "ISPARTA", coordinates: { latitude: 37.764771, longitude: 30.556561 } },
    { id: 40, name: "İSTANBUL", coordinates: { latitude: 41.00527, longitude: 28.97696 } },
    { id: 41, name: "İZMİR", coordinates: { latitude: 38.41885, longitude: 27.12872 } },
    { id: 42, name: "KAHRAMANMARAŞ", coordinates: { latitude: 37.585831, longitude: 36.937149 } },
    { id: 43, name: "KARABÜK", coordinates: { latitude: 41.2061, longitude: 32.62035 } },
    { id: 44, name: "KARAMAN", coordinates: { latitude: 37.17593, longitude: 33.228748 } },
    { id: 45, name: "KARS", coordinates: { latitude: 40.616667, longitude: 43.1 } },
    { id: 46, name: "KASTAMONU", coordinates: { latitude: 41.38871, longitude: 33.78273 } },
    { id: 47, name: "KAYSERİ", coordinates: { latitude: 38.73122, longitude: 35.478729 } },
    { id: 48, name: "KIRIKKALE", coordinates: { latitude: 39.846821, longitude: 33.515251 } },
    { id: 49, name: "KIRKLARELİ", coordinates: { latitude: 41.733333, longitude: 27.216667 } },
    { id: 50, name: "KIRŞEHİR", coordinates: { latitude: 39.14249, longitude: 34.17091 } },
    { id: 51, name: "KİLİS", coordinates: { latitude: 36.718399, longitude: 37.12122 } },
    { id: 52, name: "KOCAELİ", coordinates: { latitude: 40.85327, longitude: 29.88152 } },
    { id: 53, name: "KONYA", coordinates: { latitude: 37.866667, longitude: 32.483333 } },
    { id: 54, name: "KÜTAHYA", coordinates: { latitude: 39.416667, longitude: 29.983333 } },
    { id: 55, name: "MALATYA", coordinates: { latitude: 38.35519, longitude: 38.30946 } },
    { id: 56, name: "MANİSA", coordinates: { latitude: 38.619099, longitude: 27.428921 } },
    { id: 57, name: "MARDİN", coordinates: { latitude: 37.321163, longitude: 40.724477 } },
    { id: 58, name: "MERSİN", coordinates: { latitude: 36.8, longitude: 34.633333 } },
    { id: 59, name: "MUĞLA", coordinates: { latitude: 37.215278, longitude: 28.363611 } },
    { id: 60, name: "MUŞ", coordinates: { latitude: 38.946189, longitude: 41.753893 } },
    { id: 61, name: "NEVŞEHİR", coordinates: { latitude: 38.69394, longitude: 34.685651 } },
    { id: 62, name: "NİĞDE", coordinates: { latitude: 37.966667, longitude: 34.683333 } },
    { id: 63, name: "ORDU", coordinates: { latitude: 40.983879, longitude: 37.876411 } },
    { id: 64, name: "OSMANİYE", coordinates: { latitude: 37.213026, longitude: 36.176261 } },
    { id: 65, name: "RİZE", coordinates: { latitude: 41.02005, longitude: 40.523449 } },
    { id: 66, name: "SAKARYA", coordinates: { latitude: 40.693997, longitude: 30.435763 } },
    { id: 67, name: "SAMSUN", coordinates: { latitude: 41.292782, longitude: 36.33128 } },
    { id: 68, name: "SİİRT", coordinates: { latitude: 37.933333, longitude: 41.95 } },
    { id: 69, name: "SİNOP", coordinates: { latitude: 42.02314, longitude: 35.153069 } },
    { id: 70, name: "SİVAS", coordinates: { latitude: 39.747662, longitude: 37.017879 } },
    { id: 71, name: "ŞANLIURFA", coordinates: { latitude: 37.159149, longitude: 38.796909 } },
    { id: 72, name: "ŞIRNAK", coordinates: { latitude: 37.418748, longitude: 42.491834 } },
    { id: 73, name: "TEKİRDAĞ", coordinates: { latitude: 40.983333, longitude: 27.516667 } },
    { id: 74, name: "TOKAT", coordinates: { latitude: 40.316667, longitude: 36.55 } },
    { id: 75, name: "TRABZON", coordinates: { latitude: 41.00145, longitude: 39.7178 } },
    { id: 76, name: "TUNCELİ", coordinates: { latitude: 39.307355, longitude: 39.438778 } },
    { id: 77, name: "UŞAK", coordinates: { latitude: 38.682301, longitude: 29.40819 } },
    { id: 78, name: "VAN", coordinates: { latitude: 38.48914, longitude: 43.40889 } },
    { id: 79, name: "YALOVA", coordinates: { latitude: 40.65, longitude: 29.266667 } },
    { id: 80, name: "YOZGAT", coordinates: { latitude: 39.818081, longitude: 34.81469 } },
    { id: 81, name: "ZONGULDAK", coordinates: { latitude: 41.456409, longitude: 31.798731 } },
];

const getCityData = (cityName) => {
    return cities.filter(city => city.name === cityName.toLocaleUpperCase('tr-TR'));
};

export default  getCityData;