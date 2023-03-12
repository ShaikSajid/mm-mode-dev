import express from 'express'
import axios  from 'axios';
import fs from 'fs';

const app = express();
app.get("/api/categories", (req,res)=>{

    const prepareResponse={categories:[
        {title:"Prayer Times Silent", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/p-time-silent.png?alt=media&token=745072f5-a643-4b96-87b9-9945a9cadfde"},
        {title:"Audio Quran", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/audio-quran.png?alt=media&token=0c51d220-ddb1-4095-906d-e61c821865ba"},
        {title:"All Language Quran", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/all-lang-quran.png?alt=media&token=29e3d3a8-3224-474a-8f86-a2be2f204c84"},
        {title:"99 Names of Allah", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/99-names.png?alt=media&token=5b556ac2-ed4b-4276-b362-03937fe28c59"},
        {title:"Duas", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/duas.png?alt=media&token=da941575-1879-477f-82cd-03084e309376"},
        {title:"Tasbih", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/zikar.png?alt=media&token=d59ac6a1-139e-413a-97e1-f88a3668b716"},
        {title:"Islamic Gallery", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/gallery.png?alt=media&token=2fd5fdd7-9890-4a42-949f-a2f72f6abac7"},
        {title:"Masjid Nearby", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/nearest-masjid.png?alt=media&token=c15f07c5-4528-4469-b403-2d0ab637d5b3"},
        {title:"Qibla Direction", image:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/quran.png?alt=media&token=19fe3db2-67fb-4142-9107-9c993faf8c05"},
    ]}
res.json(prepareResponse);
});

app.get("/api/duas", (req,res)=>{

    const prepareResponse={duas:[
        {category:"Sleep", subCat:[{title:"Before Sleep", audio:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/dua-before-sleeping.mp3?alt=media&token=327a64d5-4716-442b-90b7-eb770fa8fc1a", images:["https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836152.jpg?alt=media&token=6c189592-b6de-42e6-895d-8a1521d72e5f","https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836152.jpg?alt=media&token=6c189592-b6de-42e6-895d-8a1521d72e5f"]},{title:"After Awake", audio:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/dua-after-waking-up-from-sleep.mp3?alt=media&token=4143710b-10c8-41fb-a69c-34bf855d2137", images:["https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836151.jpg?alt=media&token=d19d84fc-a713-454f-9de4-897a6ab27ed5","https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836151.jpg?alt=media&token=d19d84fc-a713-454f-9de4-897a6ab27ed5"]}]},
        {category:"Ramzan", subCat:[{title:"Sahri", audio:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/dua-before-sleeping.mp3?alt=media&token=327a64d5-4716-442b-90b7-eb770fa8fc1a", images:["https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836152.jpg?alt=media&token=6c189592-b6de-42e6-895d-8a1521d72e5f","https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836152.jpg?alt=media&token=6c189592-b6de-42e6-895d-8a1521d72e5f"]},{title:"Iftar", audio:"https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/dua-after-waking-up-from-sleep.mp3?alt=media&token=4143710b-10c8-41fb-a69c-34bf855d2137", images:["https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836151.jpg?alt=media&token=d19d84fc-a713-454f-9de4-897a6ab27ed5","https://firebasestorage.googleapis.com/v0/b/masjid-mode-data.appspot.com/o/27836151.jpg?alt=media&token=d19d84fc-a713-454f-9de4-897a6ab27ed5"]}]},
        
    ]}
res.json(prepareResponse);
});


app.get("/api/ramdan-timings", async(req,res)=>{
    let dates = ["2023/3","2023/4"];
    let longitude= req.query.longitude;
    let latitude = req.query.latitude;
    var data = [], a,i;

    let request = dates.map((date)=>
     axios.get(`https://api.aladhan.com/v1/calendar/${date}?latitude=${latitude}&longitude=${longitude}&method=1`)
    );


    let response = await Promise.all(request);
let firstmonth = response[0].data.data.slice(21,31);
let secondmonth = response[1].data.data.slice(0,20);
let allData = [...firstmonth,...secondmonth];
(function(){
    

    for(i=0; i<allData.length; i++){
        let day=allData[i].date.readable.split(" ");
        let fajr= allData[i].timings.Fajr.replace("(IST)","").trim();
        //let fajr= allData[i].timings.Fajr.replace("(IST)","").trim().split(":");
       // let fajrHours=fajr[0];
        //let fajrMinutes = fajr[1];
        // if(fajr[1] && fajrMinutes>=10){
        //     fajrMinutes = fajrMinutes - 10;
        //     fajrMinutes = ('0' + fajrMinutes).slice(-2); 
        // }
        // else{
        //     let supstractMins = 10 - fajrMinutes;
        //     fajrHours = fajrHours-1;
        //     fajrMinutes = 60 - supstractMins;
        //     fajrHours = ('0' + fajrHours).slice(-2);
        // }
        let maghrib=allData[i].timings.Maghrib.replace("(IST)","").trim().split(":");
         a = {};
         a['No'] =i+1;
         a['Day'] =allData[i].date.gregorian.weekday.en.split('').slice(0,3).join('');
         a['Date'] = day[0]+"-"+day[1];
         a['Sehri'] = fajr;
         let hrs = maghrib[0]-12;
         a['Iftar'] =  ('0' +hrs ).slice(-2)+":"+maghrib[1];
        data.push(a);
}

})();
let prepareResponse = {ramadanYear:"Ramadan 1444",ramadanTiming: data}
res.json(prepareResponse);
});


app.get('/api/festival-list',(req,res)=>{
    let prepareResponse = {
festivalList:[
{name:"Shab E Meraj", images:["",""]},
{name:"Shab E Barath", images:["",""]},
{name:"Ramadan", images:["",""]},
{name:"Laylat al Qadr", images:["",""]},
{name:"Eid-al-Fitr", images:["",""]},
{name:"Eid-al-Adha (Bakrid)", images:["",""]},
{name:"Muharram - Islamic New Year", images:["",""]},
{name:"Day of Ashura / Muharram", images:["",""]},
{name:"Milad un Nabi", images:["",""]},
{name:"Good Morning", images:["",""]},
{name:"Good Afternoon", images:["",""]},
{name:"Good Evening", images:["",""]},
{name:"Good Night", images:["",""]},
{name:"Juma Mubarak", images:["",""]},

]
    }

    res.json(prepareResponse);
});

app.get('/api/all-duas', (req, res)=>{
var obj;
fs.readFile('./duasList.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  res.send(obj);
});

});

app.get('/api/all-qurans', (req, res)=>{
    var obj;
    fs.readFile('./quransList.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(obj);
    });
    
    });





app.listen(3060, ()=>{console.log("app listening at 3060")});
