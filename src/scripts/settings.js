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


// timetable structure headers
let TTStructureHeaderArr=['day','per','week','id','block','visible'];

// year groups
let schoolYears=[
    {NCYear:"13",SchoolCode:"13"},
    {NCYear:"12",SchoolCode:"12"},
    {NCYear:"11",SchoolCode:"11"},
    {NCYear:"10",SchoolCode:"10"},
    {NCYear:"9",SchoolCode:"9"},
    {NCYear:"8",SchoolCode:"8"},
    {NCYear:"7",SchoolCode:"7"},
    {NCYear:"6",SchoolCode:"6"},
    {NCYear:"Special1",SchoolCode:"X"},
    {NCYear:"Special2",SchoolCode:""},
    {NCYear:"Special3",SchoolCode:""},
    {NCYear:"Special4",SchoolCode:""},
 
];

    
    


let readTimetableStructure=(csvText,delim) =>{
    //console.log('csv.readCSV ...');

    let arr=csv.CSVToArray(csvText,delim);
    //console.log(arr);
    
    let data=[];
    //let out={isOK:false,data:[]};
    if(arr.length>1) {
        let headers=arr[0];
        console.log('headers',headers);
        for(let i=1;i<arr.length;i++) {
            let obj={};
            for(let j=0;j<headers.length;j++) {
                obj[(headers[j]+' ').trim().toLowerCase()]=arr[i][j];
            }
            data.push(obj);
        }
        console.log(data);
        let out=processTimetableStructure(data,headers);
        return out;
    } else {
        return {isValid:false};
    }
    
}

let checkValidYears=(years)=> {
     //console.log(years);
      let isValid=true;
      for(let item of years) {
        let txt=(' '+item.SchoolCode).trim();
        txt=txt.replace(/ /g, "");
        if(txt.length>2) isValid=false;
      }

      let tmp1=[... new Set(years.map(el=>el.SchoolCode))];
      tmp1=tmp1.filter(el=>el!== '');
      let tmp2=years.map(el=>el.SchoolCode);
      tmp2=tmp2.filter(el=>el!== '');
      //console.log(tmp1,tmp2);
      if(tmp1.length!==tmp2.length) isValid=false;
      //console.log(isValid);
      return isValid;

}

export {readTimetableStructure,schoolYears,checkValidYears,initialSettings}



let processTimetableStructure=(data,headers)=> {
    let structure={isValid:true,displayHeaders:['id','title','week','block'],weeks:[],blocks:[],data:[]};

    
    
    let isSingleWeek=false;

    structure.weeks=[... new Set(data.map(el=>el.week))];
    
    console.log(structure.weeks,structure.weeks.length,structure.weeks.indexOf(''));
    if(structure.weeks.length===1) {
        console.log("found only one week type, setting all to week 'A'");
        isSingleWeek=true;
    } else if(structure.weeks.indexOf('')!==-1 && structure.weeks.length>-1) {
        structure.isValid=false;
        console.log("error,found unlabelled week entries.");
    }

    

    structure.blocks=[... new Set(data.map(el=>el.block))];
    structure.blocks=structure.blocks.filter(el => el !== '');
    structure.blocks.sort();
    

    for(let item of data) {
        let obj={id:null,title:null,block:null,week:null,class:' ',staff:" ",room:" "};
        if(item.visible==="YES") { 
            obj.id=item.id;
            obj.block=item.block;
            obj.week=isSingleWeek ? "A" : item.week;
            obj.title=item.day+item.per;
            structure.data.push(obj);
        }
    }

    if(!checkHeaders(headers)) {
        console.log('invalid headers');
        structure.isValid=false;
    }

    return structure;

};

let checkHeaders=(headers)=>{
    console.log(headers);
    let out=true;
    for(let item of headers) {
        item=(item+' ').trim().toLowerCase();
        if(TTStructureHeaderArr.indexOf(item)===-1) out=false;
        console.log(item,TTStructureHeaderArr.indexOf(item));
    }
    return out;
    
    
}