import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";


const SEED = [
  {ad:"ALİ ASAF",ucret:6000,odeme_tarihi:"2025-07-28",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"YUNUS EMRE",ucret:7200,odeme_tarihi:"2025-07-11",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"YAMAN",ucret:7400,odeme_tarihi:"2025-07-11",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"BURAK ÜLKER",ucret:7800,odeme_tarihi:"2025-07-25",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EMİN BUĞRA",ucret:6000,odeme_tarihi:"2025-09-15",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"ABDURRAHMAN",ucret:4000,odeme_tarihi:"2025-06-27",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"AHMET EMRE KAPUCU",ucret:5000,odeme_tarihi:"2025-07-26",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"ALİ",ucret:6000,odeme_tarihi:"2025-08-10",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"NEHİR",ucret:7200,odeme_tarihi:"2025-08-10",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"YUSUF",ucret:6800,odeme_tarihi:"2025-08-09",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EYMEN",ucret:6000,odeme_tarihi:"2025-08-07",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"UMUT ŞİRİN",ucret:5000,odeme_tarihi:"2025-09-06",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"KEMAL",ucret:7400,odeme_tarihi:"2025-09-11",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"UMUT ÇINAR ŞAHİN",ucret:7800,odeme_tarihi:"2025-09-11",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"OĞUZHAN",ucret:7300,odeme_tarihi:"2025-09-11",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EYMEN KAYA",ucret:5000,odeme_tarihi:"2025-09-11",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"İBRAHİM",ucret:4000,odeme_tarihi:"2025-09-25",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUHAMMET İSMET SUR",ucret:5000,odeme_tarihi:"2025-09-27",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"BERAT KAYA",ucret:4500,odeme_tarihi:"2025-12-20",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MEHMET AKİF",ucret:6000,odeme_tarihi:"",grup:"Kids",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EYMEN YALVI",ucret:7000,odeme_tarihi:"2025-10-26",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"BURAK SEÇKİN",ucret:6000,odeme_tarihi:"2025-08-27",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"CAN",ucret:7000,odeme_tarihi:"2025-08-02",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUHAMMET",ucret:6000,odeme_tarihi:"2025-12-24",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"ALİ AREL BALIKLIPINAR",ucret:6000,odeme_tarihi:"2025-10-05",grup:"Kids",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"CANBERK ALBAKSAN",ucret:7800,odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"BADEMLİ OZAN",ucret:5000,odeme_tarihi:"2025-11-15",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"SÜLEYMAN",ucret:5000,odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EMİR ARAS",ucret:6000,odeme_tarihi:"2025-12-06",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUHAMMET (KÜÇÜK)",ucret:6000,odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EYMEN (2)",ucret:6750,odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"GÖKAY KAYRA ÇİRASUN",ucret:4000,odeme_tarihi:"2025-01-02",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"FURKAN EYMEN GÖKÇE",ucret:6000,odeme_tarihi:"2025-01-02",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"ALİ KORHAN KÖKLÜ",ucret:6000,odeme_tarihi:"2025-01-02",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"KEREM KAYA",ucret:8000,odeme_tarihi:"2025-01-10",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"METEHAN",ucret:4500,odeme_tarihi:"2025-01-17",grup:"Büyük",notlar:"2. Grup",telefon:"",email:"",durum:"Aktif"},
  {ad:"CİHAN HALİL ÜSTÜNBAŞ",ucret:6400,odeme_tarihi:"2026-01-31",grup:"Büyük",notlar:"Özel ders",telefon:"",email:"",durum:"Aktif"},
  {ad:"AHMET EYMEN ÜSTÜNBAŞ",ucret:6400,odeme_tarihi:"2026-01-31",grup:"Büyük",notlar:"Özel ders",telefon:"",email:"",durum:"Aktif"},
  {ad:"YUSUF TUĞRA ATEŞ",ucret:4000,odeme_tarihi:"2026-01-31",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EMİR BURAK DİŞCİ",ucret:5000,odeme_tarihi:"2026-01-31",grup:"Kids",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"HÜSEYİN",ucret:5000,odeme_tarihi:"2026-01-31",grup:"Kids",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MERT KAMİL ALİM",ucret:4000,odeme_tarihi:"2026-01-31",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUHAMMED SEMİH POLATER",ucret:5000,odeme_tarihi:"2026-02-07",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUHAMMET EMİN",ucret:3500,odeme_tarihi:"2026-01-31",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"HÜSEYİN CİNDORUK",ucret:5000,odeme_tarihi:"2026-02-07",grup:"Kids",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EFE OĞUZ BOZKIR",ucret:4500,odeme_tarihi:"2026-02-05",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EGE METE BOZKIR",ucret:4500,odeme_tarihi:"2026-02-05",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUSTAFA ALİ YEŞİLOVA",ucret:3500,odeme_tarihi:"2026-02-07",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"UYGAR ALTAŞ",ucret:3500,odeme_tarihi:"2026-02-08",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"YAKUP DEMİR AYAZ ÖNCÜ",ucret:4000,odeme_tarihi:"2026-02-14",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EGE ARSEVEN",ucret:6000,odeme_tarihi:"2026-02-14",grup:"Kids",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"ARSEN",ucret:5000,odeme_tarihi:"2026-02-12",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"YUSUF ERBİL",ucret:3000,odeme_tarihi:"2026-02-14",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"AHMET",ucret:6000,odeme_tarihi:"2026-02-14",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"BORA",ucret:6000,odeme_tarihi:"2026-02-14",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"EGE ÇINAR YAPICI",ucret:4500,odeme_tarihi:"2026-02-27",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"İSMAİL",ucret:4000,odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"ARAS VELA",ucret:4500,odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"SEFA DOĞAN YÜKTAŞAN",ucret:4000,odeme_tarihi:"2026-03-07",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"MUHAMMET NURULLAH / ÖMER TARIK",ucret:4500,odeme_tarihi:"2026-03-14",grup:"Büyük",notlar:"Cicioğlu",telefon:"",email:"",durum:"Aktif"},
  {ad:"ALİ ASAF GÜLÜM",ucret:4500,odeme_tarihi:"2026-03-14",grup:"Büyük",notlar:"Kiti de ödedi",telefon:"",email:"",durum:"Aktif"},
  {ad:"OĞUZ KAAN HAZAR",ucret:4000,odeme_tarihi:"2026-03-15",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"BEYTULLAH",ucret:4500,odeme_tarihi:"2026-03-29",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif"},
  {ad:"URAS TÜRKMEN",ucret:8000,odeme_tarihi:"2026-03-28",grup:"Büyük",notlar:"10 yaş",telefon:"",email:"",durum:"Aktif"},
  {ad:"AHMET YILMAZ",ucret:4500,odeme_tarihi:"2026-03-22",grup:"Büyük",notlar:"Pazar 12:00-14:00",telefon:"",email:"",durum:"Aktif"},
];

const SCHEDULE={
  buyuk:[
    {gun:"Perşembe",saat:"18:00",bitis:"20:00",ogrenciler:["Ali","Yunus","Kemal","U.Çınar","Oğuzhan","Can","Yaman","Efe","Ege","Arsen"],renk:"#7b61ff"},
    {gun:"Cuma",saat:"18:00",bitis:"20:00",ogrenciler:["Ali","Yunus","Kemal","Oğuzhan","Can","Yaman","U.Çınar","A.Korhan","G.Kayra","İbrahim","Furkan E","Ege Ç","İsmail"],renk:"#ff6b6b"},
    {gun:"Cumartesi",saat:"10:00",bitis:"11:30",ogrenciler:["Ahmet Emre","Nehir","Yusuf","Eymen","M.Emin","Aren"],renk:"#00ffc8"},
    {gun:"Cumartesi",saat:"12:00",bitis:"14:00",ogrenciler:["E.Buğra","Canberk","E.Aras","Kerem","Metehan","Cihan★","A.Eymen★","Semih","M.Ali","Y.Demir","Ahmet","Bora"],renk:"#ffa94d"},
    {gun:"Cumartesi",saat:"14:30",bitis:"16:30",ogrenciler:["Burak","E.İlhan","B.Kaya","E.Yalvı","Ozan","M.Kamil","Sefa","Ö.Tarık","A.Asaf"],renk:"#00d4ff"},
    {gun:"Pazar",saat:"10:00",bitis:"11:30",ogrenciler:["Ahmet Emre","Nehir","Yusuf","M.Emin"],renk:"#00ffc8"},
    {gun:"Pazar",saat:"12:00",bitis:"14:00",ogrenciler:["E.Buğra","Canberk","E.Aras","Y.T.Ateş","Uygar","Y.Erbil","Oğuz Kaan","Ahmet Yılmaz"],renk:"#ffa94d"},
    {gun:"Pazar",saat:"14:30",bitis:"16:30",ogrenciler:["Burak","Abdurrahman","E.İlhan","E.Yalvı","Ozan"],renk:"#00d4ff"},
  ],
  kids:[
    {gun:"Cumartesi",saat:"10:30",bitis:"11:30",ogrenciler:["Ali Asaf","Ali Arel","Hüseyin","B.Hüseyin"],renk:"#f472b6"},
    {gun:"Cumartesi",saat:"12:00",bitis:"13:00",ogrenciler:["Emir Burak"],renk:"#a78bfa"},
    {gun:"Cumartesi",saat:"13:30",bitis:"14:30",ogrenciler:["Ege Arseven"],renk:"#60a5fa"},
    {gun:"Cumartesi",saat:"14:00",bitis:"15:00",ogrenciler:["M.Akif","A.Selim","Ege Arseven","Hamza D."],renk:"#34d399"},
    {gun:"Pazar",saat:"10:30",bitis:"11:30",ogrenciler:["Ali Asaf","Burak","Ali Arel"],renk:"#f472b6"},
    {gun:"Pazar",saat:"12:00",bitis:"13:00",ogrenciler:["Emir Burak","Burak","Hüseyin","B.Hüseyin"],renk:"#a78bfa"},
    {gun:"Pazar",saat:"13:30",bitis:"14:30",ogrenciler:["Ege Arseven"],renk:"#60a5fa"},
    {gun:"Pazar",saat:"14:00",bitis:"15:00",ogrenciler:["M.Akif","A.Selim","Muhammet A."],renk:"#34d399"},
  ],
};

const KITLER=["BerryBot","PicoBricks","Tank"];
const ARIZA_TIPLERI=["Kart bozukluğu","Şase bozukluğu","Sensör bozukluğu","Motor bozukluğu","Pil bozukluğu","Kablo bozukluğu","Yazılım sorunu","Eksik parça","Diğer"];
const EGITMENLER=["YETKİN","ALPER","NİLAY","Eğitmen 3"]; // İhtiyaca göre düzenleyebilirsin
const KIT_DURUM={
  "bekliyor":{l:"⏳ Kit Bekleniyor",c:"#a78bfa",bg:"rgba(167,139,250,.12)",b:"rgba(167,139,250,.3)"},
  "teslim_edilecek":{l:"📦 Teslim Edilecek",c:"#fbbf24",bg:"rgba(251,191,36,.12)",b:"rgba(251,191,36,.3)"},
  "tam":{l:"✅ Tam",c:"#00ffc8",bg:"rgba(0,255,200,.12)",b:"rgba(0,255,200,.3)"},
  "tamir":{l:"🔧 Tamir Gerekli",c:"#ffa94d",bg:"rgba(255,169,77,.12)",b:"rgba(255,169,77,.3)"},
  "bozuk":{l:"❌ Bozuk",c:"#ff6b6b",bg:"rgba(255,107,107,.15)",b:"rgba(255,107,107,.3)"},
  "tamirde":{l:"🔨 Tamirde",c:"#60a5fa",bg:"rgba(96,165,250,.12)",b:"rgba(96,165,250,.3)"},
};
// Efektif durumu hesapla: 
//   alındıysa → kayıtlı durum (varsayılan tam)
//   alınmadıysa ama teslim planlı → teslim_edilecek
//   diğer → bekliyor
const efektifDurum=(ogr,kitTakip)=>{
  if(ogr.kit_alindi) return kitTakip?.durum||"tam";
  if(ogr.kit_teslim_planli) return "teslim_edilecek";
  return "bekliyor";
};
const KIT_COL={"BerryBot":"#ec4899","PicoBricks":"#22c55e","Tank":"#00d4ff"};
const KIT_ICON={"BerryBot":"🫐","PicoBricks":"🟩","Tank":"🚜"};
const GUNLER=["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
const SAATLER=["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"];
const DERS_SAATLER=["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"];

const GELİR_KAT=["Öğrenci","Şirket/Kurum","Ürün Satışı","Bağış","Proje","Diğer"];
const GİDER_KAT=["Malzeme","Ofis","Eğitim","Yazılım","Ulaşım","Personel","Pazarlama","Diğer"];
const CAT_COL={"Öğrenci":"#00ffc8","Şirket/Kurum":"#00d4ff","Ürün Satışı":"#7b61ff","Bağış":"#a78bfa","Proje":"#60a5fa","Malzeme":"#ff6b6b","Ofis":"#ffa94d","Eğitim":"#f0c040","Yazılım":"#818cf8","Ulaşım":"#38bdf8","Personel":"#4ade80","Pazarlama":"#f472b6","Diğer":"#9ca3af"};
const PIE_COL=["#ff6b6b","#ffa94d","#f0c040","#818cf8","#38bdf8","#4ade80","#f472b6","#9ca3af","#00ffc8","#00d4ff","#7b61ff","#a78bfa"];


// YılAy helper
const yilAy=(tarih)=>{const d=new Date(tarih);return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;};
const buYilAy=yilAy(new Date());

const gunFarki=(t)=>{if(!t)return null;const og=new Date(t).getDate();const now=new Date();const bg=now.getDate();if(bg>og)return bg-og;if(bg<og){const s=new Date(now.getFullYear(),now.getMonth(),0).getDate();return(s-og)+bg;}return null;};
const fmt=(t)=>{if(!t)return"—";const d=new Date(t);return`${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}`;};
const fmtFull=(t)=>{if(!t)return"—";return new Date(t).toLocaleDateString("tr-TR",{day:"2-digit",month:"short",year:"numeric"});};
const fmtAy=(t)=>{if(!t)return"—";return new Date(t).toLocaleDateString("tr-TR",{year:"numeric",month:"long"});};
const TODAY=new Date().toISOString().split("T")[0];
const normTel=(t)=>{const n=(t||"").replace(/\D/g,"");return n.startsWith("90")?n:n.startsWith("0")?"90"+n.slice(1):"90"+n;};


function PieChart({data,size=180}){
  if(!data||!data.length)return<div style={{color:"var(--text5)",fontSize:13,padding:20}}>Veri yok</div>;
  const total=data.reduce((s,d)=>s+d.value,0);if(!total)return null;
  let cum=0;const slices=data.map((d,i)=>{const pct=d.value/total;const start=cum;cum+=pct;return{...d,pct,start,end:cum,color:PIE_COL[i%PIE_COL.length]};});
  const r=size/2-10,cx=size/2,cy=size/2;
  const polar=(pct,rad)=>[cx+rad*Math.cos(2*Math.PI*pct-Math.PI/2),cy+rad*Math.sin(2*Math.PI*pct-Math.PI/2)];
  return(<div style={{display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
    <svg width={size} height={size} style={{flexShrink:0}}>
      {slices.map((s,i)=>{if(s.pct<0.001)return null;const [x1,y1]=polar(s.start,r);const [x2,y2]=polar(s.end,r);const large=s.pct>0.5?1:0;return<path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`} fill={s.color} stroke="#0a0d14" strokeWidth={2}/>;})}<circle cx={cx} cy={cy} r={r*0.45} fill="#0a0d14"/>
      <text x={cx} y={cy-7} textAnchor="middle" fill="#9ca3af" fontSize={10} fontWeight={700}>TOPLAM</text>
      <text x={cx} y={cy+9} textAnchor="middle" fill="#00ffc8" fontSize={11} fontWeight={700}>{total.toLocaleString("tr")}₺</text>
    </svg>
    <div style={{display:"flex",flexDirection:"column",gap:5,flex:1,minWidth:130}}>
      {slices.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:9,height:9,borderRadius:2,background:s.color,flexShrink:0}}/><span style={{fontSize:11,color:"var(--text3)",flex:1}}>{s.label}</span><span style={{fontSize:11,fontWeight:700,color:s.color}}>{Math.round(s.pct*100)}%</span><span style={{fontSize:10,color:"var(--text4)"}}>{s.value.toLocaleString("tr")}₺</span></div>))}
    </div>
  </div>);
}

const css=`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}

/* DARK TEMA — Turuncu/Siyah (varsayılan) */
:root{
  --bg:#0a0a0a;          /* tam siyah */
  --bg2:#141414;         /* header üst */
  --bg3:#1a1a1a;         /* kart */
  --bg4:#222222;         /* input */
  --bg5:#0f0f0f;         /* thead */
  --border:#2a2a2a;
  --border2:#3a3a3a;
  --text:#fafafa;        /* başlık beyaz */
  --text2:#d4d4d4;
  --text3:#a1a1a1;
  --text4:#737373;
  --text5:#525252;
  --accent:#fb923c;      /* turuncu primary */
  --accent2:#f97316;     /* koyu turuncu */
  --grad-h:linear-gradient(180deg,#141414,#0a0a0a);
  --grad-card:linear-gradient(135deg,#1a1a1a,#1f1f1f);
  --shadow:0 4px 20px rgba(0,0,0,.6);
  --hover-tint:rgba(251,146,60,.05);
}
/* LIGHT TEMA — Bej/Krem + Turuncu accent */
body[data-theme="light"]{
  --bg:#f5f1ea;          /* bej krema zemin */
  --bg2:#ffffff;         /* header üst */
  --bg3:#ffffff;         /* kart */
  --bg4:#eee7da;         /* input bej */
  --bg5:#e6dfd0;         /* thead */
  --border:#cdbfa6;
  --border2:#a89578;
  --text:#1a1208;        /* koyu kahverengimsi siyah */
  --text2:#3d2f1c;
  --text3:#5c4830;
  --text4:#7d6b50;
  --text5:#9d8c70;
  --accent:#c2410c;      /* koyu turuncu light için */
  --accent2:#9a3412;
  --grad-h:linear-gradient(180deg,#ffffff,#f5f1ea);
  --grad-card:#ffffff;
  --shadow:0 1px 3px rgba(180,140,80,.08),0 4px 12px rgba(180,140,80,.06);
  --hover-tint:rgba(194,65,12,.05);
}

body{background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:-.01em;font-feature-settings:"ss01","ss02","cv01";transition:background .2s,color .2s}
input,select,textarea,button{font-family:inherit;letter-spacing:-.005em}
h1,h2,h3,h4,h5{font-family:'Space Grotesk',sans-serif;letter-spacing:-.02em;color:var(--text)}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}
input:focus,select:focus,textarea:focus{border-color:var(--accent)!important;outline:none}
.tab{background:none;border:none;cursor:pointer;padding:8px 14px;border-radius:10px;font-family:inherit;font-size:13px;font-weight:500;color:var(--text4);white-space:nowrap;transition:all .2s}
.tab.on{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#0a0a0a;font-weight:700}
.tab:hover:not(.on){background:var(--bg4);color:var(--text)}
.card{background:var(--grad-card);border:1px solid var(--border);border-radius:16px;padding:20px;transition:border-color .2s;box-shadow:var(--shadow)}
.card:hover{border-color:var(--border2)}
.csm{background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:14px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.inp{background:var(--bg4);border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-family:inherit;font-size:14px;font-weight:500;width:100%;transition:all .15s}
.inp:hover{border-color:var(--border2)}
.sel{background:var(--bg4);border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-family:inherit;font-size:14px;font-weight:500;width:100%;cursor:pointer;transition:all .15s}
.sel:hover{border-color:var(--border2)}
.lbl{font-size:11px;color:var(--text4);font-weight:600;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px}
.bp{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#0a0a0a;border:none;cursor:pointer;border-radius:10px;padding:10px 18px;font-family:inherit;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(251,146,60,.25)}
.bp:disabled{opacity:.5;cursor:not-allowed}
.bg{background:var(--bg4);color:var(--text3);border:1px solid var(--border);cursor:pointer;border-radius:10px;padding:9px 15px;font-family:inherit;font-weight:600;font-size:13px}
.bd{background:rgba(255,107,107,.15);color:#ff6b6b;border:1px solid rgba(255,107,107,.3);cursor:pointer;border-radius:8px;padding:5px 10px;font-family:inherit;font-weight:600;font-size:12px}
.bwa{background:rgba(37,211,102,.15);color:#25d366;border:1px solid rgba(37,211,102,.3);cursor:pointer;border-radius:8px;padding:6px 12px;font-family:inherit;font-weight:700;font-size:12px}
.mu{background:linear-gradient(135deg,#00ffc8,#00d4ff);color:#0a0d14;border-radius:16px 16px 4px 16px;padding:11px 15px;font-weight:500;font-size:14px;line-height:1.5}
.ma{background:#1a1f2e;border:1px solid #1e2940;border-radius:16px 16px 16px 4px;padding:11px 15px;font-size:14px;line-height:1.6;white-space:pre-wrap}
.qb{background:#1a1f2e;border:1px solid #1e2940;border-radius:8px;padding:8px 12px;color:#a0aec0;cursor:pointer;font-family:inherit;font-size:12px;text-align:left;transition:all .2s}
.qb:hover{border-color:#00ffc8;color:#00ffc8}
.rh:hover td{background:var(--hover-tint)}
th{background:var(--bg5);padding:11px 14px;text-align:left;font-size:10.5px;color:var(--text4);font-weight:700;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid var(--border)}
td{padding:10px 14px;border-bottom:1px solid var(--bg5);font-size:13px;vertical-align:middle;font-weight:500;color:var(--text2)}
.num{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes sl{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
.toast{animation:fi .3s ease;position:fixed;bottom:20px;right:20px;z-index:9999;padding:12px 20px;border-radius:12px;font-weight:600;font-size:14px;box-shadow:0 4px 20px rgba(0,0,0,.5);max-width:340px}
.nwrap{position:fixed;top:72px;right:16px;z-index:9998;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.notif{animation:sl .3s ease;background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:12px 16px;width:280px;box-shadow:var(--shadow);pointer-events:all;color:var(--text2)}
.dur-wrap{position:relative;display:inline-block}
.dur-menu{position:fixed;z-index:9000;background:var(--bg4);border:1px solid var(--border);border-radius:10px;overflow:hidden;min-width:140px;box-shadow:0 8px 24px rgba(0,0,0,.4)}
@media(max-width:640px){.g2{grid-template-columns:1fr!important}.g4{grid-template-columns:repeat(2,1fr)!important}.g3{grid-template-columns:1fr!important}}
`;

function Modal({title,onClose,children,wide}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div className="card" style={{width:"100%",maxWidth:wide?700:540,maxHeight:"92vh",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:700,color:"var(--text)"}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",color:"var(--text4)",cursor:"pointer",fontSize:22}}>×</button></div>{children}</div></div>);}

const DURUMLAR=[
  {val:"aylik",label:"💳 Aylık",c:"#00d4ff",bg:"rgba(0,212,255,.12)",b:"rgba(0,212,255,.3)"},
  {val:"3aylik",label:"📅 3 Aylık",c:"#7b61ff",bg:"rgba(123,97,255,.15)",b:"rgba(123,97,255,.3)"},
];
function OdemeDurumu({ogrenci,onChange}){
  const [open,setOpen]=useState(false);const [pos,setPos]=useState({top:0,left:0});const btnRef=useRef(null);
  useEffect(()=>{if(!open)return;const h=(e)=>{if(!e.target.closest(".dur-wrap")&&!e.target.closest(".dur-menu"))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
  const handleOpen=()=>{if(btnRef.current){const r=btnRef.current.getBoundingClientRect();setPos({top:r.bottom+4,left:r.left});}setOpen(p=>!p);};
  const cur=DURUMLAR.find(d=>d.val===(ogrenci.odeme_durumu||"aylik"))||DURUMLAR[0];
  return(<div className="dur-wrap"><button ref={btnRef} onClick={handleOpen} style={{background:cur.bg,border:`1px solid ${cur.b}`,borderRadius:8,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,color:cur.c,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>{cur.label}<span style={{fontSize:9,opacity:.7}}>▾</span></button>{open&&(<div className="dur-menu" style={{top:pos.top,left:pos.left}}>{DURUMLAR.map(d=>(<button key={d.val} onClick={()=>{onChange(d.val);setOpen(false);}} style={{width:"100%",background:ogrenci.odeme_durumu===d.val?"rgba(0,255,200,.05)":"transparent",border:"none",borderBottom:"1px solid var(--border)",padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,color:d.c,textAlign:"left"}}>{d.label}</button>))}</div>)}</div>);
}

function KitDropdown({ogrenci,onChange}){
  const [open,setOpen]=useState(false);const [pos,setPos]=useState({top:0,left:0});const btnRef=useRef(null);
  useEffect(()=>{if(!open)return;const h=(e)=>{if(!e.target.closest(".kit-wrap")&&!e.target.closest(".dur-menu"))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
  const handleOpen=()=>{if(btnRef.current){const r=btnRef.current.getBoundingClientRect();setPos({top:r.bottom+4,left:r.left});}setOpen(p=>!p);};
  const k=ogrenci.kit||"";
  const col=k?KIT_COL[k]:"#6b7280";
  const opts=[{val:"",label:"⛔ Yok",col:"#6b7280"},...KITLER.map(x=>({val:x,label:`${KIT_ICON[x]} ${x}`,col:KIT_COL[x]}))];
  return(<div className="kit-wrap" style={{position:"relative",display:"inline-block"}}>
    <button ref={btnRef} onClick={handleOpen} style={{background:`${col}15`,border:`1px solid ${col}35`,borderRadius:8,padding:"3px 9px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:11,color:col,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
      {k?`${KIT_ICON[k]} ${k}`:"⛔ Yok"}<span style={{fontSize:8,opacity:.6}}>▾</span>
    </button>
    {open&&(<div className="dur-menu" style={{top:pos.top,left:pos.left,minWidth:150}}>{opts.map(o=>(
      <button key={o.val} onClick={()=>{onChange(o.val);setOpen(false);}}
        style={{width:"100%",background:k===o.val?"rgba(0,255,200,.05)":"transparent",border:"none",borderBottom:"1px solid var(--border)",padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,color:o.col,textAlign:"left"}}>
        {o.label}
      </button>))}</div>)}
  </div>);
}

function KitTeslim({ogrenci,onChange}){
  const teslim=!!ogrenci.kit_alindi;
  return(<button onClick={()=>onChange(!teslim)} title={teslim?"Teslim alındı (tıkla: geri al)":"Henüz alınmadı (tıkla: alındı işaretle)"}
    style={{background:teslim?"rgba(0,255,200,.12)":"rgba(255,169,77,.1)",border:`1px solid ${teslim?"rgba(0,255,200,.35)":"rgba(255,169,77,.3)"}`,borderRadius:8,padding:"3px 9px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:11,color:teslim?"#00ffc8":"#ffa94d",whiteSpace:"nowrap"}}>
    {teslim?"✅ Alındı":"⏳ Bekliyor"}
  </button>);
}

function GrupDropdown({ogrenci,onChange}){
  const [open,setOpen]=useState(false);const [pos,setPos]=useState({top:0,left:0});const btnRef=useRef(null);
  useEffect(()=>{if(!open)return;const h=(e)=>{if(!e.target.closest(".grup-wrap")&&!e.target.closest(".dur-menu"))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
  const handleOpen=()=>{if(btnRef.current){const r=btnRef.current.getBoundingClientRect();setPos({top:r.bottom+4,left:r.left});}setOpen(p=>!p);};
  const g=ogrenci.grup||"Büyük";
  const opts=[{val:"Büyük",col:"#00d4ff",bg:"rgba(0,212,255,.12)",b:"rgba(0,212,255,.3)"},{val:"Kids",col:"#ff6b6b",bg:"rgba(255,107,107,.15)",b:"rgba(255,107,107,.3)"}];
  const cur=opts.find(o=>o.val===g)||opts[0];
  return(<div className="grup-wrap" style={{position:"relative",display:"inline-block"}}>
    <button ref={btnRef} onClick={handleOpen} style={{background:cur.bg,border:`1px solid ${cur.b}`,borderRadius:20,padding:"2px 9px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:11,color:cur.col,display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}>
      {g}<span style={{fontSize:8,opacity:.6}}>▾</span>
    </button>
    {open&&(<div className="dur-menu" style={{top:pos.top,left:pos.left,minWidth:90}}>{opts.map(o=>(
      <button key={o.val} onClick={()=>{onChange(o.val);setOpen(false);}}
        style={{width:"100%",background:g===o.val?"rgba(0,255,200,.05)":"transparent",border:"none",borderBottom:"1px solid var(--border)",padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,color:o.col,textAlign:"left"}}>
        {o.val}
      </button>))}</div>)}
  </div>);
}

function DerslikDropdown({ogrenci,onChange}){
  const [open,setOpen]=useState(false);const [pos,setPos]=useState({top:0,left:0});const btnRef=useRef(null);
  useEffect(()=>{if(!open)return;const h=(e)=>{if(!e.target.closest(".dlk-wrap")&&!e.target.closest(".dur-menu"))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
  const handleOpen=()=>{if(btnRef.current){const r=btnRef.current.getBoundingClientRect();setPos({top:r.bottom+4,left:r.left});}setOpen(p=>!p);};
  const d=ogrenci.derslik||"";
  const cols={"1":"#00ffc8","2":"#7b61ff","3":"#ffa94d","4":"#f472b6"};
  const col=cols[d]||"#6b7280";
  return(<div className="dlk-wrap" style={{position:"relative",display:"inline-block"}}>
    <button ref={btnRef} onClick={handleOpen} style={{background:`${col}15`,border:`1px solid ${col}30`,borderRadius:6,padding:"2px 7px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:10,color:col,whiteSpace:"nowrap"}}>
      🏫 D{d||"?"}<span style={{fontSize:8,opacity:.6,marginLeft:2}}>▾</span>
    </button>
    {open&&(<div className="dur-menu" style={{top:pos.top,left:pos.left,minWidth:100}}>{["1","2","3","4"].map(x=>(
      <button key={x} onClick={()=>{onChange(x);setOpen(false);}}
        style={{width:"100%",background:d===x?"rgba(0,255,200,.05)":"transparent",border:"none",borderBottom:"1px solid var(--border)",padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,color:cols[x],textAlign:"left"}}>
        🏫 Derslik {x}
      </button>))}</div>)}
  </div>);
}

// ── EF — ders_gunu ve ders_saati eklendi ──────────────────────────────────────
const EF={ad:"",ucret:"",odeme_tarihi:"",grup:"Büyük",notlar:"",telefon:"",email:"",durum:"Aktif",ders_gunleri:"",ders_saati:"10:00",ders_bitis:"11:00",derslik:"1",kit:"",kit_alindi:false};

function OgrenciForm({initial,onSave,onCancel,saving}){
  const [f,setF]=useState(initial||EF);const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div className="g2">
      <div><label className="lbl">Öğrenci Adı *</label><input className="inp" value={f.ad} onChange={e=>s("ad",e.target.value)} placeholder="Ad Soyad"/></div>
      <div><label className="lbl">Aylık Ücret ₺ *</label><input className="inp" type="number" value={f.ucret} onChange={e=>s("ucret",e.target.value)} placeholder="7000"/></div>
    </div>
    <div className="g2">
      <div><label className="lbl">Grup</label><select className="sel" value={f.grup} onChange={e=>s("grup",e.target.value)}><option value="Büyük">Büyük (7-18)</option><option value="Kids">Kids (4-7)</option></select></div>
      </div>
      <div className="g2">
      <div><label className="lbl">🎒 Kit</label><select className="sel" value={f.kit||""} onChange={e=>s("kit",e.target.value)}><option value="">— Seçilmedi —</option>{KITLER.map(k=><option key={k} value={k}>{KIT_ICON[k]} {k}</option>)}</select></div>
      <div><label className="lbl">📦 Kit Durumu</label>
        <label style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"var(--bg4)",border:`1px solid ${f.kit_alindi?"#00ffc8":"#1e2940"}`,borderRadius:10,cursor:"pointer"}}>
          <input type="checkbox" checked={!!f.kit_alindi} onChange={e=>s("kit_alindi",e.target.checked)} style={{width:16,height:16,accentColor:"#00ffc8"}}/>
          <span style={{fontSize:13,fontWeight:600,color:f.kit_alindi?"#00ffc8":"#9ca3af"}}>{f.kit_alindi?"✅ Teslim Edildi":"⏳ Bekliyor"}</span>
        </label>
      </div>
      <div><label className="lbl">📅 İlk Ders / Başlangıç</label><input className="inp" type="date" value={f.odeme_tarihi} onChange={e=>s("odeme_tarihi",e.target.value)}/></div>
    </div>
    {/* YENİ: Ders günü ve saati */}
    <div className="g2">
      <div style={{gridColumn:"1/-1"}}>
        <label className="lbl">📅 Ders Günleri (birden fazla seçilebilir)</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:4}}>
          {GUNLER.map(g=>{
            const secili=(f.ders_gunleri||"").split(",").map(x=>x.trim()).filter(Boolean).includes(g);
            const toggle=()=>{
              const mevcut=(f.ders_gunleri||"").split(",").map(x=>x.trim()).filter(Boolean);
              const yeni=secili?mevcut.filter(x=>x!==g):[...mevcut,g];
              s("ders_gunleri",yeni.join(","));
            };
            return(<button key={g} type="button" onClick={toggle} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${secili?"#00ffc8":"#1e2940"}`,background:secili?"rgba(0,255,200,.12)":"#1a1f2e",color:secili?"#00ffc8":"#6b7280",cursor:"pointer",fontFamily:"inherit",fontWeight:secili?700:400,fontSize:12}}>{g}</button>);
          })}
        </div>
        {f.ders_gunleri&&<div style={{fontSize:11,color:"#00ffc8",marginTop:6}}>Seçili: {f.ders_gunleri}</div>}
      </div>
      <div><label className="lbl">⏰ Başlangıç</label><select className="sel" value={f.ders_saati||"10:00"} onChange={e=>s("ders_saati",e.target.value)}>{DERS_SAATLER.map(st=><option key={st}>{st}</option>)}</select></div>
      <div><label className="lbl">⏰ Bitiş</label><select className="sel" value={f.ders_bitis||"11:00"} onChange={e=>s("ders_bitis",e.target.value)}>{DERS_SAATLER.map(st=><option key={st}>{st}</option>)}</select></div>
      <div><label className="lbl">🏫 Derslik</label><select className="sel" value={f.derslik||"1"} onChange={e=>s("derslik",e.target.value)}><option value="1">Derslik 1 (kap. 8)</option><option value="2">Derslik 2 (kap. 4)</option><option value="3">Derslik 3 (kap. 4)</option><option value="4">Derslik 4 (kap. 4)</option></select></div>
    </div>

    <div className="g2">
      <div><label className="lbl">📱 WhatsApp Tel</label><input className="inp" value={f.telefon} onChange={e=>s("telefon",e.target.value)} placeholder="0532 xxx xx xx"/></div>
      <div><label className="lbl">✉️ E-posta</label><input className="inp" value={f.email} onChange={e=>s("email",e.target.value)} placeholder="ornek@mail.com"/></div>
    </div>
    <div className="g2">
      <div><label className="lbl">Durum</label><select className="sel" value={f.durum} onChange={e=>s("durum",e.target.value)}><option value="Aktif">Aktif</option><option value="Pasif">Pasif</option></select></div>
      <div><label className="lbl">Notlar</label><input className="inp" value={f.notlar} onChange={e=>s("notlar",e.target.value)} placeholder="Özel ders..."/></div>
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:6}}><button className="bg" onClick={onCancel}>İptal</button><button className="bp" onClick={()=>onSave(f)} disabled={saving||!f.ad||!f.ucret}>{saving?"Kaydediliyor...":"💾 Kaydet"}</button></div>
  </div>);
}

const MF={tip:"gelir",kategori:"Öğrenci",aciklama:"",tutar:"",tarih:TODAY};
function MuhasebForm({onSave,onCancel,saving}){
  const [f,setF]=useState(MF);const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const katlar=f.tip==="gelir"?GELİR_KAT:GİDER_KAT;
  useEffect(()=>{setF(p=>({...p,kategori:f.tip==="gelir"?GELİR_KAT[0]:GİDER_KAT[0]}));},[f.tip]);
  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div className="g2">
      <div><label className="lbl">Tür</label><div style={{display:"flex",gap:8}}>{["gelir","gider"].map(t=>(<button key={t} onClick={()=>s("tip",t)} style={{flex:1,padding:"10px",border:`1px solid ${f.tip===t?(t==="gelir"?"#00ffc8":"#ff6b6b"):"#1e2940"}`,borderRadius:10,background:f.tip===t?(t==="gelir"?"rgba(0,255,200,.1)":"rgba(255,107,107,.1)"):"#1a1f2e",color:f.tip===t?(t==="gelir"?"#00ffc8":"#ff6b6b"):"#6b7280",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:14}}>{t==="gelir"?"📥 Gelir":"📤 Gider"}</button>))}</div></div>
      <div><label className="lbl">Kategori</label><select className="sel" value={f.kategori} onChange={e=>s("kategori",e.target.value)}>{katlar.map(k=><option key={k}>{k}</option>)}</select></div>
    </div>
    <div><label className="lbl">Açıklama *</label><input className="inp" value={f.aciklama} onChange={e=>s("aciklama",e.target.value)} placeholder="Kurs ücreti, Ofis kirası..."/></div>
    <div className="g2">
      <div><label className="lbl">Tutar (₺) *</label><input className="inp" type="number" value={f.tutar} onChange={e=>s("tutar",e.target.value)} placeholder="5000"/></div>
      <div><label className="lbl">Tarih</label><input className="inp" type="date" value={f.tarih} onChange={e=>s("tarih",e.target.value)}/></div>
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:6}}><button className="bg" onClick={onCancel}>İptal</button><button className="bp" onClick={()=>onSave(f)} disabled={saving||!f.aciklama||!f.tutar}>{saving?"Kaydediliyor...":"💾 Kaydet"}</button></div>
  </div>);
}

const DF={ogrenci_adi:"",veli_adi:"",yas:"",okul:"",telefon:"",email:"",tarih:TODAY,saat:"15:00",notlar:"",durum:"planli"};
function DemoForm({onSave,onCancel,saving}){
  const [f,setF]=useState(DF);const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div className="g2"><div><label className="lbl">Öğrenci Adı *</label><input className="inp" value={f.ogrenci_adi} onChange={e=>s("ogrenci_adi",e.target.value)} placeholder="Ad Soyad"/></div><div><label className="lbl">Veli Adı</label><input className="inp" value={f.veli_adi} onChange={e=>s("veli_adi",e.target.value)} placeholder="Veli adı"/></div></div>
    <div className="g2"><div><label className="lbl">Yaş</label><input className="inp" type="number" value={f.yas} onChange={e=>s("yas",e.target.value)} placeholder="10"/></div><div><label className="lbl">Okul</label><input className="inp" value={f.okul} onChange={e=>s("okul",e.target.value)} placeholder="Okul adı"/></div></div>
    <div className="g2"><div><label className="lbl">📱 Telefon</label><input className="inp" value={f.telefon} onChange={e=>s("telefon",e.target.value)} placeholder="0532 xxx xx xx"/></div><div><label className="lbl">✉️ E-posta</label><input className="inp" value={f.email} onChange={e=>s("email",e.target.value)} placeholder="ornek@mail.com"/></div></div>
    <div className="g2"><div><label className="lbl">📅 Tarih *</label><input className="inp" type="date" value={f.tarih} onChange={e=>s("tarih",e.target.value)}/></div><div><label className="lbl">⏰ Saat *</label><input className="inp" type="time" value={f.saat} onChange={e=>s("saat",e.target.value)}/></div></div>
    <div><label className="lbl">Notlar</label><textarea className="inp" value={f.notlar} onChange={e=>s("notlar",e.target.value)} placeholder="İlgi alanı..." rows={2} style={{resize:"none"}}/></div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:6}}><button className="bg" onClick={onCancel}>İptal</button><button className="bp" onClick={()=>onSave(f)} disabled={saving||!f.ogrenci_adi||!f.tarih}>{saving?"Kaydediliyor...":"💾 Kaydet"}</button></div>
  </div>);
}

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [ogrenciler,setOgrenciler]=useState([]);
  const [muhasebe,setMuhasebe]=useState([]);
  const [demolar,setDemolar]=useState([]);
  const [yoklamalar,setYoklamalar]=useState([]); // tüm yoklama kayıtları
  const [loading,setLoading]=useState(true);
  const [muhLoading,setMuhLoading]=useState(true);
  const [demoLoading,setDemoLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [grupF,setGrupF]=useState("Tümü");
  const [odemeF,setOdemeF]=useState("Tümü");
  const [fiyatF,setFiyatF]=useState("Tümü");
  const [kitF,setKitF]=useState("Tümü");
  const [gunF,setGunF]=useState("Tümü");
  const [muhTip,setMuhTip]=useState("tümü");
  const [muhKat,setMuhKat]=useState("Tümü");
  const [muhAy,setMuhAy]=useState("Tümü");
  const [scheduleGrup,setScheduleGrup]=useState("buyuk");
  const [programGunF,setProgramGunF]=useState("Tümü");
  const [programDerslikF,setProgramDerslikF]=useState("Tümü");
  const [programEgitmenF,setProgramEgitmenF]=useState("Tümü");
  const [modal,setModal]=useState(null);
  const [delC,setDelC]=useState(null);
  const [delM,setDelM]=useState(null);
  const [delD,setDelD]=useState(null);
  const [theme,setTheme]=useState(()=>localStorage.getItem("theme")||"dark");
  const [kitler,setKitler]=useState([]); // kit_takip kayıtları
  const [sinifMeta,setSinifMeta]=useState([]); // sınıf eğitmen/proje meta
  const [kitStok,setKitStok]=useState({BerryBot:0,PicoBricks:0,Tank:0}); // stok adeti
  const [kitFiltre,setKitFiltre]=useState({durum:"Tümü",kitTipi:"Tümü"});
  const [egitmenler,setEgitmenler]=useState([]);
  const [sinifEgitmen,setSinifEgitmen]=useState([]);
  const [yeniEgitmenModal,setYeniEgitmenModal]=useState(false);
  const [saving,setSaving]=useState(false);
  const [toast,setToast]=useState(null);
  // Devreden / hariç tutar — localStorage'da saklanır
  const [devreden,setDevreden]=useState(()=>Number(localStorage.getItem("devreden")||0));
  const [netReset,setNetReset]=useState(()=>Number(localStorage.getItem("netReset")||0)); // muhasebe net kârından hariç tutulan tutar
  const [devredenInput,setDevredenInput]=useState(()=>localStorage.getItem("devreden")||"");

  const toast2=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),4000);};

  // ── loadOgr: otomatik aylık sıfırlama dahil ────────────────────────────────
  const loadOgr=useCallback(async()=>{
    setLoading(true);
    const{data}=await supabase.from("ogrenciler").select("*").order("created_at",{ascending:true});
    if(data){
      if(data.length===0){
        await supabase.from("ogrenciler").insert(SEED.map(o=>({...o,ucret:Number(o.ucret)})));
        const{data:d2}=await supabase.from("ogrenciler").select("*").order("created_at",{ascending:true});
        setOgrenciler(d2||[]);
      } else {
        // Yeni aya geçilince "ödendi" → "bekliyor" sıfırla
        const sifirlanacaklar=data.filter(o=>{
          if((o.odeme_durumu||"bekliyor")!=="odendi")return false;
          if(!o.odeme_alindi_tarihi)return false;
          return yilAy(o.odeme_alindi_tarihi)!==buYilAy;
        });
        if(sifirlanacaklar.length>0){
          for(const o of sifirlanacaklar){
            await supabase.from("ogrenciler")
              .update({odeme_durumu:"bekliyor",odeme_alindi:false,odeme_alindi_tarihi:null})
              .eq("id",o.id);
          }
          const{data:d3}=await supabase.from("ogrenciler").select("*").order("created_at",{ascending:true});
          setOgrenciler(d3||[]);
          toast2(`🔄 ${sifirlanacaklar.length} öğrenci yeni ay için sıfırlandı`);
        } else {
          setOgrenciler(data);
        }
      }
    }
    setLoading(false);
  },[]);

  const loadMuh=useCallback(async()=>{setMuhLoading(true);const{data}=await supabase.from("muhasebe").select("*").order("tarih",{ascending:false});setMuhasebe(data||[]);setMuhLoading(false);},[]);
  const loadDemo=useCallback(async()=>{setDemoLoading(true);const{data}=await supabase.from("demolar").select("*").order("tarih",{ascending:true});setDemolar(data||[]);setDemoLoading(false);},[]);
  const loadYoklama=useCallback(async()=>{const{data}=await supabase.from("ogrenci_yoklama").select("*");setYoklamalar(data||[]);},[]);
  const loadKitTakip=useCallback(async()=>{const{data}=await supabase.from("kit_takip").select("*");setKitler(data||[]);},[]);
  const loadSinifMeta=useCallback(async()=>{const{data}=await supabase.from("sinif_meta").select("*");setSinifMeta(data||[]);},[]);
  // Bir slot için meta bul (gün+saat+bitis+derslik bazlı)
  const getSinifMeta=(slot)=>sinifMeta.find(m=>m.gun===slot.gun&&m.saat===slot.saat&&m.bitis===slot.bitis&&m.derslik===slot.derslik);
  const upsertSinifMeta=async(slot,patch)=>{
    const mevcut=getSinifMeta(slot);
    if(mevcut){
      // State'te var — direkt update
      const{error}=await supabase.from("sinif_meta").update({...patch,updated_at:new Date().toISOString()}).eq("id",mevcut.id);
      if(error){toast2("Hata: "+error.message,"err");return;}
      setSinifMeta(p=>p.map(m=>m.id===mevcut.id?{...m,...patch}:m));
    } else {
      // State'te yok — upsert kullan (DB'de varsa günceller, yoksa ekler)
      const{data,error}=await supabase.from("sinif_meta")
        .upsert({gun:slot.gun,saat:slot.saat,bitis:slot.bitis,derslik:slot.derslik,...patch,updated_at:new Date().toISOString()},{onConflict:"gun,saat,bitis,derslik"})
        .select();
      if(error){toast2("Hata: "+error.message,"err");return;}
      if(data&&data[0]){
        setSinifMeta(p=>{
          const i=p.findIndex(m=>m.id===data[0].id);
          if(i>=0){const c=[...p];c[i]=data[0];return c;}
          return [...p,data[0]];
        });
      }
    }
  };
  const loadKitStok=useCallback(async()=>{const{data}=await supabase.from("kit_stok").select("*");if(data){const o={BerryBot:0,PicoBricks:0,Tank:0};data.forEach(r=>{o[r.kit_tipi]=r.adet||0;});setKitStok(o);}},[]);
  const loadEgitmenler=useCallback(async()=>{const{data}=await supabase.from("egitmenler").select("*").order("ad");setEgitmenler(data||[]);},[]);
  const loadSinifEgitmen=useCallback(async()=>{const{data}=await supabase.from("sinif_egitmen").select("*");setSinifEgitmen(data||[]);},[]);
  // Bir sinif slotunun eğitmenini al
  const getSinifEgitmen=(gun,saat,bitis,derslik)=>{
    const m=sinifEgitmen.find(s=>s.gun===gun&&s.saat===saat&&s.bitis===bitis&&s.derslik===derslik);
    if(!m||!m.egitmen_id)return null;
    return egitmenler.find(e=>e.id===m.egitmen_id);
  };
  // Eğitmen ata/değiştir
  const atamaEgitmen=async(gun,saat,bitis,derslik,egitmen_id)=>{
    const mevcut=sinifEgitmen.find(s=>s.gun===gun&&s.saat===saat&&s.bitis===bitis&&s.derslik===derslik);
    if(mevcut){
      if(egitmen_id===null){
        await supabase.from("sinif_egitmen").delete().eq("id",mevcut.id);
        setSinifEgitmen(p=>p.filter(s=>s.id!==mevcut.id));
      } else {
        await supabase.from("sinif_egitmen").update({egitmen_id}).eq("id",mevcut.id);
        setSinifEgitmen(p=>p.map(s=>s.id===mevcut.id?{...s,egitmen_id}:s));
      }
    } else if(egitmen_id!==null){
      const{data}=await supabase.from("sinif_egitmen").insert([{gun,saat,bitis,derslik,egitmen_id}]).select();
      if(data&&data[0]) setSinifEgitmen(p=>[...p,data[0]]);
    }
    const eg=egitmenler.find(e=>e.id===egitmen_id);
    toast2(eg?`✅ ${eg.ad} atandı`:"✅ Atama kaldırıldı");
  };
  const yeniEgitmen=async(ad,renk)=>{
    if(!ad?.trim())return;
    const renkler=["#fb923c","#00d4ff","#a78bfa","#22c55e","#ec4899","#fbbf24","#f87171","#60a5fa"];
    const r=renk||renkler[egitmenler.length%renkler.length];
    const{data,error}=await supabase.from("egitmenler").insert([{ad:ad.trim(),renk:r}]).select();
    if(error){toast2("Hata: "+error.message,"err");return;}
    if(data&&data[0])setEgitmenler(p=>[...p,data[0]]);
    toast2(`✅ ${ad} eklendi`);
  };
  const silEgitmen=async(id)=>{
    await supabase.from("egitmenler").delete().eq("id",id);
    setEgitmenler(p=>p.filter(e=>e.id!==id));
    loadSinifEgitmen();
    toast2("🗑️ Silindi");
  };
  const updateKitStok=async(tipi,delta)=>{
    const yeni=Math.max(0,(kitStok[tipi]||0)+delta);
    setKitStok(p=>({...p,[tipi]:yeni}));
    const{error}=await supabase.from("kit_stok").upsert({kit_tipi:tipi,adet:yeni,updated_at:new Date().toISOString()});
    if(error){toast2("Hata: "+error.message,"err");loadKitStok();return;}
  };
  // Teslim planlı toggle: stoktan düş/ekle
  const toggleTeslimPlanli=async(ogrenci)=>{
    const mevcut=!!ogrenci.kit_teslim_planli;
    const tipi=ogrenci.kit;
    if(!tipi){toast2("❌ Önce kit tipi seçin","err");return;}
    if(!mevcut){
      const stok=kitStok[tipi]||0;
      if(stok<=0){toast2(`❌ ${KIT_ICON[tipi]} ${tipi} stoğu yok!`,"err");return;}
      await updateKitStok(tipi,-1);
      await updateField(ogrenci,{kit_teslim_planli:true},`📦 ${ogrenci.ad}: teslim listesine eklendi · ${tipi} stoğundan 1 düşüldü`);
    } else {
      await updateKitStok(tipi,+1);
      await updateField(ogrenci,{kit_teslim_planli:false},`⏳ ${ogrenci.ad}: bekliyora alındı · ${tipi} stoğuna 1 eklendi`);
    }
  };
  // Kit teslim edildi (kit_alindi) — teslim_planli ise sadece planli'yi temizle (stok zaten düşmüş)
  const setKitAlindi=async(ogrenci,yeni)=>{
    if(yeni&&ogrenci.kit_teslim_planli){
      await updateField(ogrenci,{kit_alindi:true,kit_teslim_planli:false},`✅ ${ogrenci.ad}: kit teslim edildi`);
    } else if(!yeni&&ogrenci.kit_alindi){
      await updateField(ogrenci,{kit_alindi:false},`⏳ ${ogrenci.ad}: kit geri alındı`);
    } else {
      await updateField(ogrenci,{kit_alindi:yeni},yeni?"📦 Teslim alındı":"⏳ Geri alındı");
    }
  };
  // Kit takip kaydını al/oluştur
  const getKitTakip=(ogrenci_id)=>kitler.find(k=>k.ogrenci_id===ogrenci_id);
  const upsertKitTakip=async(ogrenci_id,patch)=>{
    const mevcut=getKitTakip(ogrenci_id);
    if(mevcut){
      const{error}=await supabase.from("kit_takip").update({...patch,updated_at:new Date().toISOString()}).eq("id",mevcut.id);
      if(error){toast2("Hata: "+error.message,"err");return;}
      setKitler(p=>p.map(k=>k.id===mevcut.id?{...k,...patch}:k));
    } else {
      const{data,error}=await supabase.from("kit_takip").insert([{ogrenci_id,...patch}]).select();
      if(error){toast2("Hata: "+error.message,"err");return;}
      if(data&&data[0]) setKitler(p=>[...p,data[0]]);
    }
  };
  // Bir öğrenciye yeni ders ekle (odendi=false, ödeme bekliyor)
  const dersEkle=async(ogrenci_id)=>{
    const{data,error}=await supabase.from("ogrenci_yoklama").insert([{ogrenci_id,odendi:false,tarih:TODAY}]).select();
    if(error){toast2("Hata: "+error.message,"err");return;}
    if(data&&data[0]){setYoklamalar(p=>[...p,data[0]]);toast2("✅ Ders eklendi");}
  };
  // En son eklenen dersi sil
  const sonDersSil=async(ogrenci_id)=>{
    const ogrDersleri=yoklamalar.filter(y=>y.ogrenci_id===ogrenci_id).sort((a,b)=>b.id-a.id);
    if(!ogrDersleri.length)return;
    const son=ogrDersleri[0];
    await supabase.from("ogrenci_yoklama").delete().eq("id",son.id);
    setYoklamalar(p=>p.filter(y=>y.id!==son.id));
    toast2("🗑️ Son ders silindi");
  };
  // Belirli bir dersin durumunu değiştir (odendi toggle)
  const dersToggle=async(yId)=>{
    const m=yoklamalar.find(y=>y.id===yId);if(!m)return;
    await supabase.from("ogrenci_yoklama").update({odendi:!m.odendi}).eq("id",yId);
    setYoklamalar(p=>p.map(y=>y.id===yId?{...y,odendi:!y.odendi}:y));
  };
  // Bir öğrencinin tüm derslerini getir (eski → yeni)
  const ogrDersleri=(ogrenci_id)=>yoklamalar.filter(y=>y.ogrenci_id===ogrenci_id).sort((a,b)=>a.id-b.id);
  // En eski N adet ödenmemiş dersi ödendi olarak işaretle
  const dersleriOdedi=async(ogrenci_id,count=4)=>{
    const odenmemis=ogrDersleri(ogrenci_id).filter(y=>!y.odendi).slice(0,count);
    if(!odenmemis.length)return 0;
    const ids=odenmemis.map(y=>y.id);
    await supabase.from("ogrenci_yoklama").update({odendi:true}).in("id",ids);
    setYoklamalar(p=>p.map(y=>ids.includes(y.id)?{...y,odendi:true}:y));
    return odenmemis.length;
  };

  useEffect(()=>{loadOgr();loadMuh();loadDemo();loadYoklama();loadKitTakip();loadKitStok();loadEgitmenler();loadSinifEgitmen();},[loadOgr,loadMuh,loadDemo,loadYoklama,loadKitTakip,loadKitStok,loadEgitmenler,loadSinifEgitmen]);
  useEffect(()=>{document.body.setAttribute("data-theme",theme);localStorage.setItem("theme",theme);},[theme]);



  const exportKitTakipExcel=()=>{
    const list=ogrenciler.filter(o=>o.kit&&o.kit_aktif!==false).filter(o=>{
      const k=getKitTakip(o.id);const d=efektifDurum(o,k);
      if(kitFiltre.durum!=="Tümü"&&d!==kitFiltre.durum)return false;
      if(kitFiltre.kitTipi!=="Tümü"&&o.kit!==kitFiltre.kitTipi)return false;
      return true;
    });
    if(!list.length){toast2("Liste boş","err");return;}
    const headers=["Öğrenci","Kit Tipi","Teslim","Durum","Arıza Tipi","Açıklama","Telefon","Güncellendi"];
    const rows=list.map(o=>{
      const k=getKitTakip(o.id);
      return[o.ad||"",o.kit||"",o.kit_alindi?"Alındı":"Bekliyor",KIT_DURUM[efektifDurum(o,k)]?.l.replace(/[^\w\sğüşıİöçĞÜŞÖÇ]/g,"").trim()||"Tam",k?.ariza_tipi||"",k?.aciklama||"",o.telefon||"",k?.updated_at?new Date(k.updated_at).toLocaleDateString("tr-TR"):""];
    });
    // CSV (Excel uyumlu UTF-8 BOM ile)
    const esc=(v)=>{const s=String(v||"");return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;};
    const csv="\uFEFF"+[headers,...rows].map(r=>r.map(esc).join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`kit-takip-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
    toast2(`✅ ${list.length} kayıt Excel'e aktarıldı`);
  };

  const updateField=async(o,patch,toastMsg)=>{
    setOgrenciler(prev=>prev.map(x=>x.id===o.id?{...x,...patch}:x));
    const{error}=await supabase.from("ogrenciler").update(patch).eq("id",o.id);
    if(error){toast2("Hata: "+error.message,"err");loadOgr();return;}
    if(toastMsg)toast2(toastMsg);
  };
  const addO=async(f)=>{setSaving(true);const row={...f,ucret:Number(f.ucret)};const{error}=await supabase.from("ogrenciler").insert([row]);setSaving(false);if(error){toast2("Hata: "+error.message,"err");return;}setModal(null);toast2("✅ Eklendi!");loadOgr();};
  const updO=async(f)=>{setSaving(true);const row={...f,ucret:Number(f.ucret)};const{error}=await supabase.from("ogrenciler").update(row).eq("id",f.id);setSaving(false);if(error){toast2("Hata: "+error.message,"err");return;}setModal(null);toast2("✅ Güncellendi!");loadOgr();};
  const delO=async(id)=>{const{error}=await supabase.from("ogrenciler").delete().eq("id",id);if(error){toast2("Hata: "+error.message,"err");return;}setDelC(null);toast2("🗑️ Silindi.");loadOgr();};

  const changeOdeme=async(ogrenci,yeniDurum)=>{
    setOgrenciler(prev=>prev.map(o=>o.id===ogrenci.id?{...o,odeme_durumu:yeniDurum}:o));
    await supabase.from("ogrenciler").update({odeme_durumu:yeniDurum}).eq("id",ogrenci.id);
    toast2(`✅ ${ogrenci.ad}: ${yeniDurum==="3aylik"?"3 Aylık":"Aylık"}`);
  };
  // Son ödeme tarihi değiştirildiğinde: muhasebe kaydı + ders kapsama
  const setOdemeTarihi=async(ogrenci,yeniTarih)=>{
    const eski=ogrenci.odeme_alindi_tarihi;
    setOgrenciler(prev=>prev.map(o=>o.id===ogrenci.id?{...o,odeme_alindi_tarihi:yeniTarih||null,odeme_alindi:!!yeniTarih}:o));
    await supabase.from("ogrenciler").update({odeme_alindi_tarihi:yeniTarih||null,odeme_alindi:!!yeniTarih}).eq("id",ogrenci.id);
    if(yeniTarih&&!eski){
      const tip=ogrenci.odeme_durumu||"aylik";
      const carpan=tip==="3aylik"?3:1;
      const dersAdedi=tip==="3aylik"?12:4;
      const tutar=(ogrenci.ucret||0)*carpan;
      await supabase.from("muhasebe").insert([{tip:"gelir",kategori:"Öğrenci",aciklama:`${ogrenci.ad} — ${tip==="3aylik"?"3 Aylık":"Aylık"} Ücret`,tutar,tarih:yeniTarih,ogrenci_id:ogrenci.id}]);
      const odendiSayi=await dersleriOdedi(ogrenci.id,dersAdedi);
      toast2(`✅ ${ogrenci.ad}: ${tutar.toLocaleString("tr")}₺ kaydedildi · ${odendiSayi} ders kapsama girdi`);
      loadMuh();
    } else if(!yeniTarih&&eski){
      toast2("🗓️ Ödeme tarihi temizlendi");
    } else if(yeniTarih&&eski){
      toast2("📅 Ödeme tarihi güncellendi");
    }
  };

  const addMuh=async(f)=>{setSaving(true);const{error}=await supabase.from("muhasebe").insert([{...f,tutar:Number(f.tutar)}]);setSaving(false);if(error){toast2("Hata: "+error.message,"err");return;}setModal(null);toast2("✅ Kaydedildi!");loadMuh();};
  const delMuh=async(id)=>{const{error}=await supabase.from("muhasebe").delete().eq("id",id);if(error){toast2("Hata: "+error.message,"err");return;}setDelM(null);toast2("🗑️ Silindi.");loadMuh();};
  const addDemo=async(f)=>{setSaving(true);const{error}=await supabase.from("demolar").insert([{...f,yas:f.yas?Number(f.yas):null}]);setSaving(false);if(error){toast2("Hata: "+error.message,"err");return;}setModal(null);toast2("✅ Demo eklendi!");loadDemo();};
  const updDemoStatus=async(id,durum)=>{await supabase.from("demolar").update({durum}).eq("id",id);loadDemo();};
  const delDemo=async(id)=>{const{error}=await supabase.from("demolar").delete().eq("id",id);if(error){toast2("Hata: "+error.message,"err");return;}setDelD(null);toast2("🗑️ Silindi.");loadDemo();};



  // ── Computed ──────────────────────────────────────────────────────────────
  // "Gecikmiş ödeme" — sarı (borçtaki) ders sayısı 0'dan büyük olanlar
  const buAyStr=`${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,"0")}`;
  const gecmis=ogrenciler.filter(o=>{
    if(o.durum!=="Aktif") return false;
    const dersler=yoklamalar.filter(y=>y.ogrenci_id===o.id);
    const borc=dersler.filter(d=>!d.odendi).length;
    return borc>0;
  }).map(o=>{
    const dersler=yoklamalar.filter(y=>y.ogrenci_id===o.id);
    const borc=dersler.filter(d=>!d.odendi).length;
    return {...o,_borc:borc,_gun:borc};
  }).sort((a,b)=>b._borc-a._borc);
  const k3=gecmis.filter(o=>o._borc>=3&&o._borc<5);
  const k5=gecmis.filter(o=>o._borc>=5);
  const filtered=ogrenciler.filter(o=>{
    const ms=o.ad?.toLowerCase().includes(search.toLowerCase());
    const mg=grupF==="Tümü"||o.grup===grupF;
    if(!ms||!mg) return false;
    const u=o.ucret||0;
    if(fiyatF==="3-4"&&!(u>=3000&&u<4000)) return false;
    if(fiyatF==="4-5"&&!(u>=4000&&u<5000)) return false;
    if(fiyatF==="5+"&&!(u>=5000)) return false;
    if(kitF!=="Tümü"&&(o.kit||"")!==kitF) return false;
    if(gunF!=="Tümü"){
      const gunler=(o.ders_gunleri||o.ders_gunu||"").split(",").map(g=>g.trim()).filter(Boolean);
      if(!gunler.includes(gunF)) return false;
    }
    if(odemeF==="Tümü") return true;
    return (o.odeme_durumu||"aylik")===odemeF;
  });

  const topGelir=muhasebe.filter(m=>m.tip==="gelir").reduce((s,m)=>s+m.tutar,0);
  const topGider=muhasebe.filter(m=>m.tip==="gider").reduce((s,m)=>s+m.tutar,0);
  const totalK=ogrenciler.reduce((s,o)=>s+(o.ucret||0),0);

  // Bu ayın verileri — dashboard için
  const buAyMuh=muhasebe.filter(m=>m.tarih&&yilAy(m.tarih)===buYilAy);
  const buAyGelirHam=buAyMuh.filter(m=>m.tip==="gelir").reduce((s,m)=>s+m.tutar,0);
  const buAyGelir=Math.max(0,buAyGelirHam-devreden); // devreden düşülmüş net gelir
  const buAyGider=buAyMuh.filter(m=>m.tip==="gider").reduce((s,m)=>s+m.tutar,0);
  const buAyAdi=new Date().toLocaleDateString("tr-TR",{month:"long",year:"numeric"});

  const aylar=["Tümü",...new Set(muhasebe.filter(m=>m.tarih).map(m=>yilAy(m.tarih)).sort().reverse())];
  const allKatlar=["Tümü",...new Set(muhasebe.filter(m=>muhTip==="tümü"||m.tip===muhTip).map(m=>m.kategori))];
  const muhFiltered=muhasebe.filter(m=>{if(muhTip!=="tümü"&&m.tip!==muhTip)return false;if(muhKat!=="Tümü"&&m.kategori!==muhKat)return false;if(muhAy!=="Tümü"&&(!m.tarih||yilAy(m.tarih)!==muhAy))return false;return true;});
  const filtGelir=muhFiltered.filter(m=>m.tip==="gelir").reduce((s,m)=>s+m.tutar,0);
  const filtGider=muhFiltered.filter(m=>m.tip==="gider").reduce((s,m)=>s+m.tutar,0);

  const bugunDemo=demolar.filter(d=>d.tarih>=TODAY).sort((a,b)=>a.tarih.localeCompare(b.tarih));
  const gecmisDemolar=demolar.filter(d=>d.tarih<TODAY).sort((a,b)=>b.tarih.localeCompare(a.tarih));

  const giderByKat={};muhasebe.filter(m=>m.tip==="gider").forEach(m=>{giderByKat[m.kategori]=(giderByKat[m.kategori]||0)+m.tutar;});
  const pieGider=Object.entries(giderByKat).sort((a,b)=>b[1]-a[1]).map(([label,value])=>({label,value}));
  const gelirByKat={};muhasebe.filter(m=>m.tip==="gelir").forEach(m=>{gelirByKat[m.kategori]=(gelirByKat[m.kategori]||0)+m.tutar;});
  const pieGelir=Object.entries(gelirByKat).sort((a,b)=>b[1]-a[1]).map(([label,value])=>({label,value}));
  const prR=[{l:"3-4K",c:ogrenciler.filter(o=>o.ucret>=3000&&o.ucret<4000).length,col:"#00ffc8"},{l:"4-5K",c:ogrenciler.filter(o=>o.ucret>=4000&&o.ucret<5000).length,col:"#00d4ff"},{l:"5-6K",c:ogrenciler.filter(o=>o.ucret>=5000&&o.ucret<6000).length,col:"#7b61ff"},{l:"6-7K",c:ogrenciler.filter(o=>o.ucret>=6000&&o.ucret<7000).length,col:"#ff6b6b"},{l:"7K+",c:ogrenciler.filter(o=>o.ucret>=7000).length,col:"#ffa94d"}];
  const mxPR=Math.max(...prR.map(r=>r.c),1);

  const curSch=SCHEDULE[scheduleGrup]; // sadece eski grid için tutuldu
  const saat2min=(s)=>{const [h,m]=s.split(":").map(Number);return h*60+m;};
  const bitisSaat=(s)=>{const [h,m]=s.split(":").map(Number);const nh=h+1;return`${String(nh).padStart(2,"0")}:${String(m).padStart(2,"0")}`;};
  // Aynı zaman aralığındaki slotları aynı kart olarak grupla
  // ve her slot için "aynı dersliği o saatte paylaşan TÜM öğrencileri" hesapla
  const mergeOverlapping=(slots)=>{
    // 1. Aynı saat aralığı + derslik → birleştir (içerikteki öğrenciler birikir)
    const byKey={};
    slots.forEach(s=>{
      const key=`${s.derslik}__${s.saat}__${s.bitis}`;
      if(!byKey[key]){
        byKey[key]={...s,ogrenciler:[...s.ogrenciler]};
      } else {
        s.ogrenciler.forEach(og=>{if(!byKey[key].ogrenciler.includes(og))byKey[key].ogrenciler.push(og);});
      }
    });
    const merged=Object.values(byKey);
    // 2. Her slot için: aynı derslikte zaman aralığı örtüşen diğer slotların öğrencilerini de TopTotal'e kat
    merged.forEach(slot=>{
      const a1=saat2min(slot.saat);const b1=saat2min(slot.bitis);
      const tumOgr=new Set(slot.ogrenciler);
      const overlaps=[];
      merged.forEach(other=>{
        if(other===slot)return;
        if(other.derslik!==slot.derslik)return;
        const a2=saat2min(other.saat);const b2=saat2min(other.bitis);
        // gerçek örtüşme: a1<b2 && a2<b1
        if(a1<b2&&a2<b1){
          other.ogrenciler.forEach(og=>tumOgr.add(og));
          overlaps.push({saat:other.saat,bitis:other.bitis,ogrenciler:other.ogrenciler});
        }
      });
      slot.tumOgrenciler=Array.from(tumOgr); // o anda sınıfta toplam kişiler
      slot.overlapSlots=overlaps; // örtüşen diğer slotlar
    });
    return merged.sort((a,b)=>saat2min(a.saat)-saat2min(b.saat));
  };

  // Tamamen öğrencilerden dinamik program oluştur
  // ders_gunleri (yeni, çoklu) VEYA ders_gunu (eski, tek) desteklenir
  const gridSlots={};
  ogrenciler.filter(o=>o.durum==="Aktif").forEach(o=>{
    const gunStr=o.ders_gunleri||o.ders_gunu||"";
    const saatStr=o.ders_saati||"";
    if(!gunStr||!saatStr) return;
    const gunler=gunStr.split(",").map(g=>g.trim()).filter(Boolean);
    gunler.forEach(gun=>{
      const derslik=o.derslik||"1";
      // Key'de derslik DA olmalı — aksi halde Derslik 2'deki öğrenci D1 slotunda kaybolur
      const key=`${gun}__${saatStr}__D${derslik}`;
      if(!gridSlots[gun]) gridSlots[gun]={};
      if(!gridSlots[gun][key]) gridSlots[gun][key]={gun,saat:saatStr,bitis:o.ders_bitis||bitisSaat(saatStr),derslik,ogrenciler:[],renk:derslik==="1"?"#00ffc8":derslik==="2"?"#7b61ff":derslik==="3"?"#ffa94d":"#f472b6"};
      gridSlots[gun][key].ogrenciler.push(o.ad);
    });
  });
  // gridSlots'u {gun: [slot,...]} formatına çevir
  const gridSlotsArr={};
  Object.entries(gridSlots).forEach(([gun,slotsObj])=>{
    gridSlotsArr[gun]=Object.values(slotsObj).sort((a,b)=>saat2min(a.saat)-saat2min(b.saat));
  });

  const demoByGun={};bugunDemo.forEach(d=>{const dt=new Date(d.tarih);const gi=dt.getDay()===0?6:dt.getDay()-1;const g=GUNLER[gi];if(!demoByGun[g])demoByGun[g]=[];demoByGun[g].push(d);});
  const allActiveGunler=GUNLER.filter(g=>gridSlotsArr[g]||demoByGun[g]);
  const activeGunler=programGunF==="Tümü"?allActiveGunler:[programGunF].filter(g=>allActiveGunler.includes(g));

  const arizaliSayi=kitler.filter(k=>k.durum==="tamir"||k.durum==="bozuk").length;
  const TABS=[{id:"dashboard",l:"📊 Dashboard"},{id:"ogrenciler",l:"👥 Öğrenciler"},{id:"kitset",l:`🎒 Kit Seti${arizaliSayi>0?" ("+arizaliSayi+")":""}`},{id:"program",l:"📅 Program"},{id:"demo",l:`🎯 Demo${bugunDemo.length>0?" ("+bugunDemo.length+")":""}`},{id:"muhasebe",l:"💰 Muhasebe"}];

  return(<div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:"var(--bg)",minHeight:"100vh",color:"var(--text)"}}>
    <style>{css}</style>
    {toast&&<div className="toast" style={{background:toast.type==="err"?"#ff6b6b":"#00ffc8",color:"#0a0d14"}}>{toast.msg}</div>}


    <div style={{background:"var(--grad-h)",borderBottom:"1px solid var(--border)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center"}}>
        <img src="/logo.png" alt="ROBOGPT" style={{height:42,width:"auto",maxWidth:200,objectFit:"contain",display:"block"}} onError={e=>{e.currentTarget.style.display="none";e.currentTarget.insertAdjacentHTML("afterend",'<span style="font-size:22px">🤖</span>');}}/>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {bugunDemo.length>0&&<div onClick={()=>setTab("demo")} style={{background:"rgba(250,204,21,.1)",border:"1px solid rgba(250,204,21,.3)",borderRadius:8,padding:"5px 10px",fontSize:11,color:"#fbbf24",fontWeight:600,cursor:"pointer"}}>🎯 {bugunDemo.length} demo</div>}
        {gecmis.length>0&&<div style={{background:"rgba(255,107,107,.1)",border:"1px solid rgba(255,107,107,.3)",borderRadius:8,padding:"5px 10px",fontSize:11,color:"#ff6b6b",fontWeight:600}}>⚠️ {gecmis.length}</div>}
        <div style={{background:"rgba(0,255,200,.08)",border:"1px solid rgba(0,255,200,.2)",borderRadius:8,padding:"5px 10px",display:"flex",alignItems:"center",gap:5}}><div style={{width:7,height:7,borderRadius:"50%",background:"#00ffc8",boxShadow:"0 0 8px #00ffc8"}}/><span style={{fontSize:11,color:"var(--accent)",fontWeight:600}}>{ogrenciler.length} Öğrenci</span></div>
        <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} title={`${theme==="dark"?"Açık":"Koyu"} temaya geç`} style={{background:"var(--bg4)",border:"1px solid var(--border)",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:14,color:"var(--accent)",fontFamily:"inherit",fontWeight:700,display:"flex",alignItems:"center",gap:5}}>{theme==="dark"?"☀️":"🌙"}<span style={{fontSize:11}}>{theme==="dark"?"Light":"Dark"}</span></button>
      </div>
    </div>

    <div style={{background:"var(--bg)",borderBottom:"1px solid var(--border)",padding:"6px 16px",overflowX:"auto",display:"flex",gap:4}}>
      {TABS.map(t=><button key={t.id} className={`tab ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>)}
    </div>

    <div style={{maxWidth:1100,margin:"0 auto",padding:"20px 16px"}}>

      {/* ══ DASHBOARD ══ */}
      {tab==="dashboard"&&(<div>
        <div style={{marginBottom:16}}><h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700}}>Dashboard</h2><p style={{color:"var(--text4)",fontSize:12,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p></div>
        {loading?<div style={{textAlign:"center",padding:60,color:"var(--text4)"}}>Yükleniyor...</div>:<>
          <div className="g4" style={{marginBottom:14}}>
            {[
              {l:"Toplam Öğrenci",v:ogrenciler.length,sub:`${ogrenciler.filter(o=>o.grup==="Büyük").length} Büyük · ${ogrenciler.filter(o=>o.grup==="Kids").length} Kids`,i:"👥",c:"#00ffc8",badge:"AKTİF"},
              {l:"Öğrenci Geliri (Toplam)",v:totalK.toLocaleString("tr")+"₺",sub:`Ort. ${Math.round(totalK/(ogrenciler.length||1)).toLocaleString("tr")}₺/kişi`,i:"📋",c:"var(--accent)",badge:"KAYIT"},
              {l:"Muhasebe Net Kârı",v:Math.max(0,(topGelir-topGider)-netReset).toLocaleString("tr")+"₺",sub:`Gelir: ${topGelir.toLocaleString("tr")}₺ · Gider: ${topGider.toLocaleString("tr")}₺${netReset>0?` · ${netReset.toLocaleString("tr")}₺ hariç`:""}`,i:"💰",c:"#7b61ff",badge:"TOPLAM",resetable:true},
              {l:"Gecikmiş Ödeme",v:gecmis.length,sub:`${k5.length} kritik (5+ gün)`,i:"⚠️",c:"#ff6b6b",badge:"TAKİP"},
            ].map((s,i)=>(
              <div key={i} className="card" style={{position:"relative"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:24}}>{s.i}</span><span style={{fontSize:10,color:s.c,background:`${s.c}18`,border:`1px solid ${s.c}35`,borderRadius:6,padding:"2px 7px",fontWeight:600}}>{s.badge}</span></div>
                <div style={{fontSize:22,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",color:s.c,marginBottom:2}}>{s.v}</div>
                <div style={{fontSize:12,color:"var(--text4)"}}>{s.l}</div>
                <div style={{fontSize:11,color:"var(--text5)",marginTop:2}}>{s.sub}</div>
                {s.resetable&&(
                  <div style={{marginTop:10,display:"flex",gap:6,alignItems:"center",borderTop:"1px solid var(--border)",paddingTop:8}}>
                    <input type="number" placeholder="Hariç tutulacak ₺" defaultValue={netReset||""} 
                      onBlur={e=>{const v=Math.max(0,Number(e.target.value)||0);setNetReset(v);localStorage.setItem("netReset",String(v));toast2(v>0?`✅ ${v.toLocaleString("tr")}₺ hariç tutuldu`:"✅ Sıfırlama kaldırıldı");}}
                      style={{flex:1,background:"var(--bg4)",border:"1px solid var(--border)",borderRadius:6,padding:"4px 8px",fontSize:11,fontFamily:"inherit",color:"var(--text)",fontWeight:600,minWidth:0}}/>
                    {netReset>0&&<button onClick={()=>{setNetReset(0);localStorage.removeItem("netReset");toast2("✅ Sıfırlama temizlendi");}} style={{background:"rgba(255,107,107,.15)",border:"1px solid rgba(255,107,107,.3)",color:"#ff6b6b",borderRadius:6,padding:"4px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:10}}>↺</button>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="g2" style={{marginBottom:14}}>
            <div className="card"><h3 style={{fontSize:13,fontWeight:600,marginBottom:14,color:"var(--text2)"}}>Fiyat Dağılımı</h3>{prR.map((r,i)=>(<div key={i} style={{marginBottom:9}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:"var(--text3)"}}>{r.l}</span><span style={{fontSize:12,fontWeight:700,color:r.col}}>{r.c} kişi</span></div><div style={{height:5,background:"#1e2940",borderRadius:3}}><div style={{height:"100%",width:`${(r.c/mxPR)*100}%`,background:r.col,borderRadius:3}}/></div></div>))}</div>
            <div className="card">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <h3 style={{fontSize:13,fontWeight:600,color:"var(--text2)"}}>📅 {buAyAdi}</h3>
                <span style={{fontSize:10,color:"#00d4ff",background:"rgba(0,212,255,.1)",border:"1px solid rgba(0,212,255,.2)",borderRadius:6,padding:"2px 8px",fontWeight:600}}>BU AY</span>
              </div>
              {[
                {l:"Bu Ay Geliri",v:(devreden>0?buAyGelir:buAyGelirHam).toLocaleString("tr")+"₺",c:"#00d4ff",sub:devreden>0?`(Ham: ${buAyGelirHam.toLocaleString("tr")}₺)`:null},
                {l:"Bu Ay Gideri",v:buAyGider.toLocaleString("tr")+"₺",c:"#ff6b6b",sub:null},
                {l:"Bu Ay Net Kârı",v:(buAyGelir-buAyGider).toLocaleString("tr")+"₺",c:"#7b61ff",sub:buAyGelir>0?`Marj: %${Math.round((buAyGelir-buAyGider)/buAyGelir*100)}`:null},
              ].map((x,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid #1e2940":"none"}}>
                  <div><span style={{fontSize:13,color:"var(--text3)"}}>{x.l}</span>{x.sub&&<div style={{fontSize:10,color:"var(--text4)",marginTop:1}}>{x.sub}</div>}</div>
                  <span style={{fontSize:17,fontWeight:700,color:x.c,fontFamily:"'Space Grotesk',sans-serif"}}>{x.v}</span>
                </div>
              ))}
            </div>
          </div>
          {gecmis.length>0&&(
            <div style={{marginTop:14,background:"rgba(251,191,36,.05)",border:"1px solid rgba(251,191,36,.25)",borderRadius:14,padding:16}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
                <span style={{fontWeight:600,color:"#fbbf24",fontSize:14}}>⏳ Borçtaki Dersler — {gecmis.length} öğrenci</span>
                <span style={{fontSize:11,color:"var(--text4)"}}>Sarı tikli (henüz ödenmemiş) dersi olan öğrenciler</span>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {gecmis.slice(0,20).map((o,i)=>(
                  <span key={i} onClick={()=>setTab("ogrenciler")} style={{background:o._borc>=5?"rgba(255,107,107,.15)":o._borc>=3?"rgba(255,169,77,.12)":"rgba(251,191,36,.1)",border:`1px solid ${o._borc>=5?"rgba(255,107,107,.4)":o._borc>=3?"rgba(255,169,77,.3)":"rgba(251,191,36,.3)"}`,borderRadius:8,padding:"4px 10px",fontSize:11,color:o._borc>=5?"#ff6b6b":o._borc>=3?"#ffa94d":"#fbbf24",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4}}>
                    {o.ad.split(" ")[0]} <strong>·{o._borc}</strong>
                  </span>
                ))}
                {gecmis.length>20&&<span style={{fontSize:11,color:"var(--text4)",alignSelf:"center",marginLeft:6}}>+{gecmis.length-20} kişi...</span>}
              </div>
            </div>
          )}
        </>}
      </div>)}

      {/* ══ ÖĞRENCİLER ══ */}
      {tab==="ogrenciler"&&(<div>
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          <input className="inp" style={{maxWidth:200}} placeholder="🔍 Ara..." value={search} onChange={e=>setSearch(e.target.value)}/>
          {["Tümü","Büyük","Kids"].map(g=><button key={g} className="bg" onClick={()=>setGrupF(g)} style={{background:grupF===g?"linear-gradient(135deg,#00ffc8,#00d4ff)":"#1a1f2e",color:grupF===g?"#0a0d14":"#9ca3af",border:grupF===g?"none":"1px solid #1e2940",fontSize:12,padding:"7px 12px"}}>{g}</button>)}
          <select className="sel" style={{maxWidth:140,padding:"8px 12px",fontSize:12}} value={fiyatF} onChange={e=>setFiyatF(e.target.value)}>
            <option value="Tümü">💰 Tüm Fiyatlar</option>
            <option value="3-4">3.000–4.000₺</option>
            <option value="4-5">4.000–5.000₺</option>
            <option value="5+">5.000₺ ve üzeri</option>
          </select>
          <select className="sel" style={{maxWidth:150,padding:"8px 12px",fontSize:12}} value={kitF} onChange={e=>setKitF(e.target.value)}>
            <option value="Tümü">🎒 Tüm Kitler</option>
            <option value="">⛔ Kit Yok</option>
            {KITLER.map(k=><option key={k} value={k}>{KIT_ICON[k]} {k}</option>)}
          </select>
          <select className="sel" style={{maxWidth:140,padding:"8px 12px",fontSize:12}} value={gunF} onChange={e=>setGunF(e.target.value)}>
            <option value="Tümü">📅 Tüm Günler</option>
            {GUNLER.map(g=><option key={g} value={g}>📅 {g}</option>)}
          </select>
          <select className="sel" style={{maxWidth:160,padding:"8px 12px",fontSize:12}} value={odemeF} onChange={e=>setOdemeF(e.target.value)}>
            <option value="Tümü">💳 Tüm Tipler</option>
            <option value="aylik">💳 Aylık</option>
            <option value="3aylik">📅 3 Aylık</option>
          </select>
          <span style={{color:"var(--text4)",fontSize:12}}>{filtered.length} kişi</span>
          {filtered.length>0&&<span style={{background:"rgba(0,255,200,.08)",border:"1px solid rgba(0,255,200,.25)",borderRadius:8,padding:"5px 12px",fontSize:11,color:"#00ffc8",fontWeight:600}}>
            Ortalama: {Math.round(filtered.reduce((s,o)=>s+(o.ucret||0),0)/filtered.length).toLocaleString("tr")}₺
            {fiyatF!=="Tümü"&&` · ${fiyatF==="3-4"?"3-4K grubu":fiyatF==="4-5"?"4-5K grubu":"5K+ grubu"}`}
          </span>}
          <button className="bp" style={{marginLeft:"auto"}} onClick={()=>setModal("add")}>+ Yeni</button>
        </div>
        {loading?<div style={{textAlign:"center",padding:60,color:"var(--text4)"}}>Yükleniyor...</div>:(
          <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:1100}}>
              <thead><tr>
                <th>#</th><th>Öğrenci</th><th>Grup</th><th>Aylık</th><th>🎒 Kit</th><th>Süre</th><th>Ders Günü/Saat</th><th>💳 Tip</th><th>📅 Son Ödeme</th>
                <th style={{minWidth:240,borderLeft:"2px solid var(--border)",background:"var(--bg)"}}>📋 Geldiği Dersler</th>
                <th>İletişim</th><th>İşlem</th>
              </tr></thead>
              <tbody>
                {filtered.map((o,i)=>{
                  const dur=o.odeme_durumu||"bekliyor";
                  return(<tr key={o.id} className="rh">
                    <td style={{color:"var(--text5)",fontSize:11}}>{i+1}</td>
                    <td style={{fontWeight:500,maxWidth:180}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <span style={{color:"var(--text)"}}>{o.ad}</span>
                        {o.kit&&(()=>{const k=getKitTakip(o.id);const d=efektifDurum(o,k);const cfg=KIT_DURUM[d];const icon=d==="bekliyor"?"⏳":d==="teslim_edilecek"?"📦":d==="tam"?"✓":d==="tamir"?"⚠":d==="bozuk"?"✗":"🔨";return(
                          <span title={`${o.kit} · ${cfg.l}${k?.ariza_tipi?" · "+k.ariza_tipi:""}`} style={{fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:4,background:cfg.bg,color:cfg.c,border:`1px solid ${cfg.b}`,whiteSpace:"nowrap"}}>{KIT_ICON[o.kit]}{icon}</span>
                        );})()}
                      </div>
                      {o.notlar&&<div style={{fontSize:10,color:"var(--text4)",marginTop:1}}>{o.notlar}</div>}
                    </td>
                    <td><GrupDropdown ogrenci={o} onChange={v=>updateField(o,{grup:v},`Grup: ${v}`)}/></td>
                    <td className="num" style={{fontWeight:700,color:(o.ucret||0)>=7000?"#00ffc8":"#e8eaf0",fontFamily:"'Space Grotesk',sans-serif"}}>{(o.ucret||0).toLocaleString("tr")}₺</td>
                    <td><div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-start"}}><KitDropdown ogrenci={o} onChange={v=>updateField(o,{kit:v},v?`Kit: ${v}`:"Kit kaldırıldı")}/>{o.kit&&<KitTeslim ogrenci={o} onChange={v=>setKitAlindi(o,v)}/>}</div></td>
                    <td style={{fontSize:11,color:"var(--text3)",whiteSpace:"nowrap"}}>{(()=>{
                      if(!o.odeme_tarihi)return<span style={{color:"var(--text5)"}}>—</span>;
                      const baslangic=new Date(o.odeme_tarihi);
                      const bugun=new Date();
                      let aySayi=(bugun.getFullYear()-baslangic.getFullYear())*12+(bugun.getMonth()-baslangic.getMonth());
                      let gunSayi=bugun.getDate()-baslangic.getDate();
                      if(gunSayi<0){aySayi--;const oncekiAyBitis=new Date(bugun.getFullYear(),bugun.getMonth(),0).getDate();gunSayi+=oncekiAyBitis;}
                      if(aySayi<0)return<span style={{color:"#fbbf24",fontSize:11}}>🔮 {Math.abs(gunSayi)}g sonra</span>;
                      const renk=aySayi>=12?"#7b61ff":aySayi>=6?"#00ffc8":aySayi>=3?"#00d4ff":"#9ca3af";
                      return(<div>
                        <div style={{color:renk,fontWeight:700,fontSize:12,fontFamily:"'Space Grotesk',sans-serif"}}>{aySayi>0?`${aySayi} ay `:""}{gunSayi}g</div>
                        <div style={{fontSize:9,color:"var(--text5)",marginTop:1}}>{baslangic.toLocaleDateString("tr-TR",{day:"2-digit",month:"short",year:"2-digit"})}</div>
                      </div>);
                    })()}</td>
                    {/* YENİ: ders günü ve saati */}
                    <td style={{maxWidth:160}}>{o.ders_gunleri||o.ders_gunu?<div style={{display:"flex",flexWrap:"wrap",gap:3}}>{(o.ders_gunleri||o.ders_gunu||"").split(",").map(g=>g.trim()).filter(Boolean).map((g,i)=><span key={i} style={{background:"rgba(0,212,255,.08)",border:"1px solid rgba(0,212,255,.2)",borderRadius:5,padding:"1px 6px",color:"#00d4ff",fontWeight:600,fontSize:10}}>{g}{o.ders_saati?" "+o.ders_saati:""}{o.ders_bitis?"–"+o.ders_bitis:""}</span>)}<DerslikDropdown ogrenci={o} onChange={v=>updateField(o,{derslik:v},`Derslik ${v}`)}/></div>:<span style={{color:"var(--text5)",fontSize:11}}>—</span>}</td>
                    <td><OdemeDurumu ogrenci={o} onChange={(val)=>changeOdeme(o,val)}/></td>
                    <td>
                      <input type="date" className="inp" style={{padding:"5px 8px",fontSize:11,minWidth:130,fontWeight:600,color:o.odeme_alindi_tarihi?(yilAy(o.odeme_alindi_tarihi)===buAyStr?"#00ffc8":"var(--text3)"):"var(--text5)",borderColor:o.odeme_alindi_tarihi&&yilAy(o.odeme_alindi_tarihi)===buAyStr?"rgba(0,255,200,.4)":"var(--border)"}}
                        value={o.odeme_alindi_tarihi||""}
                        onChange={e=>setOdemeTarihi(o,e.target.value)}/>
                    </td>
                    {/* DEVAM — geldiği tüm dersler (yeşil=ödendi, sarı=borçta) */}
                    <td style={{borderLeft:"2px solid var(--border)",padding:"8px 10px",minWidth:240}}>
                      {(()=>{
                        const dersler=ogrDersleri(o.id);
                        const odendi=dersler.filter(d=>d.odendi).length;
                        const borc=dersler.filter(d=>!d.odendi).length;
                        return(<div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                            {dersler.map((d,i)=>(
                              <button key={d.id} onClick={()=>dersToggle(d.id)}
                                title={`${d.tarih} · ${d.odendi?"✅ Ödendi":"⏳ Ödeme bekliyor"} (tıkla: durumu değiştir)`}
                                style={{
                                  width:18,height:18,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,
                                  background:d.odendi?"#00ffc8":"#fbbf24",
                                  boxShadow:d.odendi?"0 0 6px rgba(0,255,200,.4)":"0 0 6px rgba(251,191,36,.4)",
                                  transition:"transform .15s"
                                }}
                                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"}
                                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                              />
                            ))}
                            <button onClick={()=>dersEkle(o.id)} title="Yeni ders ekle"
                              style={{width:18,height:18,borderRadius:"50%",border:"1px dashed #00ffc8",background:"transparent",color:"#00ffc8",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,padding:0,lineHeight:"14px"}}>+</button>
                            {dersler.length>0&&<button onClick={()=>sonDersSil(o.id)} title="Son dersi sil"
                              style={{width:18,height:18,borderRadius:"50%",border:"1px dashed #ff6b6b",background:"transparent",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,padding:0,lineHeight:"14px"}}>−</button>}
                          </div>
                          <div style={{display:"flex",gap:8,fontSize:10,fontWeight:600}}>
                            <span style={{color:"#00ffc8"}}>✅ {odendi} ödendi</span>
                            {borc>0&&<span style={{color:"#fbbf24"}}>⏳ {borc} borç</span>}
                            {dersler.length===0&&<span style={{color:"var(--text5)"}}>+ ile ders ekle</span>}
                          </div>
                        </div>);
                      })()}
                    </td>
                    <td><div style={{display:"flex",gap:5}}>{o.telefon&&<a href={`tel:${o.telefon}`} style={{fontSize:16,textDecoration:"none"}}>📞</a>}{o.email&&<a href={`mailto:${o.email}`} style={{fontSize:16,textDecoration:"none"}}>✉️</a>}</div></td>
                    <td><div style={{display:"flex",gap:5}}><button className="bg" style={{padding:"4px 9px",fontSize:11}} onClick={()=>setModal({edit:o})}>✏️</button><button className="bd" onClick={()=>setDelC(o)}>🗑️</button></div></td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>)}

      {/* ══ PROGRAM ══ */}
      {tab==="program"&&(<div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14,flexWrap:"wrap"}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:"var(--text)"}}>📅 Haftalık Program</h2>
          <span style={{fontSize:11,color:"var(--text4)"}}>{allActiveGunler.length} gün · {allActiveGunler.reduce((s,g)=>(gridSlotsArr[g]||[]).reduce((s2,sl)=>s2+sl.ogrenciler.length,s),0)} öğrenci katılımı</span>
        </div>

        {/* Derslik filtresi */}
        {/* Derslik + Eğitmen yönet butonu */}
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:12,color:"var(--text4)",fontWeight:600}}>Derslik:</span>
          {[
            {v:"Tümü",l:"Tümü",c:"var(--accent)"},
            {v:"1",l:"Derslik 1",c:"#00ffc8"},
            {v:"2",l:"Derslik 2",c:"#7b61ff"},
            {v:"3",l:"Derslik 3",c:"#ffa94d"},
            {v:"4",l:"Derslik 4",c:"#f472b6"},
          ].map(opt=>(
            <button key={opt.v} className="bg" onClick={()=>setProgramDerslikF(opt.v)}
              style={{background:programDerslikF===opt.v?`${opt.c}25`:"var(--bg4)",color:programDerslikF===opt.v?opt.c:"var(--text3)",border:`1px solid ${programDerslikF===opt.v?opt.c+"60":"var(--border)"}`,fontSize:12,padding:"6px 12px",fontWeight:600}}>
              🏫 {opt.l}
            </button>
          ))}
          <button onClick={()=>setYeniEgitmenModal(true)} style={{marginLeft:"auto",background:"var(--bg4)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12,color:"var(--accent)"}}>👨‍🏫 Eğitmenleri Yönet ({egitmenler.length})</button>
        </div>

        {/* Eğitmen filtre satırı */}
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:12,color:"var(--text4)",fontWeight:600}}>👨‍🏫 Eğitmen:</span>
          <button className="bg" onClick={()=>setProgramEgitmenF("Tümü")}
            style={{background:programEgitmenF==="Tümü"?"var(--accent)25":"var(--bg4)",color:programEgitmenF==="Tümü"?"var(--accent)":"var(--text3)",border:`1px solid ${programEgitmenF==="Tümü"?"var(--accent)":"var(--border)"}`,fontSize:12,padding:"6px 12px",fontWeight:600}}>Tümü</button>
          {egitmenler.map(eg=>(
            <button key={eg.id} className="bg" onClick={()=>setProgramEgitmenF(eg.ad)}
              style={{background:programEgitmenF===eg.ad?`${eg.renk}25`:"var(--bg4)",color:programEgitmenF===eg.ad?eg.renk:"var(--text3)",border:`1px solid ${programEgitmenF===eg.ad?eg.renk+"60":"var(--border)"}`,fontSize:12,padding:"6px 12px",fontWeight:600}}>
              {eg.ad}
            </button>
          ))}
          {egitmenler.length===0&&<span style={{fontSize:11,color:"var(--text5)"}}>Henüz eğitmen yok — "Eğitmenleri Yönet" ile ekle</span>}
        </div>

        {allActiveGunler.length===0?(
          <div style={{textAlign:"center",padding:60,color:"var(--text4)"}}>
            <div style={{fontSize:40,marginBottom:12}}>📅</div>
            <div style={{fontSize:16,fontWeight:600,marginBottom:8}}>Henüz ders programı yok</div>
            <div style={{fontSize:13}}>Öğrencilere ders günü ve saati atandıkça burada görünecek</div>
          </div>
        ):(()=>{
          // Filtreye uygun slotları kullan
          const filteredSlotsArr={};
          GUNLER.forEach(g=>{
            const slots=(gridSlotsArr[g]||[]).filter(s=>{
              if(programDerslikF!=="Tümü"&&s.derslik!==programDerslikF)return false;
              if(programEgitmenF!=="Tümü"){const m=getSinifMeta(s);if((m?.egitmen||"")!==programEgitmenF)return false;}
              return true;
            });
            if(slots.length) filteredSlotsArr[g]=slots;
          });
          const fActiveGunler=GUNLER.filter(g=>filteredSlotsArr[g]||(programDerslikF==="Tümü"&&programEgitmenF==="Tümü"&&demoByGun[g]));

          const allSlots=fActiveGunler.flatMap(g=>filteredSlotsArr[g]||[]);
          const minSaat=allSlots.length?Math.min(...allSlots.map(s=>saat2min(s.saat))):540;
          const maxBitis=allSlots.length?Math.max(...allSlots.map(s=>saat2min(s.bitis))):1200;
          const demoSaatler=programDerslikF==="Tümü"?Object.values(demoByGun).flat().map(d=>{const [h,m]=(d.saat||"15:00").split(":").map(Number);return h*60+m;}):[];
          const minT=Math.max(540,Math.min(minSaat,...(demoSaatler.length?demoSaatler:[minSaat])));
          const maxT=Math.min(1320,Math.max(maxBitis,...(demoSaatler.length?demoSaatler.map(t=>t+60):[maxBitis])));
          const saatler=[];for(let t=Math.floor(minT/30)*30;t<=maxT;t+=30){saatler.push(t);}
          const min2saat=(t)=>`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;

          if(fActiveGunler.length===0)return(<div style={{textAlign:"center",padding:40,color:"var(--text4)",fontSize:13}}>Bu derslikte ders bulunmuyor.</div>);

          // GÜN BAZLI KART GÖRÜNÜMÜ — daha temiz, öğrenci listesi açık
          return(
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {fActiveGunler.map(gun=>{
                const slots=mergeOverlapping((filteredSlotsArr[gun]||[]));
                const demos=(programDerslikF==="Tümü"&&programEgitmenF==="Tümü")?(demoByGun[gun]||[]):[];
                const toplamOgr=slots.reduce((s,sl)=>s+sl.ogrenciler.length,0);
                return(
                  <div key={gun} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",boxShadow:"var(--shadow)"}}>
                    <div style={{padding:"12px 18px",background:"var(--bg5)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                      <span style={{fontSize:16,fontWeight:700,color:"var(--text)",fontFamily:"'Space Grotesk',sans-serif"}}>{gun}</span>
                      <span style={{fontSize:11,color:"var(--text4)",fontWeight:500}}>{slots.length} ders · {toplamOgr} öğrenci</span>
                      {demos.length>0&&<span style={{fontSize:11,color:"#fbbf24",background:"rgba(251,191,36,.1)",border:"1px solid rgba(251,191,36,.3)",borderRadius:5,padding:"1px 8px",fontWeight:600}}>🎯 {demos.length} demo</span>}
                    </div>
                    <div style={{padding:"14px 18px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                      {slots.map((slot,si)=>{
                        const cap=slot.ogrenciler.length; // sadece bu slot
                        const totalCap=(slot.tumOgrenciler||slot.ogrenciler).length; // örtüşme dahil
                        const maxCap=slot.derslik==="1"?8:4; // D1=8, D2/D3/D4=4
                        const oran=totalCap/maxCap;
                        const capColor=oran>=1?"#ff6b6b":oran>=.75?"#ffa94d":"#00ffc8";
                        const capLabel=oran>=1?"🔴 Dolu":oran>=.75?"🟠 Orta":"🟢 Müsait";
                        return(
                          <div key={si} style={{background:`linear-gradient(135deg,${slot.renk}10,${slot.renk}05)`,border:`1px solid ${slot.renk}40`,borderLeft:`4px solid ${slot.renk}`,borderRadius:12,padding:"12px 14px",transition:"transform .15s"}}
                            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 6px 18px ${slot.renk}25`;}}
                            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                            {/* Sınıf etiketi: en çok kullanılan kit */}
                            {(()=>{
                              const kitSay={};
                              slot.ogrenciler.forEach(og=>{const o=ogrenciler.find(x=>x.ad===og);if(o?.kit)kitSay[o.kit]=(kitSay[o.kit]||0)+1;});
                              const entries=Object.entries(kitSay).sort((a,b)=>b[1]-a[1]);
                              const anaKit=entries[0]?.[0];
                              if(!anaKit)return null;
                              return(
                                <div style={{display:"inline-flex",alignItems:"center",gap:5,background:`${KIT_COL[anaKit]}15`,border:`1px solid ${KIT_COL[anaKit]}40`,borderRadius:6,padding:"2px 8px",marginBottom:8,fontSize:10,fontWeight:800,letterSpacing:".05em",color:KIT_COL[anaKit],textTransform:"uppercase"}}>
                                  {KIT_ICON[anaKit]} {anaKit} SINIFI
                                  {entries.length>1&&<span style={{opacity:.7,fontWeight:600,marginLeft:3}}>+{entries.slice(1).map(([k,n])=>`${KIT_ICON[k]}${n}`).join(" ")}</span>}
                                </div>
                              );
                            })()}
                            {(()=>{
                              // Hangi kit ağırlıklı? Sınıfın TÜM öğrencileri (örtüşme dahil) üzerinden hesapla
                              const ogrList=slot.tumOgrenciler||slot.ogrenciler;
                              const kitSay={};
                              ogrList.forEach(ad=>{const o=ogrenciler.find(x=>x.ad===ad);if(o&&o.kit)kitSay[o.kit]=(kitSay[o.kit]||0)+1;});
                              const enCokKit=Object.entries(kitSay).sort((a,b)=>b[1]-a[1])[0]?.[0];
                              const meta=getSinifMeta(slot)||{};
                              const sinifAdi=enCokKit?`${enCokKit.toUpperCase()} SINIFI`:"";
                              return(
                                <>
                                  {sinifAdi&&(
                                    <div style={{marginBottom:6}}>
                                      <span style={{fontSize:11,fontWeight:800,color:enCokKit?KIT_COL[enCokKit]:slot.renk,letterSpacing:".03em",display:"inline-flex",alignItems:"center",gap:4}}>{enCokKit?KIT_ICON[enCokKit]:""} {sinifAdi}{meta.proje_no?` · Proje #${meta.proje_no}`:""}</span>
                                    </div>
                                  )}
                                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,gap:8,flexWrap:"wrap"}}>
                                    <span style={{fontSize:14,fontWeight:700,color:"var(--text)",fontFamily:"'JetBrains Mono',monospace"}}>{slot.saat}–{slot.bitis}</span>
                                    <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:5,background:`${slot.renk}25`,color:slot.renk}}>🏫 D{slot.derslik}</span>
                                  </div>
                                  {/* Eğitmen + Proje */}
                                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                                    <div style={{display:"flex",alignItems:"center",gap:4,flex:"1 1 140px",minWidth:120}}>
                                      <span style={{fontSize:10,color:"var(--text4)",fontWeight:600}}>👨‍🏫</span>
                                      <select value={meta.egitmen||""} onChange={e=>upsertSinifMeta(slot,{egitmen:e.target.value||null})}
                                        onClick={e=>e.stopPropagation()}
                                        style={{flex:1,background:meta.egitmen?`${slot.renk}10`:"var(--bg4)",border:`1px solid ${meta.egitmen?slot.renk+"40":"var(--border)"}`,borderRadius:5,padding:"3px 6px",fontSize:11,fontFamily:"inherit",color:meta.egitmen?slot.renk:"var(--text4)",fontWeight:600,cursor:"pointer"}}>
                                        <option value="">— Eğitmen seç —</option>
                                        {egitmenler.map(eg=><option key={eg.id} value={eg.ad}>{eg.ad}</option>)}
                                      </select>
                                    </div>
                                    <div style={{display:"flex",alignItems:"center",gap:4,flex:"0 0 auto"}}>
                                      <span style={{fontSize:10,color:"var(--text4)",fontWeight:600}}>📐</span>
                                      <input type="number" placeholder="Proje" defaultValue={meta.proje_no||""} min={1}
                                        onBlur={e=>{const v=Number(e.target.value)||null;if(v!==meta.proje_no)upsertSinifMeta(slot,{proje_no:v});}}
                                        onClick={e=>e.stopPropagation()}
                                        style={{width:70,background:meta.proje_no?`${slot.renk}10`:"var(--bg4)",border:`1px solid ${meta.proje_no?slot.renk+"40":"var(--border)"}`,borderRadius:5,padding:"3px 6px",fontSize:11,fontFamily:"inherit",color:meta.proje_no?slot.renk:"var(--text4)",fontWeight:700,textAlign:"center"}} title="Kaçıncı proje? (manuel sayı gir)"/>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                            {slot.overlapSlots&&slot.overlapSlots.length>0&&(
                              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8,paddingBottom:8,borderBottom:`1px dashed ${slot.renk}30`,alignItems:"center"}}>
                                <span style={{fontSize:9,color:"var(--text4)",fontWeight:600}}>Örtüşen:</span>
                                {slot.overlapSlots.map((sub,sii)=>(
                                  <span key={sii} title={sub.ogrenciler.join(", ")} style={{fontSize:10,padding:"2px 7px",borderRadius:5,background:`${slot.renk}12`,color:slot.renk,fontWeight:600,fontFamily:"'JetBrains Mono',monospace",border:`1px solid ${slot.renk}25`}}>
                                    {sub.saat}–{sub.bitis}·{sub.ogrenciler.length}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
                              {slot.ogrenciler.map((og,ii)=>{
                                const ogr=ogrenciler.find(o=>o.ad===og);
                                const kit=ogr?.kit;
                                return(<span key={ii} title={kit?`${og} · ${kit}`:og} style={{fontSize:11,padding:"2px 7px",borderRadius:5,background:"var(--bg4)",color:"var(--text2)",fontWeight:500,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:3}}>
                                  {og.split(" ")[0]}
                                  {kit&&<span style={{fontSize:9,color:KIT_COL[kit],fontWeight:700}}>{KIT_ICON[kit]}</span>}
                                </span>);
                              })}
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:`1px solid ${slot.renk}20`,paddingTop:6,marginTop:4}}>
                              <span style={{fontSize:10,color:"var(--text4)"}}>
                                <strong style={{color:capColor}}>{totalCap}</strong>/{maxCap} sınıfta
                                {totalCap!==cap&&<span style={{marginLeft:6,color:"var(--text5)"}}>({cap} bu slot)</span>}
                              </span>
                              <span style={{fontSize:10,fontWeight:700,color:capColor}}>{capLabel}</span>
                            </div>
                          </div>
                        );
                      })}
                      {demos.map((d,i)=>(
                        <div key={"d"+i} style={{background:"rgba(251,191,36,.08)",border:"1px solid rgba(251,191,36,.3)",borderLeft:"4px solid #fbbf24",borderRadius:12,padding:"12px 14px"}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#fbbf24",marginBottom:4}}>🎯 DEMO · {d.saat}</div>
                          <div style={{fontSize:12,color:"var(--text)",fontWeight:600}}>{d.ogrenci_adi}</div>
                          {(d.yas||d.okul)&&<div style={{fontSize:11,color:"var(--text4)",marginTop:2}}>{d.yas&&`${d.yas} yaş`}{d.yas&&d.okul&&" · "}{d.okul}</div>}
                          {d.telefon&&<a href={`tel:${d.telefon}`} style={{fontSize:11,color:"#fbbf24",textDecoration:"none",marginTop:4,display:"inline-block"}}>📞 {d.telefon}</a>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Derslik bazlı özet */}
        {allActiveGunler.length>0&&(()=>{
          // Birleştirilmiş slotlar (gün gün)
          const allMerged=allActiveGunler.flatMap(g=>mergeOverlapping(gridSlotsArr[g]||[]));
          const grup=(d)=>allMerged.filter(s=>s.derslik===d);
          const sumOgr=(d)=>grup(d).reduce((s,x)=>s+x.ogrenciler.length,0);
          return(
            <div style={{marginTop:16}} className="g4">
              {["1","2","3","4"].map(d=>{const c=d==="1"?"#00ffc8":d==="2"?"#7b61ff":d==="3"?"#ffa94d":"#f472b6";const ds=grup(d).length;const og=sumOgr(d);return(
                <div key={d} onClick={()=>setProgramDerslikF(d)} style={{background:`${c}10`,border:`1px solid ${c}30`,borderRadius:12,padding:"12px 14px",cursor:"pointer",transition:"transform .15s"}}>
                  <div style={{fontSize:11,color:"var(--text4)",fontWeight:600,textTransform:"uppercase",letterSpacing:".05em"}}>🏫 Derslik {d}</div>
                  <div style={{display:"flex",gap:14,marginTop:6,alignItems:"baseline"}}>
                    <div><span style={{fontSize:20,fontWeight:700,color:c,fontFamily:"'Space Grotesk',sans-serif"}}>{ds}</span><span style={{fontSize:10,color:"var(--text4)",marginLeft:4}}>ders</span></div>
                    <div><span style={{fontSize:20,fontWeight:700,color:c,fontFamily:"'Space Grotesk',sans-serif"}}>{og}</span><span style={{fontSize:10,color:"var(--text4)",marginLeft:4}}>öğrenci</span></div>
                  </div>
                </div>
              );})}
            </div>
          );
        })()}
      </div>)}

      {/* ══ KİT SETİ ══ */}
      {tab==="kitset"&&(<div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:"var(--text)"}}>🎒 Kit Seti Takibi</h2>
          <button className="bp" onClick={()=>exportKitTakipExcel()}>📥 Excel'e Aktar</button>
        </div>

        {/* Stok kartı */}
        <div style={{background:"var(--grad-card)",border:"1px solid var(--border)",borderRadius:14,padding:16,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,flexWrap:"wrap"}}>
            <span style={{fontSize:14,fontWeight:700,color:"var(--text)",fontFamily:"'Space Grotesk',sans-serif"}}>📦 Stok Durumu</span>
            <span style={{fontSize:11,color:"var(--text4)"}}>(Stoktaki kit sayıları — yeni öğrenciye verirsen − tuşuna bas)</span>
          </div>
          <div className="g3">
            {KITLER.map(tipi=>{
              const adet=kitStok[tipi]||0;
              const rezerve=ogrenciler.filter(o=>o.kit===tipi&&o.kit_teslim_planli&&!o.kit_alindi).length;
              const kalan=adet-rezerve;
              return(
                <div key={tipi} style={{background:`${KIT_COL[tipi]}10`,border:`1px solid ${KIT_COL[tipi]}30`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:KIT_COL[tipi]}}>{KIT_ICON[tipi]} {tipi}</div>
                    <div style={{fontSize:10,color:"var(--text4)",marginTop:2}}>
                      Stok: <strong style={{color:KIT_COL[tipi]}}>{adet}</strong>
                      {rezerve>0&&<> · Rezerve: <strong style={{color:"#fbbf24"}}>{rezerve}</strong></>}
                      {rezerve>0&&<> · Kalan: <strong style={{color:kalan<0?"#ff6b6b":"var(--text)"}}>{kalan}</strong></>}
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <button onClick={()=>updateKitStok(tipi,-1)} disabled={adet<=0} style={{width:28,height:28,borderRadius:6,border:`1px solid ${KIT_COL[tipi]}40`,background:"var(--bg4)",color:KIT_COL[tipi],cursor:adet>0?"pointer":"not-allowed",opacity:adet>0?1:.3,fontFamily:"inherit",fontWeight:700,fontSize:14,padding:0}}>−</button>
                    <span style={{minWidth:30,textAlign:"center",fontSize:18,fontWeight:800,color:KIT_COL[tipi],fontFamily:"'Space Grotesk',sans-serif"}}>{adet}</span>
                    <button onClick={()=>updateKitStok(tipi,+1)} style={{width:28,height:28,borderRadius:6,border:`1px solid ${KIT_COL[tipi]}40`,background:`${KIT_COL[tipi]}20`,color:KIT_COL[tipi],cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:14,padding:0}}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Üst istatistik kartları */}
        <div className="g4" style={{marginBottom:16}}>
          {(()=>{const sayi=(d)=>ogrenciler.filter(o=>o.kit&&o.kit_aktif!==false).filter(o=>efektifDurum(o,getKitTakip(o.id))===d).length;
            const stats=[
              {l:"Kit Sahibi",v:ogrenciler.filter(o=>o.kit&&o.kit_aktif!==false).length,c:"var(--accent)",i:"🎒"},
              {l:"Bekleyen",v:sayi("bekliyor"),c:"#a78bfa",i:"⏳"},
              {l:"Teslim Edilecek",v:sayi("teslim_edilecek"),c:"#fbbf24",i:"📦"},
              {l:"Tam · Tamir",v:sayi("tam")+sayi("tamir")+sayi("bozuk")+sayi("tamirde"),c:"#00ffc8",i:"✅"},
            ];return stats.map((s,i)=>(
              <div key={i} className="card"><div style={{fontSize:22,marginBottom:6}}>{s.i}</div><div style={{fontSize:22,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",color:s.c}}>{s.v}</div><div style={{fontSize:12,color:"var(--text4)",marginTop:2}}>{s.l}</div></div>
            ));})()}
        </div>

        {/* Filtreler */}
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:12,color:"var(--text4)",fontWeight:600}}>Durum:</span>
          {["Tümü","bekliyor","teslim_edilecek","tam","tamir","bozuk","tamirde"].map(d=>(
            <button key={d} className="bg" onClick={()=>setKitFiltre(p=>({...p,durum:d}))}
              style={{background:kitFiltre.durum===d?"linear-gradient(135deg,var(--accent),var(--accent2))":"var(--bg4)",color:kitFiltre.durum===d?"#fff":"var(--text3)",border:kitFiltre.durum===d?"none":"1px solid var(--border)",fontSize:11,padding:"5px 11px"}}>
              {d==="Tümü"?"Tümü":KIT_DURUM[d]?.l}
            </button>
          ))}
          <span style={{fontSize:12,color:"var(--text4)",marginLeft:12,fontWeight:600}}>Kit Tipi:</span>
          {["Tümü",...KITLER].map(k=>(
            <button key={k} className="bg" onClick={()=>setKitFiltre(p=>({...p,kitTipi:k}))}
              style={{background:kitFiltre.kitTipi===k?"linear-gradient(135deg,var(--accent),var(--accent2))":"var(--bg4)",color:kitFiltre.kitTipi===k?"#fff":"var(--text3)",border:kitFiltre.kitTipi===k?"none":"1px solid var(--border)",fontSize:11,padding:"5px 11px"}}>
              {k==="Tümü"?k:`${KIT_ICON[k]} ${k}`}
            </button>
          ))}
        </div>

        {/* Kit tablosu */}
        <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
            <thead><tr><th>#</th><th>Öğrenci</th><th>Kit Tipi</th><th>Teslim</th><th>Durum</th><th>Arıza Tipi</th><th>Açıklama</th><th>Güncellendi</th><th></th></tr></thead>
            <tbody>
              {(()=>{
                const list=ogrenciler.filter(o=>o.kit&&o.kit_aktif!==false).filter(o=>{
                  const k=getKitTakip(o.id);const d=efektifDurum(o,k);
                  if(kitFiltre.durum!=="Tümü"&&d!==kitFiltre.durum)return false;
                  if(kitFiltre.kitTipi!=="Tümü"&&o.kit!==kitFiltre.kitTipi)return false;
                  return true;
                });
                if(!list.length)return<tr><td colSpan={9} style={{textAlign:"center",padding:40,color:"var(--text4)"}}>Kayıt yok</td></tr>;
                return list.map((o,i)=>{
                  const k=getKitTakip(o.id);const durum=efektifDurum(o,k);const cfg=KIT_DURUM[durum];
                  return(<tr key={o.id} className="rh">
                    <td style={{color:"var(--text5)",fontSize:11}}>{i+1}</td>
                    <td style={{fontWeight:600,color:"var(--text)"}}>{o.ad}</td>
                    <td><span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:6,background:`${KIT_COL[o.kit]}15`,color:KIT_COL[o.kit],border:`1px solid ${KIT_COL[o.kit]}35`,whiteSpace:"nowrap"}}>{KIT_ICON[o.kit]} {o.kit}</span></td>
                    <td>{o.kit_alindi?<span style={{fontSize:11,fontWeight:700,color:"#00ffc8"}}>✅ Alındı</span>:<span style={{fontSize:11,fontWeight:600,color:"#ffa94d"}}>⏳ Bekliyor</span>}</td>
                    <td>
                      {!o.kit_alindi?(
                        <button onClick={()=>toggleTeslimPlanli(o)}
                          title={o.kit_teslim_planli?`Tıkla: Bekliyor'a al (stoğa +1 ${o.kit} dön)`:`Tıkla: Stoktan teslim edilecek (kalan stok: ${kitStok[o.kit]||0})`}
                          style={{padding:"4px 10px",fontSize:11,borderRadius:8,background:cfg.bg,border:`1px solid ${cfg.b}`,color:cfg.c,fontWeight:700,whiteSpace:"nowrap",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>
                          {cfg.l}<span style={{fontSize:8,opacity:.7}}>▾</span>
                        </button>
                      ):(
                        <select className="sel" style={{padding:"4px 8px",fontSize:11,width:"auto",minWidth:140,background:cfg.bg,border:`1px solid ${cfg.b}`,color:cfg.c,fontWeight:700}} value={durum} onChange={e=>upsertKitTakip(o.id,{durum:e.target.value})}>
                          {Object.entries(KIT_DURUM).filter(([v])=>!["bekliyor","teslim_edilecek"].includes(v)).map(([v,d])=><option key={v} value={v}>{d.l}</option>)}
                        </select>
                      )}
                    </td>
                    <td>
                      <select className="sel" style={{padding:"4px 8px",fontSize:11,width:"auto",minWidth:130}} value={k?.ariza_tipi||""} onChange={e=>upsertKitTakip(o.id,{ariza_tipi:e.target.value,durum:durum==="tam"&&e.target.value?"tamir":(k?.durum||"tam")})}>
                        <option value="">— Yok —</option>
                        {ARIZA_TIPLERI.map(a=><option key={a} value={a}>{a}</option>)}
                      </select>
                    </td>
                    <td>
                      <input className="inp" style={{padding:"4px 8px",fontSize:12,minWidth:180}} placeholder="Detay..." defaultValue={k?.aciklama||""} onBlur={e=>{if(e.target.value!==(k?.aciklama||""))upsertKitTakip(o.id,{aciklama:e.target.value});}}/>
                    </td>
                    <td style={{fontSize:11,color:"var(--text4)"}}>{k?.updated_at?new Date(k.updated_at).toLocaleDateString("tr-TR"):"—"}</td>
                    <td><button onClick={()=>updateField(o,{kit_aktif:false},`🚫 ${o.ad} pasife alındı`)} title="Kit takibinden çıkar" style={{background:"rgba(107,114,128,.12)",border:"1px solid rgba(107,114,128,.3)",borderRadius:8,padding:"4px 9px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:11,color:"var(--text3)",whiteSpace:"nowrap"}}>🚫 Pasif</button></td>
                  </tr>);
                });
              })()}
            </tbody>
          </table>
        </div>

        {/* Pasif liste */}
        {(()=>{const pasifList=ogrenciler.filter(o=>o.kit_aktif===false);if(!pasifList.length)return null;return(
          <div style={{marginTop:20,background:"rgba(107,114,128,.05)",border:"1px solid rgba(107,114,128,.2)",borderRadius:12,padding:16}}>
            <h3 style={{fontSize:14,fontWeight:700,color:"var(--text3)",marginBottom:12,fontFamily:"'Space Grotesk',sans-serif"}}>🚫 Pasif Öğrenciler — Kit Verilmiyor ({pasifList.length})</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {pasifList.map(o=>(
                <div key={o.id} style={{background:"var(--bg4)",border:"1px solid var(--border)",borderRadius:10,padding:"6px 10px",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,fontWeight:600,color:"var(--text2)"}}>{o.ad}</span>
                  {o.kit&&<span style={{fontSize:10,color:"var(--text4)"}}>({KIT_ICON[o.kit]} {o.kit})</span>}
                  <button onClick={()=>updateField(o,{kit_aktif:true},`✅ ${o.ad} tekrar aktif`)} title="Tekrar aktif yap" style={{background:"rgba(0,255,200,.12)",border:"1px solid rgba(0,255,200,.3)",borderRadius:6,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:10,color:"#00ffc8"}}>↺ Aktif</button>
                </div>
              ))}
            </div>
          </div>
        );})()}

        <div style={{marginTop:14,padding:"10px 14px",background:"rgba(96,165,250,.06)",border:"1px solid rgba(96,165,250,.2)",borderRadius:10,fontSize:12,color:"#60a5fa"}}>
          💡 Açıklama alanına yazıp dışına tıklayınca otomatik kaydedilir. Arıza tipi seçilince durum otomatik "Tamir Gerekli"ye döner. Kit verilmiyorsa <strong>🚫 Pasif</strong> yapın — listeden gizlenir.
        </div>
      </div>)}

                                                {/* ══ DEMO ══ */}
      {tab==="demo"&&(<div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:700}}>🎯 Demo Dersler</h2><button className="bp" style={{marginLeft:"auto"}} onClick={()=>setModal("demo")}>+ Yeni Demo</button></div>
        <div className="card" style={{marginBottom:16}}>
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:16,color:"#fbbf24"}}>📅 Planlanmış ({bugunDemo.length})</h3>
          {demoLoading?<div style={{color:"var(--text4)",fontSize:13}}>Yükleniyor...</div>:bugunDemo.length===0?<p style={{color:"var(--text4)",fontSize:13}}>Planlanmış demo yok.</p>:(<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}><thead><tr><th>Tarih</th><th>Saat</th><th>Öğrenci</th><th>Yaş</th><th>Okul</th><th>Veli</th><th>İletişim</th><th>Durum</th><th>Sil</th></tr></thead><tbody>{bugunDemo.map((d,i)=>(<tr key={d.id} className="rh"><td style={{fontSize:12,color:"var(--text3)",fontWeight:600}}>{fmtFull(d.tarih)}</td><td style={{fontSize:13,fontWeight:700,color:"#fbbf24"}}>{d.saat}</td><td style={{fontWeight:600}}>{d.ogrenci_adi}</td><td style={{fontSize:12,color:"var(--text3)"}}>{d.yas||"—"}</td><td style={{fontSize:12,color:"var(--text3)"}}>{d.okul||"—"}</td><td style={{fontSize:12}}>{d.veli_adi||"—"}</td><td><div style={{display:"flex",gap:5}}>{d.telefon&&<a href={`tel:${d.telefon}`} style={{fontSize:15,textDecoration:"none"}}>📞</a>}{d.telefon&&<a href={`https://wa.me/${normTel(d.telefon)}?text=${encodeURIComponent("Merhaba! ROBOGPT Robotik Kurs demo dersi için sizi bekliyoruz. 🤖")}`} target="_blank" rel="noreferrer" style={{fontSize:15,textDecoration:"none"}}>💬</a>}{d.email&&<a href={`mailto:${d.email}`} style={{fontSize:15,textDecoration:"none"}}>✉️</a>}</div></td><td><select className="sel" style={{padding:"4px 8px",fontSize:11,width:"auto"}} value={d.durum||"planli"} onChange={e=>updDemoStatus(d.id,e.target.value)}><option value="planli">📅 Planlandı</option><option value="geldi">✅ Geldi</option><option value="kayit">🎉 Kayıt Oldu</option><option value="gelmedi">❌ Gelmedi</option><option value="iptal">🚫 İptal</option></select></td><td><button className="bd" onClick={()=>setDelD(d)}>🗑️</button></td></tr>))}</tbody></table></div>)}
        </div>
        <div className="card">
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:16,color:"var(--text3)"}}>📜 Geçmiş Demolar ({gecmisDemolar.length})</h3>
          {gecmisDemolar.length===0?<p style={{color:"var(--text4)",fontSize:13}}>Henüz geçmiş demo yok.</p>:(<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:650}}><thead><tr><th>Tarih</th><th>Saat</th><th>Öğrenci</th><th>Yaş</th><th>Okul</th><th>Veli</th><th>Sonuç</th></tr></thead><tbody>{gecmisDemolar.map((d,i)=>{const sc={"geldi":"#00ffc8","kayit":"#7b61ff","gelmedi":"#ff6b6b","iptal":"#6b7280","planli":"#fbbf24"};const sl={"geldi":"✅ Geldi","kayit":"🎉 Kayıt","gelmedi":"❌ Gelmedi","iptal":"🚫 İptal","planli":"📅 Planlandı"};return(<tr key={d.id} className="rh"><td style={{fontSize:12,color:"var(--text3)"}}>{fmtFull(d.tarih)}</td><td style={{fontSize:12,color:"var(--text3)"}}>{d.saat}</td><td style={{fontWeight:500}}>{d.ogrenci_adi}</td><td style={{fontSize:12,color:"var(--text3)"}}>{d.yas||"—"}</td><td style={{fontSize:12,color:"var(--text3)"}}>{d.okul||"—"}</td><td style={{fontSize:12}}>{d.veli_adi||"—"}</td><td><span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:6,background:`${sc[d.durum||"planli"]}18`,color:sc[d.durum||"planli"],border:`1px solid ${sc[d.durum||"planli"]}40`}}>{sl[d.durum||"planli"]}</span></td></tr>);})}</tbody></table></div>)}
        </div>
      </div>)}

      {/* ══ MUHASEBE ══ */}
      {tab==="muhasebe"&&(<div>
        <div className="g4" style={{marginBottom:16}}>{[
  {l:`${buAyAdi} Gelir`,v:buAyGelirHam.toLocaleString("tr")+"₺",c:"#00ffc8",i:"📥",sub:`Toplam: ${topGelir.toLocaleString("tr")}₺`},
  {l:`${buAyAdi} Gider`,v:buAyGider.toLocaleString("tr")+"₺",c:"#ff6b6b",i:"📤",sub:`Toplam: ${topGider.toLocaleString("tr")}₺`},
  {l:`${buAyAdi} Net Kâr`,v:(buAyGelirHam-buAyGider).toLocaleString("tr")+"₺",c:"#7b61ff",i:"💰",sub:`Toplam: ${(topGelir-topGider).toLocaleString("tr")}₺`},
  {l:"Genel Kâr Marjı",v:topGelir>0?`%${Math.round((topGelir-topGider)/topGelir*100)}`:"—",c:"#ffa94d",i:"📊",sub:"Tüm zamanlar"},
].map((s,i)=>(<div key={i} className="card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:20}}>{s.i}</span><span style={{fontSize:9,color:s.c,background:`${s.c}15`,border:`1px solid ${s.c}30`,borderRadius:5,padding:"1px 6px",fontWeight:600}}>BU AY</span></div><div style={{fontSize:19,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",color:s.c}}>{s.v}</div><div style={{fontSize:12,color:"var(--text4)",marginTop:2}}>{s.l}</div><div style={{fontSize:10,color:"var(--text5)",marginTop:2}}>{s.sub}</div></div>))}</div>
        <div className="g2" style={{marginBottom:16}}><div className="card"><h3 style={{fontSize:14,fontWeight:700,marginBottom:16,color:"#ff6b6b"}}>📤 Gider Dağılımı</h3><PieChart data={pieGider}/></div><div className="card"><h3 style={{fontSize:14,fontWeight:700,marginBottom:16,color:"#00ffc8"}}>📥 Gelir Dağılımı</h3><PieChart data={pieGelir}/></div></div>
        <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,padding:16,marginBottom:14}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{display:"flex",gap:4}}>{["tümü","gelir","gider"].map(t=>(<button key={t} className="bg" onClick={()=>{setMuhTip(t);setMuhKat("Tümü");}} style={{background:muhTip===t?"linear-gradient(135deg,#00ffc8,#00d4ff)":"#1a1f2e",color:muhTip===t?"#0a0d14":"#9ca3af",border:muhTip===t?"none":"1px solid #1e2940",fontSize:12,padding:"7px 12px"}}>{t==="tümü"?"🔀 Tümü":t==="gelir"?"📥 Gelir":"📤 Gider"}</button>))}</div>
            <select className="sel" style={{maxWidth:140,padding:"8px 12px",fontSize:12}} value={muhKat} onChange={e=>setMuhKat(e.target.value)}>{allKatlar.map(k=><option key={k}>{k}</option>)}</select>
            <select className="sel" style={{maxWidth:180,padding:"8px 12px",fontSize:12}} value={muhAy} onChange={e=>setMuhAy(e.target.value)}>{aylar.map(a=><option key={a} value={a}>{a==="Tümü"?"📅 Tüm Aylar":fmtAy(a+"-01")}</option>)}</select>
            <span style={{color:"var(--text4)",fontSize:12}}>{muhFiltered.length} kayıt</span>
            {muhAy!=="Tümü"&&<div style={{display:"flex",gap:10}}><span style={{fontSize:12,color:"#00ffc8",fontWeight:600}}>Gelir: {filtGelir.toLocaleString("tr")}₺</span><span style={{fontSize:12,color:"#ff6b6b",fontWeight:600}}>Gider: {filtGider.toLocaleString("tr")}₺</span><span style={{fontSize:12,color:"#7b61ff",fontWeight:700}}>Net: {(filtGelir-filtGider).toLocaleString("tr")}₺</span></div>}
            <button className="bp" style={{marginLeft:"auto"}} onClick={()=>setModal("muh")}>+ Yeni</button>
          </div>
        </div>
        {muhLoading?<div style={{textAlign:"center",padding:40,color:"var(--text4)"}}>Yükleniyor...</div>:(<div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:560}}><thead><tr><th>Tür</th><th>Kategori</th><th>Açıklama</th><th>Tarih</th><th>Tutar</th><th></th></tr></thead><tbody>{muhFiltered.length===0&&<tr><td colSpan={6} style={{textAlign:"center",padding:30,color:"var(--text4)"}}>Kayıt yok</td></tr>}{muhFiltered.map((m,i)=>(<tr key={m.id} className="rh"><td><span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:6,background:m.tip==="gelir"?"rgba(0,255,200,.15)":"rgba(255,107,107,.15)",color:m.tip==="gelir"?"#00ffc8":"#ff6b6b",border:`1px solid ${m.tip==="gelir"?"rgba(0,255,200,.3)":"rgba(255,107,107,.3)"}`}}>{m.tip==="gelir"?"📥":"📤"}</span></td><td><span style={{fontSize:11,color:CAT_COL[m.kategori]||"#9ca3af",background:`${CAT_COL[m.kategori]||"#9ca3af"}18`,padding:"2px 8px",borderRadius:5,fontWeight:600}}>{m.kategori}</span></td><td style={{fontWeight:500,fontSize:13}}>{m.aciklama}</td><td style={{fontSize:12,color:"var(--text4)"}}>{m.tarih?new Date(m.tarih).toLocaleDateString("tr-TR"):"-"}</td><td style={{fontWeight:700,color:m.tip==="gelir"?"#00ffc8":"#ff6b6b",fontFamily:"'Space Grotesk',sans-serif"}}>{(m.tutar||0).toLocaleString("tr")}₺</td><td><button className="bd" onClick={()=>setDelM(m)}>🗑️</button></td></tr>))}</tbody></table></div>)}
      </div>)}
    </div>

    {yeniEgitmenModal&&<Modal title="👨‍🏫 Eğitmenler" onClose={()=>setYeniEgitmenModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:"rgba(251,146,60,.06)",border:"1px solid rgba(251,146,60,.25)",borderRadius:10,padding:12,fontSize:12,color:"var(--accent)"}}>
          💡 Eğitmen ekledikten sonra programdaki sınıflara atayabilirsin. Bir eğitmeni silersen, atamaları otomatik kalkar.
        </div>
        <div>
          <label className="lbl">Yeni Eğitmen Adı</label>
          <div style={{display:"flex",gap:8}}>
            <input className="inp" placeholder="Ör: Murat" id="yeniEgInput" onKeyDown={e=>{if(e.key==="Enter"){const v=e.target.value;if(v.trim()){yeniEgitmen(v);e.target.value="";}}}}/>
            <button className="bp" onClick={()=>{const inp=document.getElementById("yeniEgInput");if(inp.value.trim()){yeniEgitmen(inp.value);inp.value="";}}}>+ Ekle</button>
          </div>
        </div>
        <div>
          <label className="lbl">Mevcut Eğitmenler ({egitmenler.length})</label>
          {egitmenler.length===0?<div style={{color:"var(--text4)",fontSize:13,padding:12}}>Henüz eğitmen yok.</div>:(
            <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:300,overflowY:"auto"}}>
              {egitmenler.map(e=>(
                <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:`${e.renk}10`,border:`1px solid ${e.renk}30`,borderRadius:10}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:e.renk}}/>
                  <span style={{flex:1,fontSize:14,fontWeight:600,color:"var(--text)"}}>{e.ad}</span>
                  <span style={{fontSize:11,color:"var(--text4)"}}>{sinifEgitmen.filter(s=>s.egitmen_id===e.id).length} sınıf</span>
                  <button onClick={()=>{if(confirm(`${e.ad} silinsin mi?`))silEgitmen(e.id);}} className="bd">🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>}
    {modal==="add"&&<Modal title="➕ Yeni Öğrenci" onClose={()=>setModal(null)} wide><OgrenciForm onSave={addO} onCancel={()=>setModal(null)} saving={saving}/></Modal>}
    {modal?.edit&&<Modal title="✏️ Düzenle" onClose={()=>setModal(null)} wide><OgrenciForm initial={modal.edit} onSave={updO} onCancel={()=>setModal(null)} saving={saving}/></Modal>}
    {modal==="muh"&&<Modal title="➕ Muhasebe Kaydı" onClose={()=>setModal(null)}><MuhasebForm onSave={addMuh} onCancel={()=>setModal(null)} saving={saving}/></Modal>}
    {modal==="demo"&&<Modal title="🎯 Yeni Demo" onClose={()=>setModal(null)}><DemoForm onSave={addDemo} onCancel={()=>setModal(null)} saving={saving}/></Modal>}
    {delC&&(<Modal title="🗑️ Sil" onClose={()=>setDelC(null)}><p style={{fontSize:14,marginBottom:20}}><strong style={{color:"#ff6b6b"}}>{delC.ad}</strong> silinsin mi?</p><div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button className="bg" onClick={()=>setDelC(null)}>İptal</button><button className="bd" style={{padding:"9px 18px"}} onClick={()=>delO(delC.id)}>Evet</button></div></Modal>)}
    {delM&&(<Modal title="🗑️ Kaydı Sil" onClose={()=>setDelM(null)}><p style={{fontSize:14,marginBottom:20}}><strong style={{color:"#ff6b6b"}}>{delM.aciklama}</strong> silinsin mi?</p><div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button className="bg" onClick={()=>setDelM(null)}>İptal</button><button className="bd" style={{padding:"9px 18px"}} onClick={()=>delMuh(delM.id)}>Evet</button></div></Modal>)}
    {delD&&(<Modal title="🗑️ Demo Sil" onClose={()=>setDelD(null)}><p style={{fontSize:14,marginBottom:20}}><strong style={{color:"#ff6b6b"}}>{delD.ogrenci_adi}</strong> silinsin mi?</p><div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button className="bg" onClick={()=>setDelD(null)}>İptal</button><button className="bd" style={{padding:"9px 18px"}} onClick={()=>delDemo(delD.id)}>Evet</button></div></Modal>)}
  </div>);
}