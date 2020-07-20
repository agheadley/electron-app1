import * as csv from './csv'

// timetable structure headers
let TTStructureHeaderArr=['day','per','week','id','block','visible'];

// year groups
let years=['7','6','5','4','3','2','1','0','X'];



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

export {readTimetableStructure}

let processTimetableStructure=(data,headers)=> {
    let structure={isValid:true,weeks:[],blocks:[],data:[]};

    
    
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
    structure.block=[... new Set(data.map(el=>el.block))];

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