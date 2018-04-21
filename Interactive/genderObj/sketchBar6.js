var table;
var tableA;
var groupedByType; ////classification, artwork material object
var groupedByName;  ////artist name
var groupedByYear; ////year
var groupedByGender; ////gender

var allYears = [];

var sorted = [];
var myObjClass = [];
var objectNames;
var objectType = [];
var barTotals = [];

var name, gender, date, type;

var listItems = [];
var upperLimit;
var lowerLimit;

var button; 
var objNames;

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


var g = function(p){

   p.fontRead = function(){
      fontReady = true; 
    }

   p.preload = function(){
   p.table = p.loadTable('assets/ModContGenderfinalgnoysort.csv','csv','header'); /////four sort gender, Artist Alpha Sort, classification, year
   console.log(p.table);
   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

    p.setup = function(){
    canvas = p.createCanvas(1500, 2900);
    p.analyzeData();
    p.analyzeYears();
    p.barChart();
    p.drawLabelsCh();
    // button = p.createButton("classification (artwork material types)");
    // button.position(30,800);
    p.show();
    p.mouseClicked("#types");
    // text = p.createDiv("#type");
    // text.position(30, 840);
    p.background(238, 222, 161, 1);
    // p.sortFemale();
    // p.mouseClicked('.bars');
    p.noLoop();
  }

p.show = function(){
  $('button').click(function() {
    $('#types').addClass('classificationTypes');
  });
}

p.mouseClicked = function(){
    p.show = (!p.show);
}

// p.show = function(){
//     objNames = document.getElementById("#type");
//     // if (objNames.style.display === "null") {
//     //     objNames.style.display = "block";
//     // } else {
//     //     objNames.style.display = "null";
//     // }
// }

// $('button').click(function() {
//     $('#type').addClass('classificationTypes');
//   });



////group by type classification & gender, then by name
p.analyzeData = function(){
      gender = p.table.getColumn(10); ////gender
      name = p.table.getColumn(12); ////name, Artist Alpha Sort
      date = p.table.getColumn(17); ////object begin date
      type = p.table.getColumn(22); ////classification
    
      tableA = p.table.getArray(); 
     
      var female = p.table.findRows('f', 10); /////2027 rows with a FEMALE artist 
      var male = p.table.findRows('m', 10);  /////10829 rows with a MALE artist

/////group same items together using collate reduce function
////=======  group sort by artist by object type
      groupedByName = collate(tableA,12);  ////name, Artist Alpha Sort with array of artworks by artist

////=======  group sort by object begin date
      groupedByYear = collate(tableA,17);  ////year
  
////object, artist alpha sort is keys
      var tableAkeys = Object.keys(groupedByName);  ////3564 names, Artist Alpha Sort

////iterate through object by keys and select artist names 
      for(var j=0; j<tableAkeys.length; j++){
        sorted[tableAkeys[j]] = collate(groupedByName[tableAkeys[j]], 12)
    }

////============ classification object type
    groupedByType = collate(tableA,22);  ////classification

////object, type (classification) each of the keys 
    var tableAkeys = Object.keys(groupedByType); ////returns array of object keys (glass, sculpture etc)

////iterate through object by keys and SPLIT object into 105 objects 
    for(var l=0; l<tableAkeys.length; l++){
        p.sort[tableAkeys[l]] = collate(groupedByType[tableAkeys[l]], 22)
      } 
      // console.log(tableAkeys); ///105 separate objects 
  }
  
  p.analyzeYears = function(){
      gender = p.table.getColumn(10); ////gender
      name = p.table.getColumn(12); ////name, Artist Alpha Sort
      date = p.table.getColumn(17); ////object begin date
      type = p.table.getColumn(22); ////classification
    
      tableA = p.table.getArray(); 

/////group same items together using reduce function
     groupedByTypeL = collate(tableA,22); ////grouped by type of object
     console.log(groupedByTypeL); 

     groupedByYearL = collate(tableA,17);  ///grouped by year
     console.log(groupedByYearL);

     groupedByGenderL = collate(tableA,10);  ///grouped by gender
     console.log(groupedByGenderL);

    var groupedByTypeLC = Object.keys(groupedByTypeL); ////105 artwork type object keys 
    console.log(groupedByTypeLC.length);

    var yearNow = {};
    yearNow.items =[];
    yearNow.year =[];
    yearNow.gender = [];
    yearNow.gender = groupedByGenderL; ////objects grouped by gender

    p.append(allYears,yearNow);

    var count = p.table.getRowCount();
    var countC = p.table.getColumnCount();
        console.log(count + " rows");  ////14350 rows
        console.log(countC + " columns"); ////24 columns
    var row, col, val, min, max;

    var yearNow = {};
        yearNow.year = (p.int(p.table.getString(0,17)));
        yearNow.items = [];
        yearNow.items = p.table.findRows(String(yearNow.year),17);
        yearNow.url = []; ////attach Met classification url to each object
        yearNow.url.href = "https://www.metmuseum.org/art/collection/search#!?offset=0&pageSize=0&sortBy=Relevance&sortOrder=asc&perPage=20&department=21"
        p.append(allYears, yearNow);

    var minObjects = 150000;
        maxObjects = 0;
    var minYear = null;
        maxYear = null;

for (var i=0; i<count; i++) {
      var year = (p.int(p.table.getString(i,17)));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items = [];
        yearNow.items = p.table.findRows(String(yearNow.year),17);
        yearNow.url = []; ////attach Met classification url to each object
        yearNow.url.href = "https://www.metmuseum.org/art/collection/search#!?offset=0&pageSize=0&sortBy=Relevance&sortOrder=asc&perPage=20&department=21"
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
}

///////=====BAR CHART=====////////////
  p.barChart = function(){
  p.push();
    var groupedByType = collate(tableA,22);

    var groupedByTypeC = Object.keys(groupedByType);
      var width = p.windowWidth, 
          height = p.windowHeight,
          height = 5126,
          margin = 50,
          w = p.width - 2 * margin, // chart area width and height
          h = p.height - 2 * margin;
    
    var barWidth =  (h / groupedByTypeC.length) * 3; // width of bar
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
         var myObject = document.createElement('types');
        myObject = {name: groupedByTypeC[b], f: femtotals, m: maletotals, total: totalsFiltered};
         
         myObject.addClass="bars";

         barTotals.push(myObject); ////each classification with number of artworks & split by gender  
}
        p.push();
        p.scale(0.6); 
        p.translate(p.windowWidth/2,700);

////sort by size;
      barTotals.sort(function(a,b){
        return a['m'] - b['m']
      })
      for (var i = barTotals.length-1; i >= 0; i--) {
          p.noStroke();
          p.fill(92,242,145);
          p.rect(100 + (i * 10), 5, 3, barTotals[i]['m']);
          p.noStroke();
          p.fill(179,118,244);
          p.rect(100 + (i * 10), 5, 3, (-1) * barTotals[i]['f']);
          console.log(barTotals[i].name)
          console.log(barTotals[i]);

          p.push();
          p.translate(100,100);
          p.rotate(p.radians(270));
          p.textSize(20);
          p.text(barTotals[i].name, 5, barWidth/2 + 5); // text-names
          var objectNames = barTotals[i].name;
          objectType.push(objectNames); ////returns name of each classification
          p.pop();
        };
      p.pop();
  }


p.drawLabelsCh = function(){
    p.push();

    var width = p.windowWidth, 
        height = p.windowHeight

  
//////return list of classification types
  p.textFont('Khand');
  p.noStroke();
  p.textAlign(p.CENTER);
  p.fill(255,0,0);
  p.textSize(10);
  listItems = objectType;
  p.text(listItems);
  console.log(listItems);
////WORKS
  // $('#types').empty();
  // for(var i = 0; i < listItems.length; i ++ ) {
  //                         var classification = listItems[i];
  //                         var classificationHTML = '<li>';
  //                             classificationHTML += '<p>'+listItems[i]+'<p>'
  //                             classificationHTML += '<a href = "https://www.metmuseum.org/art/collection/search#!?offset=0&pageSize=0&sortBy=Relevance&sortOrder=asc&perPage=20&department=21">';
  //                             classificationHTML += '</a>';
  //                             classificationHTML += '</li>';
  //                 $('#types').append('<div>'+classificationHTML+'</div>');  ////put the artwork types into list  
  //         }
  $('#types').empty();
  for(var i = barTotals.length-1; i >= 0; i--) {
                          var classification = barTotals[i];
                          var classificationHTML = '<li>';
                              classificationHTML += '<p>'+barTotals[i].name + "  ......"+"  "+"  Total: "+barTotals[i].total+ "  ...."+"  "+" Female: "+barTotals[i].f+", "+" Male: "+barTotals[i].m+'<p>'
                              classificationHTML += '<a href = "https://www.metmuseum.org/art/collection/search#!?offset=0&pageSize=0&sortBy=Relevance&sortOrder=asc&perPage=20&department=21">';
                              classificationHTML += '</a>';
                              classificationHTML += '</li>';
                  $('#types').append('<div>'+classificationHTML+'</div>');  ////put the artwork types into list  
          }

// //// title
  p.push();
  p.textFont('Khand');
  p.textStyle(p.NORMAL);
  p.noStroke();
  p.textAlign(p.LEFT);
  p.fill(77,77,77);
  p.textFont('Khand');
  p.textAlign(p.LEFT);
  p.noStroke();
  p.textSize(30);
  p.text("Classification (artwork object type) by Gender", 80, 50);
  p.text("In The Met Modern & Contemporary Art Collection", 80,85);
p.pop();

p.push();
    p.scale(0.6);
    p.translate(p.windowWidth/6*8.5,4742);

    upperLimit = barTotals[barTotals.length - 1]['f']
    lowerLimit = -1 * (barTotals[barTotals.length - 1]['m'])
    console.log(upperLimit)
    console.log(lowerLimit)
    p.noStroke();
    p.textAlign(p.LEFT);
    p.textStyle(p.NORMAL);

    for(var i=lowerLimit; i<upperLimit; i+=50){
      var x = margin;
      var y = p.map(i,upperLimit, lowerLimit, lowerLimit, upperLimit);
        p.noStroke();
        p.fill(77,77,77);
        p.textSize(30);
        p.text(i+3, x, y);
        p.stroke(77,77,77);
        p.strokeWeight(2);
        p.line(x-25,y-10,x,y-10);    
    }
  p.pop(); 
  p.pop();
    p.push();
        p.textFont('Khand');
        p.noStroke();
        p.textSize(60);
        p.fill(42,155,285,90);
        p.translate(150,1000);
        p.rotate(p.radians(270)); 
        p.text("Artwork material type", margin+310,-margin);
    p.pop();

  } 
}

var myp5 = new p5(g, 'c1');

// p.sortFemale = function() {
//     $('c1').click(function() {
//      barTotals.sort(function(a,b){
//         return b['m'] - a['m']
//       });
//   });
// }

// p.mouseClicked = function(){
//       p.sortFemale();
//   }