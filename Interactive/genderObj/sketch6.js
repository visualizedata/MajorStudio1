var table;
var tableA; ////array
var groupedByType; ////artwork material object
var groupedByName;  ////artist name
var groupedByYear;
var groupByObjType;
var sorted = [];
var mapped;
var typeGrp = [];
var category;
var femaleObj;
var eachType = {};

var yrFemTotals = [];
var barTotals =[];
var yrMaleTotals = [];
var barTotals2 =[];

var female;
var male;

var FemaleTotal = [];
var TotalFemale = [];
var TotalMale = [];
// ["glass": {fem : 10, male: 200, totalfiltered: 210}]


var allYears = [];

var minDate, maxDate, name, gender, date, type;


var margin = 80;

function collate(array, prop){
    return array.reduce(function(groups, item){
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

   function preload(){
   // table = loadTable('assets/ModContGenderfinalgosort.csv','csv','header');  /////secondary sort gender, classification
   table = loadTable('assets/ModContGenderfinalgnoysort.csv','csv','header'); /////four sort gender, Artist Alpha Sort, classification, year
   console.log(table);

  }

    function setup(){
    canvas = createCanvas(1200, 800);
    canvas.parent("#c2");
    analyzeData();
    categorize();
    lineChart();
    handleDataLoad();
    // barChart();
    noLoop();
  }


////group by type classification & gender, then by name

  function analyzeData(){
    gender = table.getColumn(10);  ////gender
    name = table.getColumn(12); ////name, Artist Alpha Sort
    date = table.getColumn(17); ////object begin date
    type = table.getColumn(22); ////classification
  
    tableA = table.getArray(); 
   
    var female = table.findRows('f', 10); /////2027 rows with a FEMALE artist 
    // console.log(female);

    var male = table.findRows('m', 10);  /////10829 rows with a MALE artist
    // console.log(male);

//=======  group sort by artist by object type
    groupedByName = collate(tableA,12);  ////name, Artist Alpha Sort with array of artworks by artist
    // console.log(groupedByName);

    //=======  group sort by objectbegin date
    groupedByYear = collate(tableA,17);  ////name, Artist Alpha Sort with array of artworks by artist
    console.log(groupedByYear);

/////group same items together using reduce function   
 ///object, artist alpha sort is keys, reduce into arrays same item 
    var tableAkeys = Object.keys(groupedByName);  
    console.log(tableAkeys.length);  ////3564 names, Artist Alpha Sort

////iterate through object by keys and select artist names 
    for(var j=0; j<tableAkeys.length; j++){
      sorted[tableAkeys[j]] = collate(groupedByName[tableAkeys[j]], 12)
    }
    // console.log(tableAkeys); //returns array of object keys (glass, sculpture etc)


//=================== classification object type
   var groupedByType = collate(tableA,22);  ////classification
    console.log(groupedByType);
    // groupByObjType.push(groupedByType);

////object, type (classification) is keys 
    var tableAkeys = Object.keys(groupedByType);

    console.log(tableAkeys.length);  ////105 types
    // console.log(tableAkeys); //returns array of object keys (glass, sculpture etc)

////iterate through object by keys and SPLITS object into 105 objects 
////TRY ordering by largest array to smallest, selecting if gender is female
/////This separates each - need slice.sort() to order??
    var tableAkeys1;
    for(var s=0; s<tableAkeys.length; s++){
      sort[tableAkeys[s]] = collate(groupedByType[tableAkeys[s]], 22)
////DOESN't DO LARGEST TO SMALLEST
      console.log(sort[tableAkeys[s]]);
      console.log(tableAkeys[s]);
      // tableAkeys1.slice().sort()=sort[tableAkeys[s]];
    }
    ////NOT WORKING
      // tableAkeys1.slice().sort()=sort[tableAkeys[s]];
      // console.log(tableAkeys1[s]);

      // if(tableAkeys[s].includes("f")){    ////selecting by gender not working
      //   return femaleObj

      // }
      // console.log(femaleObj); ///105 separate objects
    // }
}

////NOT working, list of classifications - map object holds key value pairs
function categorize(){
  var groupedByTypeA;
  var category;
  var groupedByType = collate(tableA,22);
  console.log(groupedByType);
  
  groupedByTypeA = Object.keys(groupedByType);
  console.log(groupedByTypeA);
    for (var r = 0; r<groupedByTypeA.length; r++) {
        var category = groupedByTypeA[r];
        // console.log(category);  ////each of the 105 objects separate
////GETTING STUCK HERE
        if (!map[category]) 
            map[category] = [];
        map[category].push(groupedByTypeA[r]);
    }
    return map;
/////NOT working
    console.log(category); 
  }


// callback for loaded data.
function handleDataLoad(d) {
  groupedByType = d;
  redraw();
}   


function barChart(){

var groupedByType = collate(tableA,22);
console.log(groupedByType);

var groupedByTypeC = Object.keys(groupedByType);
console.log(groupedByTypeC);
    var width = 1200,
        height = 800,
        margin = 40

for (var b=0; b< groupedByTypeC.length; b++) {

    //var total = groupedByType[groupedByTypeC[b]].length;
    var totalsFiltered = 0;
    // console.log(total);
    var femtotals = 0;
    var maletotals = 0;

    for (var t = groupedByType[groupedByTypeC[b]].length - 1; t >= 0; t--) {
      var currentGender = groupedByType[groupedByTypeC[b]][t][10];
      if (currentGender == 'm') {
         maletotals = maletotals + 1;
         //fill(92,242,145,120);
         //rect(20 + (b * 2), 20 + (t * 2), 10, 1);
      }else if (currentGender == 'f'){
        femtotals = femtotals + 1;
       // fill(179,118,244,120);
        //rect(20 + (b * 2), 20 + (t * 2), 10, 1);
      };


      if(currentGender === 'm' || currentGender === 'f'){
        totalsFiltered = totalsFiltered + 1;
      }
      
    };
    // console.log("totals: "+totalsFiltered + " fem: " + femtotals + " male: "+ maletotals)
   var myObject = {name: groupedByTypeC[b], f: femtotals, m: maletotals, total: totalsFiltered}
   barTotals.push(myObject)

      }
////sort
      // console.log(barTotals)
      barTotals.sort(function(a,b){
        return a['m'] - b['m']
      })
      // console.log(barTotals)
      for (var i = barTotals.length - 1; i >= 0; i--) {

         fill(92,242,145,120);
         rect(100 + (i * 10), 100, 10, barTotals[i]['m']);

         fill(179,118,244,120);
         rect(100 + (i * 10), 100, 10, (-1) * barTotals[i]['f']);

      };
}

function lineChart(){
  var maxX1;
  var x1,x2,y1,y2;
  
  var groupedByType = collate(tableA,22);
  console.log(groupedByType);

  var maxX1 = Object.keys(groupedByType);
  ////NOT WORKING
  // maxX = maxX1.getRowCount;
  // console.log(maxX1);
  for (var i = 0; i < maxX1.length; i++) {
    maxX2 = maxX1;
    maxX = maxX2.length;
      }
  console.log(maxX);  ////returns 105
  // console.log(maxX2);  ////returns 
  var maxY = 1500000;
  textSize(10);

// iterate through the data
  for(var i = 0; i < maxX; i++) {    
    stroke(color(179,118,244));
    strokeWeight(1);
    noFill();
    // console.log(Object.keys(groupedByType)[i]);
    var individualPiece = maxX1[i];
    console.log(individualPiece);


// variables
////ERROR getRow
    // x1 = map(i                       ,0 ,maxX, 0        ,width);
    // x2 = map(i+1                     ,0, maxX, 0        ,width);
    // y1 = map(groupedByType.getRow(i).get(0)   ,0, maxY, height-30, 0);
    // y2 = map(groupedByType.getRow(i+1).get(0) ,0, maxY, height-30, 0);

   
// draw the line
    // line(x1,y1,x2,y2)

// draw the legend
    // noStroke()
    // fill(0)
    // text(i,x1,height)
  }
}

//////////////////////

///COLOR works
////fill by gender - see further down
    // fill(179,118,244,120);
   // rect(20, 20, w, h); // draw rect

   // fill(92,242,145,120);
   // rect(100 + (b * 10), 100, 10, maletotals);

   // fill(179,118,244,120);
   // rect(100 + (b * 10), 100, 10, (-1) * femtotals);
//////////


  // for(var i=0; i<tableAkeys.length; i++){
// //// classification use map incoming value and range
//     // console.log('thisisallYrs' + allYears[allYears.length-1].year);
// ////map function 
//     // var x = map(allYears[i].year,1850,allYears[allYears.length-1].year, margin, width-margin);
//     var x = map(tableAkeys[i].year,1850,tableAkeys[tableAkeys.length-1].year, margin, 1341-margin);

//     var totalFemaleArtistsPerBar = 0;
//     var totalMaleArtistsPerBar = 0;

// ////THIS logs where it is mapping that is relatively corresponding to:
//    // console.log("mapping: " + allYears[i].year + "to: " + x);

//   ///then do same for y height
//   for(var j=0; j<tableAkeys[i].items.length; j++){
//       var y= map(j,0,maxObjects,747-margin, margin);


    

  

// //THIS gets number of FEMALE artworks per BAR with total bar height
//   barTotals.push({barTotal: allYears[i].items, femaleTotal: totalFemaleArtistsPerBar});
// //THIS gets number of FEMALE artworks 
//   yrFemTotals.push({year: allYears[i].year, total: totalFemaleArtistsPerBar});

// //THIS gets number of MALE artworks per BAR with total bar height
//   barTotals2.push({barTotal: allYears[i].items, maleTotal: totalMaleArtistsPerBar});
// //THIS gets number of MALE artworks 
//   yrMaleTotals.push({year: allYears[i].year, total: totalMaleArtistsPerBar});
  
//   // console.log(yrFemTotals);
//   // console.log(yrMaleTotals);

////group by year
// function analyzeData(){
//     var count = table.getRowCount();
//     console.log(count);
// // get specific columns
//     name = table.getColumn(9);
//     gender = table.getColumn(10);
//     nation = table.getColumn(13);
//     date = table.getColumn(17);
//     type = table.getColumn(22);
 
// // get the max, min value within object begin date column
// var count = table.getRowCount();
    
//     var yearNow = {};
//     yearNow.year = int(table.getString(0,17));
//     yearNow.items = table.findRows(String(yearNow.year),17);
//     append(allYears, yearNow);
    
//     minObjects = 100000;
//     maxObjects = 0;
//     minYear = null;
//     maxYear = null;

//   for (var i=0; i<count; i++) {
//       var year = int(table.getString(i,17));
//       if(year!=yearNow.year){
//         var yearNow = {};
//         yearNow.year = year;
//         yearNow.items =[];
//         yearNow.items = table.findRows(String(yearNow.year),17);
//         append(allYears, yearNow);
        
//         if(yearNow.items.length>maxObjects){
//           maxObjects = yearNow.items.length;
//           maxYear = allYears.length-1;
//         }
//         if(yearNow.items.length<minObjects){
//           minObjects = yearNow.items.length;
//           minYear = allYears.length-1;
//         }
//      }
//   }
//   // console.log("The Year " + allYears[maxYear].year + " has the most objects with " + allYears[maxYear].items.length + " items.");
//   // console.log("The Year " + allYears[minYear].year + " has the least objects with " + allYears[minYear].items.length + " items.");
// }
    


