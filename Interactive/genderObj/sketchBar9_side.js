var table;
var tableA;
var groupedByType; ////classification, artwork material object
var groupedByName;  ////artist name
var groupedByYear; ////year
var groupedByGender; ////gender
var groupedByNameKeys;
var groupedByNameL;
var myObjectName = [];
var myObjectNameSort = [];

var currentArtistCount;
var currentArtist = {};

var allYears = [];

var sorted = [];
var myObjClass = [];
var objectNames;
var objectType = [];
var barTotals = [];
var barTotalsSort = [];
var bars = [];

var groupedByNameKeysSort = [];

var name, gender, date, type;

var listItems = [];
var upperLimit;
var lowerLimit;

var button; 
var submit;
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

////container for bar info text - tooltip
function switchText(indivType, x, y){
    $('#tooltip').text(indivType)
    //move it to the x y position
    $('#tooltip').css('position', 'absolute');
    // $('#tooltip').css('top', y-25); 
    $('#tooltip').css('top', y-10); 
    $('#tooltip').css('left', x+20); 
    // $('#tooltip').css('left', x);
}


var h = function(p){

p.move = function(){
  // p.translate(0,3650);
}
   p.fontRead = function(){
      fontReady = true; 
    }

   p.preload = function(){
   p.table = p.loadTable('assets/ModContGenderfinalgnoysort.csv','csv','header'); /////four sort gender, Artist Alpha Sort, classification, year
   console.log(p.table);
   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

////toggle text off on
 p.toggleTypes = function(){
  var contentId = document.getElementById("types");
  contentId.style.display == "none" ? contentId.style.display = "block":
  contentId.style.display = "none";
}

    p.setup = function(){
    // canvas = p.createCanvas(p.windowWidth,5000);
    canvas = p.createCanvas(1440, 3200);
    p.windowResized();
    p.move();
    p.analyzeData();
    p.analyzeYears();
    p.barChart();
    p.drawLabelsCh();
    p.showTypes();
    p.analyzeArtists();
    p.labels();
    p.background(238, 222, 161, 1);
  }

  p.windowResized = function() {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
}

p.showTypes = function(){
    var button = document.getElementById("button");
    $('button').click(function() {
      $('#types').toggle();
    });
}

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

p.labels = function(){
     p.push();
        p.translate(802,755);
        p.rotate(p.radians(90));
        p.textFont('Khand');
        p.noStroke();
        p.textSize(70);
        p.fill(42,155,285,90);
        p.translate(0,0);
        p.rotate(p.radians(270)); 
        p.text("Medium", 640,margin);
        p.fill(105,105,105);
        p.textSize(30);
        p.text("male", 820, 788);
        p.text("female", 820, -525);
        p.fill(92,242,145,150);
        p.ellipse(805, 780, 18, 18);
        p.fill(179,118,244,130);
        p.ellipse(805, -534,18,18);

    p.pop();

       p.push();
      p.translate(950,150);
      // p.rotate(p.radians(90));
      p.textFont('Khand');
      p.noStroke();
      p.fill(179,118,244,120); ////gender
      p.rect(48,10,67,42);
      p.fill(92,242,145,130); 
      p.rect(115,10,59,42);
      // p.fill(191,61,4,80); ////medium
      // p.rect(250,10,139,42);

      // p.fill(191,61,4,80); ////medium
      // p.rect(555,276,79,28);
      // p.fill(179,118,244,90); ////gender
      // p.rect(865,276,69,28);
      // p.fill(92,242,145,90); ////gender
      // p.rect(974,276,51,28);
      p.textStyle(p.NORMAL);
      p.noStroke();
      p.textAlign(p.LEFT);
      p.fill(77,77,77);
      p.textSize(44);
      p.text("Gender and Medium: The Met Modern & Contemporary Art", 250, 48);
      // p.textSize(40);
      // p.text("The Met Modern & Contemporary Art", 400, 48);
      // p.textSize(35);
      // p.text("Which Mediums Dominate", 390, 130);
      // p.textSize(38);
      // p.text("Mediums are most collected by gender?", 55, 259);
      // p.textSize(26);
      // p.text("Roll over each bar to explore each of the medium classifications", 170, 300);
    
  p.pop();
}

///////=====BAR CHART=====////////////
  p.barChart = function(){

    var groupedByType = collate(tableA,22);

    var groupedByTypeC = Object.keys(groupedByType);
      var width = 1440, 
          height = 2500,
          margin = 50,
          w = p.width - 2 * margin, // chart area width and height
          h = p.height - 2 * margin;
    
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
      
p.translate(-150,2050);
p.rotate(p.radians(270));     

/////sort by size by female
barTotalsSort = barTotals;
      barTotalsSort.sort(function(a,b){
        return a['f'] - b['f']
      })
    
      for (var i = barTotalsSort.length-1; i >= 0; i--) {
          p.strokeWeight(1.5);
          p.stroke("#ffffff");
          p.fill(92,242,145,150); ////green bars artworks by men
          p.rect(160 + (i * 15), $(window).height()/2, 15, barTotals[i]['m']/4);
          p.fill(179,118,244,140);  ////purple bars artworks by women
          var bar = p.rect(160 + (i * 15), $(window).height()/2, 15, (-1) * barTotals[i]['f']/4);
          bars.push({x: 160 + (i * 15), y: $(window).height()/2, width: 15, height: barTotals[i]['f']/4, name: barTotals[i].name, maleHeight: barTotals[i]['m']/4});
          

          // p.fill(255,0,0);
          p.textSize(14);
          p.text(barTotalsSort[i].name+barTotalsSort[i].total, 5+7, 105+(i * 10)); // text-names
          var objectNames = barTotals[i].name;
          objectType.push(objectNames); ////returns name of each classification


////sort by size by male;
      // barTotals.sort(function(a,b){
      //   return a['m'] - b['m']
      // })
      // for (var i = barTotals.length-1; i >= 0; i--) {
      //     p.strokeWeight(1.5);
      //     p.stroke("#ffffff");
      //     p.fill(92,242,145,150); ////green bars artworks by men
      //     p.rect(100 + (i * 10), 5, 10, barTotals[i]['m']);
      //     p.fill(179,118,244,140);  ////purple bars artworks by women
      //     var bar = p.rect(100 + (i * 10), 5, 10, (-1) * barTotals[i]['f']);
      //     bars.push({x:100 + (i * 10), y:5, width: 0.5, height: barTotals[i]['f'], name:barTotals[i].name});
      //     p.push();
      //     // p.translate(5,0);
      //     // p.rotate(p.radians(270));
      //     p.fill((255, 255,255,255));
      //     p.textSize(16);
      //     p.text(barTotals[i].name+barTotals[i].total, 5+7, 105+(i * 10)); // text-names
      //     // p.text(barTotals[i].name, 5, barWidth/2 + 5); // text-names
      //     var objectNames = barTotals[i].name;
      //     objectType.push(objectNames); ////returns name of each classification
          // p.pop();
        };
        console.log(barTotalsSort);
        // p.saveJSON(barTotalsSort, 'totals.json');
// p.pop();
}
console.log(bars);
//////listen for mouse, show tooltips
p.draw = function(){
 
 
  var onLabel = false;
  for (var i = bars.length - 1; i >= 0; i--) {
    var d = p.dist(p.mouseX, p.mouseY, bars[i].x, bars[i].y)
    
    // if(i == 0 ) {
    //   console.log(bars[i]);
      // ((p.mouseX >= bars[i].x) && (p.mouseX <= bars[i].x + 15) && (p.mouseY >= (bars[i].y-bars[i].height) && p.mouseY <= (bars[i].y +bars[i].maleHeight))){
    // }

    var barH = bars[i];
  // console.log(barH);

    var boundary = {
      start: {
         x: barH.y/4,
         y: barH.x/4,
      }, 
      end: {
        x: barH.y/4 + barH.height + barH.maleHeight/4,
        y: barH.x/4 + 15,
      }
    }

   if ((p.mouseX >=boundary.start.x) && (p.mouseX <= boundary.end.x) && (p.mouseY >= boundary.start.y)  && (p.mouseY <= boundary.end.y)){
      console.log('x:', p.mouseX)
      console.log('y:', p.mouseY)

      switchText(bars[i].name, p.mouseX, p.mouseY)
      onLabel = true;
    };
  };
  if(onLabel == false){
    switchText("", p.mouseX, p.mouseY)
  }

}
//////original
// p.draw = function(){
  
//   // p.translate(-150,2050);
//   // p.rotate(p.radians(270));

//   var onLabel = false;
//   for (var i = bars.length - 1; i >= 0; i--) {
//     var d = p.dist(p.mouseX, p.mouseY, bars[i].x, bars[i].y)
    
//     // if(i == 0 ) {
//     //   console.log(bars[i]);
//       // ((p.mouseX >= bars[i].x) && (p.mouseX <= bars[i].x + 15) && (p.mouseY >= (bars[i].y-bars[i].height) && p.mouseY <= (bars[i].y +bars[i].maleHeight))){
//     // }

//     var bar = bars[i];

//     var boundary = {
//       start: {
//          x: bar.y/4,
//          y: bar.x/4,
//       }, 
//       end: {
//         x: bar.y/4 + bar.height + bar.maleHeight/4,
//         y: bar.x/4 + 15,
//       }
//     }

//    if (p.mouseX >=boundary.start.x && p.mouseY >= boundary.start.y && p.mouseX <= boundary.end.x && p.mouseY <= boundary.end.y){
//       console.log('x:', p.mouseX)
//       console.log('y:', p.mouseY)

//       switchText(bars[i].name, p.mouseX, p.mouseY)
//       onLabel = true;
//     };
//   };
//   if(onLabel == false){
//     switchText("", p.mouseX, p.mouseY)
//   }

// }

// //////this works on vertical bar_listen for mouse, show tooltips
// p.draw = function(){

//   var onLabel = false;
//   for (var i = bars.length - 1; i >= 0; i--) {
//     var d = p.dist(p.mouseX, p.mouseY, bars[i].x, bars[i].y )

//    if ((p.mouseX >= bars[i].x) && (p.mouseX <= bars[i].x + 10) && (p.mouseY >= (bars[i].y-bars[i].height) && p.mouseY <= (bars[i].y +bars[i].maleHeight))){
//       console.log('x:', p.mouseX)
//       console.log('y:', p.mouseY)

//       switchText(bars[i].name, p.mouseX, p.mouseY)
//       onLabel = true;
//     };
//   };
//   if(onLabel == false){
//     switchText("", p.mouseX, p.mouseY)
//   }

// }



/////========count of artworks per artist
p.analyzeArtists = function(){
      name = p.table.getColumn(12); ////name, Artist Alpha Sort
      tableA = p.table.getArray(); 

     groupedByNameL = collate(tableA,12); ////grouped by name
     console.log(groupedByNameL); 

     var groupedByNameKeys = Object.keys(groupedByNameL);
     // console.log(groupedByNameKeysSort);

      groupedByNameKeysSort = groupedByNameKeys;
      groupedByNameKeysSort.sort(function(a,b){
        return a - b
      })

    for (var c=0; c<groupedByNameKeysSort.length; c++) {
     var currentArtistCount = groupedByNameL[groupedByNameKeysSort[c]].length
    
      myObjectName.push({name: groupedByNameKeysSort[c], total: currentArtistCount}); 

////sort by size
      myObjectNameSort = myObjectName;

      myObjectNameSort.sort(function(a,b){
        return a.total - b.total
      })
  }          
  console.log(myObjectNameSort);  ////returns artist name ordered number of artworks    
}
 
 


p.drawLabelsCh = function(){
//////get info on each object and return on screen
    p.push();

    var width = 1440, 
        height = p.windowHeight

//////return list of classification types & numbers
  p.textFont('Khand');
  p.noStroke();
  p.textAlign(p.LEFT);
  p.fill(255,0,0);
  p.textSize(10);
  listItems = objectType;
  p.text(listItems);
  console.log(listItems);

  $('#types').empty();
  for(var i = barTotals.length-1; i >= 0; i--) {
                          var classification = barTotals[i];
                          var classificationHTML = '<li>';
                              classificationHTML += '<p>'+barTotals[i].name + "  ......"+""+barTotals[i].total+ ":  "+"  "+"  female "+barTotals[i].f+", "+"  male "+barTotals[i].m+'<p>'
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
  p.fill(102,102,102);
  p.textSize(39);
  p.text("105 Medium Classifications Sorted by Gender", 50, 116);
  // p.text("Sorted by Gender", 50, 156);
  // p.textSize(20);
  // p.text("roll over a bar to explore each of the medium classifications", 50, 186);
  // p.fill(191,61,4,80); ////medium
  // p.rect(430,125,78,28);
p.pop();


////axis number of objects
p.push();
    
  p.scale(0.75);

    p.translate(2270,1850);


    upperLimit = barTotals[barTotals.length - 1]['f']
    lowerLimit = -1 * barTotals[barTotals.length - 1]['m']
    console.log(upperLimit)
    console.log(lowerLimit)
    p.noStroke();
    p.textAlign(p.RIGHT);
    p.textStyle(p.NORMAL);

    for(var i=lowerLimit; i<upperLimit; i+=200){
      var x = margin;
      var y = p.map(i,upperLimit, lowerLimit, lowerLimit/3, upperLimit/3);
        p.noStroke();
        p.fill(77,77,77);
        p.textSize(17);
        p.text(i+3, x, y);
        p.stroke(77,77,77);
        p.strokeWeight(1);
        p.line(x-35,y-6,x-25,y-6);    
    }
  p.pop(); 
  p.pop();
    
  }

}

var myp5 = new p5(h, 'canvas-bar9-side');
