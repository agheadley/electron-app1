// timetable structure headers
let TTStructureHeaderArr=['day','per','week','id','block','visible'];

// year groups
let years=['7','6','5','4','3','2','1','0','X'];



let readCSV=(csvText,delim) =>{
    //console.log('csv.readCSV ...');

    let arr=CSVToArray(csvText,delim);
    //console.log(arr);
    
    let out={isOK:false,data:[]};
    if(arr.length>1) {
        let headers=arr[0];
        console.log('headers',headers);
        for(let i=1;i<arr.length;i++) {
            let obj={};
            for(let j=0;j<headers.length;j++) {
                obj[(headers[j]+' ').trim().toLowerCase()]=arr[i][j];
            }
            out.data.push(obj);
        }
        out.isOK=checkHeaders(headers);
    }
    //console.log(out.isOK,out.data);
    //console.log('scripts/csv.js isOK :'+out.isOK);
    return out;
}

export {readCSV}

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

// ref: http://stackoverflow.com/a/1293163/2343
    // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }