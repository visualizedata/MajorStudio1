//////////=====LINE CHART=====/////////
var tableL;
var tableA;
var allYears = [];

var barTot = [];

var groupedByTypeL = []; ////classification, artwork material object
var groupedByNameL = [];  ////artist name
var groupedByYearL = []; ////year
var groupedByGenderL = []; ////gender
var groupedByTypeLC;

var groupedByType; //// collate function on classification column
var groupedByTypeC; ////object keys of groupedByType

var maxObjects, minObjects;

var KhandFont, fontReady = false;

var margin = 80;

function collate(array, prop){
    return array.reduce(function(groups, item){
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

var t = function(p) {

p.fontRead = function(){
      fontReady = true; 
    }

p.preload = function(){
     p.tableL = p.loadTable('assets/ModContGenderfinaloygsort.csv','csv','header'); /////classification, year, gender
     console.log(p.tableL);
     KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

p.setup = function(){
    canvas = p.createCanvas(p.windowWidth, 850);
    p.analyzeData();
    p.line2();
    p.noLoop();
  }

 p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

////group by type classification, then year & gender
p.analyzeData = function(){
    var genderL = p.tableL.getColumn(10);  ////gender
    var nameL = p.tableL.getColumn(12); ////name, Artist Alpha Sort
    var dateL = p.tableL.getColumn(17); ////object begin date
    var typeL = p.tableL.getColumn(22); ////classification

    tableLA = p.tableL.getArray(); 

/////group same items together using reduce function
     groupedByTypeL = collate(tableLA,22); ////grouped by type of object
     console.log(groupedByTypeL); 

     groupedByYearL = collate(tableLA,17);  ///grouped by year
     console.log(groupedByYearL);

     groupedByGenderL = collate(tableLA,10);  ///grouped by gender
     console.log(groupedByGenderL);

    var groupedByTypeLC = Object.keys(groupedByTypeL); ////105 artwork type object keys 
    console.log(groupedByTypeLC.length);


    var yearNow = {};
    yearNow.items =[];
    yearNow.year =[];
    yearNow.gender = [];
    yearNow.gender = groupedByGenderL; ////objects grouped by gender

    p.append(allYears,yearNow);

    var count = p.tableL.getRowCount();
    var countC = p.tableL.getColumnCount();
        console.log(count + " rows");  ////14350 rows
        console.log(countC + " columns"); ////24 columns
    var row, col, val, min, max;

    var yearNow = {};
        yearNow.year = (p.int(p.tableL.getString(0,17)));
        yearNow.items = p.tableL.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);

    var minObjects = 150000;
        maxObjects = 0;
    var minYear = null;
        maxYear = null;

for (var i=0; i<count; i++) {
      var year = (p.int(p.tableL.getString(i,17)));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items = [];
        yearNow.items = p.tableL.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);
        
        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          maxYear = allYears.length-1;
        }

        if(yearNow.items.length<minObjects){
          minObjects = yearNow.items.length;
          minYear = allYears.length;           
        }
     }
  }
console.log("year with most objects "  + allYears[maxYear].year);
console.log(allYears[minYear].year);
console.log(allYears); ////array of objects with year and artwork type

mxYear = null;
var midYears;

for (var s=0; s<=p.count; s++) {
      var year = p.int(p.tableL.getString(s,17));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items =[];
        yearNow.items = p.tableL.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);
        
        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          mxYear = midYears.length-1;
        }
     }
   
console.log("Number of artworks since 1850 is " + (midYears.length-1) + " the year with the most artworks 1850 -2017 is " + mxYear);
}

}




p.line2 = function(){
    var groupedByType = collate(tableLA,22);
    var groupedByTypeC = Object.keys(groupedByType);
    var width = p.windowWidth, 
        height = 4000,
        margin = 50,
        w = p.width - 2 * margin, // chart area width and height
        h = p.height - 2 * margin;
    
    var barWidth =  (h / groupedByTypeC.length) * 0.1; // width of bar
    var barMargin = (h / groupedByTypeC.length) * 0.001; // margin between two bars

for (var b=0; b<groupedByTypeC.length; b++) {
      var totalsFiltered = 0;
      var femtotals = 0;
      var maletotals = 0;
  ////t vertical, b horizontal
      for (var t = groupedByType[groupedByTypeC[b]].length - 1; t >= 0; t--) {
        var currentGender = groupedByType[groupedByTypeC[b]][t][10];
        if (currentGender == 'm') {
           maletotals = maletotals + 1;

        } else if (currentGender == 'f'){
          femtotals = femtotals + 1;  
      };

      if(currentGender === 'm' || currentGender === 'f'){
        totalsFiltered = totalsFiltered + 1;
        }    
      };
         var myObject = {name: groupedByTypeC[b], f: femtotals, m: maletotals, total: totalsFiltered};
         barTot.push(myObject);
       }
         console.log(barTot);  ////each classification with number of artworks & split 


p.beginShape();
p.push();
p.translate(50, 500);
  var initial = 0;
  var x1,x2,y1,y2;
  var maxX1 = 1;
  var maxY = 2000;
  console.log(maxX1);
  console.log(allYears);
  for (var n = 0; n < allYears.length-1; n++) {
    p.stroke(50);
    p.strokeWeight(1);
    p.noFill();
    x1 = p.map(initial                      ,0 ,maxX1, 0        ,width);
    x2 = p.map(initial+1                     ,0, maxX1, 0        ,width);
    y1 = p.map(allYears[n].items.length  ,0, maxY, 0, height);
    y2 = p.map(allYears[n+1].items.length ,0, maxY, 0, height); 
    initial + 1;
    console.log(x1);
    console.log(x2);
    console.log(y1);
    console.log(y2);
    console.log(initial);
    p.line(x1,y1,x2,y2)
  //legend
    p.noStroke();
    p.fill(0);
    p.text(n,x1,height);
  

   
p.endShape();
 }
 
p.pop();

}
 
 }

var myp5 = new p5(t,'c2');

