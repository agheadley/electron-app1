import * as csv from './csv'

// 'blank' data for initial use - change in settings.

let initialSettings={
    name:"timetable1",
    years:['13','12','11','10'],
    weeks:['A'],
    blocks:[
        {block:'A',color:"#eeeeee"},
        {block:'B',color:"#eeeeee"},
        {block:'C',color:"#eeeeee"},
    ],
    lessons:[
        {day:'M',period:'1',id:1,week:'A',block:'A'},
        {day:'M',period:'2',id:2,week:'A',block:'B'},
        {day:'M',period:'3',id:3,week:'A',block:'C'},
        
    ],
    subjects:[
        {dept:"ENG",sub:"E"},
        {dept:"ENG",sub:"Eli"},
        {dept:"MAT",sub:"M"},
        {dept:"CHE",sub:"C"},
    ],
    rooms:[
        {dept:"ENG",room:"E1"},
        {dept:"ENG",room:"E2"},
        {dept:"MAT",room:"M1"},
        {dept:"CHE",room:"C1"},
    ],
};



    
    


let readTimetableStructure=(csvText) =>{
    let arr=csv.CSVToArray(csvText,",");
    let error='';
    console.log('settings.js : readTimetableStructure()');
    //console.log(arr);
    let headers=Object.keys(initialSettings.lessons[0]);
    headers=headers.map(el=>({key:el,index:null}));
    //console.log(headers);
    let row0=arr[0].map(el=>(' '+el).toLowerCase().trim());
    //console.log(row0);
    for(let item of headers) {
        item.index=row0.indexOf(item.key);
        if(item.index===-1) error+='invalid column names, ';
    }
    //console.log(headers);
    
    let data=[];
    for(let i=1;i<arr.length;i++) {
        let obj={};
        for(let item of headers) {
            obj[item.key]=(arr[i][item.index]+" ").trim();
            if(item.key!=='block' && obj[item.key]==='') error+='missing value '+item[key]+' row:'+i+", ";
        } 
        if(error==="") data.push(obj);
        
    }
    console.log("data: "+data);
    console.log("recorded errors: "+error);

    if(error==="") return data;
    else return "error";

    
}

export {readTimetableStructure,initialSettings}


