var table;

var yrFemTotals = [];
var barTotals =[];
var yrMaleTotals = [];
var barTotals2 =[];


var FemaleTotal = [];
var TotalFemale = [];
var TotalMale = [];
var TotalTwo = [];
var TotalUnknown = [];
var TotalToFindOut = [];

var gender = [];
var artist = [];
var ArtistColl = [];

var allYears = [];

var minYear, maxYear, mxYear, midYears, minObjects, maxObjects, maxArtist, maxArtistColl;

var overBars;

var KhandFont, fontReady = false;

var margin = 80;


////////chart
var w = function(p) {

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContG3final4sort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

   p.setup = function(){
     p.createCanvas(p.windowWidth,850);
     p.analyzeData();
     p.analyzeGender();
     p.displayData();
     p.drawLabelsCh();
     // p.legend();

  }

  p.windowResized = function() {
   p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.analyzeData = function(){
	var count = p.table.getRowCount();
  var countC = p.table.getColumnCount();
	console.log(count + " rows");
  console.log(countC + " columns");

// ///THIS shows row with FIRST female artist gender column 10
  var female = p.table.findRow('f', 10);
  console.log(female);
//============

// =======THIS console logs all rows with a FEMALE artist
    var female = p.table.findRows('f', 10);
    console.log(female);

//=======THIS console logs all rows with a MALE artist
    var male = p.table.findRows('m', 10);
    console.log(male);

//=======THIS console logs all rows where BOTH male and female named as artists 
    var couple = p.table.findRows('t', 10);
    console.log(couple);

//=======THIS console logs all rows where the artist is UNKNOWN
    var unknown = p.table.findRows('u', 10);
    console.log(unknown);

//=======THIS console logs all rows where there is an artist but I haven't found their gender
   var todo = p.table.findRows('a', 10);
   console.log(todo);

// // //===================================

// ///=========WORKS to give the YEARS w/ the MAX & MIN NUMBER OF OBJECTS 
////object begin date column 17
  var yearNow = {};
  yearNow.year = (p.int(p.table.getString(0,17)));

  yearNow.items = p.table.findRows(String(yearNow.year),17);
  p.append(allYears, yearNow);

  minObjects = 150000;
  maxObjects = 0;
  minYear = null;
  maxYear = null;


for (var i=0; i<count; i++) {
      var year = p.int(p.table.getString(i,17));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items =[];
        yearNow.items = p.table.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);
        
        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          maxYear = allYears.length-1;
        }

        if(yearNow.items.length<minObjects){
          minObjects = yearNow.items.length;
          // minYear = allYears.length-1;
           minYear = allYears.length;
        }
     }
  }
 // console.log("The Year " + allYears[maxYear].year + " has the most objects with " + allYears[maxYear].items.length + " items.");
 // console.log("The Year " + allYears[minYear].year + " has the least objects with " + allYears[minYear].items.length + " item.");
}

/// number of artworks 1850 - 2017


  mxYear = null;

for (var s=0; s<=p.count; s++) {
      var year = p.int(p.table.getString(s,17));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items =[];
        yearNow.items = p.table.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);
        
        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          mxYear = midYears.length-1;
        }

     }
console.log("Number of artworks since 1850 is " + midYears.length + " the year with the most artworks 1850 -2017 is " + mxYear);

  }

////====================


// /======THIS WORKS FOR TOTAL NUMBER of FEMALE, MALE, TWO, UNKNOWN artists
//shown on bar chart  

p.analyzeGender = function(){
  var cnt = p.table.getRowCount();
  var gender = {};

  var MaleArtists = 0;
  var FemaleArtists = 0;
  var TwoArtists = 0;
  var UnknownArtists = 0;
  var ToFindOutArtists = 0;
  var Other = 0;

  gender.gen = (String(p.table.getString(0,10)));

  for(var g=0; g<cnt; g++){
    var gender = p.table.getString(g,10);

    gender.items = p.table.findRows(String(gender.gen),10);
  if (gender === 'm') {
      MaleArtists = MaleArtists + 1;

    } else if (gender === 'f') {
     FemaleArtists = FemaleArtists + 1;

     } else if (gender === 't') {
     TwoArtists = TwoArtists + 1;

    } else if (gender === 'u') {
     UnknownArtists = UnknownArtists + 1;

   } else if (gender === 'a') {
     ToFindOutArtists = ToFindOutArtists + 1;

   } else {
     Other = Other + 1;
     }

  }

    TotalFemale.push({femaleTotal: FemaleArtists});
    console.log(TotalFemale);

    TotalMale.push({maleTotal: MaleArtists});
    console.log(TotalMale);

    TotalTwo.push({twoTotal: TwoArtists});
    console.log(TotalTwo);

    TotalUnknown.push({unknownTotal: UnknownArtists});
    console.log(TotalUnknown);

    TotalToFindOut.push({tofindoutTotal: ToFindOutArtists});
    console.log(TotalToFindOut);
       

}
///========


///WORKS TO DISPLAY PER YEAR by GENDER
  p.displayData = function(){
  /////move chart down 
	p.noStroke();
	p.fill(255,0,0);

  for(var i=0; i<allYears.length; i++){
//// years use map incoming value and range
    // console.log('thisisallYrs' + allYears[allYears.length-1].year);
////map function 
    // var x = map(allYears[i].year,1850,allYears[allYears.length-1].year, margin, width-margin);
    var x = p.map(allYears[i].year,1850,allYears[allYears.length-1].year, margin, 1341-margin);

    var totalFemaleArtistsPerBar = 0;
    var totalMaleArtistsPerBar = 0;

////THIS logs where it is mapping that is relatively corresponding to:
   // console.log("mapping: " + allYears[i].year + "to: " + x);

    // var x = map(i,0,allYears.length, margin, width-margin);
    //rect(x,height/2,5,5);

  ///then do same for y height
  for(var j=0; j<allYears[i].items.length; j++){
      // var y= map(j,0,maxObjects,height-margin, margin);
      var y= p.map(j,0,maxObjects,747-margin, margin);

//table.findRows(String(yearNow.year),17)

///====WORKS TO FILL BY GENDER
   var gender = allYears[i].items[j].obj.Gender;
    if (gender === 'm') {
       p.fill(92,242,145,60);
       p.rect(x-1,y-1,3,2);
       // console.log('m');
       totalMaleArtistsPerBar = totalMaleArtistsPerBar + 1;

    } else if (gender === 'f') {
       p.fill(179,118,244,60);
       p.rect(x-1,y-1,3,2);
       // console.log('f');
      totalFemaleArtistsPerBar = totalFemaleArtistsPerBar + 1;
     // console.log(totalFemaleArtistsPerBar);
    } else if (gender === 't') {
       p.fill(168,71,5,50);
       p.rect(x-1,y-1,3,2);
      // console.log('t');
      
    } else if (gender === 'u') {
       p.fill(165,160,152,50);
       p.rect(x-1,y-1,3,2);
       // console.log('u');

    } else if (gender === 'a') {
       p.fill(224,199,50,70);
       p.rect(x-1,y-1,3,2);
       // console.log('a');

    } else {
       p.fill(100,100);
       p.rect(x-1,y-1,3,2);
      // console.log('u');
    }

  }

//THIS gets number of FEMALE artworks per BAR with total bar height
  barTotals.push({barTotal: allYears[i].items, femaleTotal: totalFemaleArtistsPerBar});
//THIS gets number of FEMALE artworks 
  yrFemTotals.push({year: allYears[i].year, total: totalFemaleArtistsPerBar});

//THIS gets number of MALE artworks per BAR with total bar height
  barTotals2.push({barTotal: allYears[i].items, maleTotal: totalMaleArtistsPerBar});
//THIS gets number of MALE artworks 
  yrMaleTotals.push({year: allYears[i].year, total: totalMaleArtistsPerBar});
  }
  console.log(yrFemTotals);
  console.log(yrMaleTotals);
}


    p.drawLabelsCh = function(){

 //x axis
  p.textFont('Khand');
  p.textSize(15);
  p.stroke(77,77,77);
 //just the lines
   // line(margin,height-margin,width-margin,height-margin);
  p.line(margin,747-margin,1341-margin,747-margin);
  p.noStroke();
  p.textAlign(p.CENTER);

  // draw the sections and add text for each section
   //go throught the years
for(var i=1850; i<=2017; i+=10){
   // var y = height-margin+30;
   var y = 747-margin+30;
   // x = map(i,1850,2017, margin, width-margin);
    var x = p.map(i,1850,2017, margin, 1341-margin);

    // x = map(i,0, allYears.length,margin, width-margin);
      p.noStroke();
      p.fill(77,77,77);
      p.text(i, x, y);
      p.stroke(77,77,77);
      p.strokeWeight(1);
      p.line(x,y-22,x, y-30);
  }

 // for(var i=0; i<allYears.length; i+=10){
  //   var y = height-margin+30;
  // x = map(allYears[i].year,1800,allYears[allYears.length-1].year, margin, width-margin);
  //   // x = map(i,0, allYears.length,margin, width-margin);
  //   noStroke();
  //   fill(0);
  //   text(allYears[i].year, x, y);
  //   stroke(0);
  //   line(x,y-12,x, y-30);
  // }

// label the whole axis
  p.textFont('Khand');
  p.textAlign(p.RIGHT);
  p.noStroke();
  p.textSize(19);
  // text("Year", width-margin,height-margin+70);
  p.text("Year: Object Begin Date", 990,720);

//source
  p.textAlign(p.LEFT);
  p.noStroke();
  p.textSize(15);
  // text("Year", width-margin,height-margin+70);
  // text("Year", 1341-margin,747-margin+70);
  p.text("Source: MetObjects.csv, January 2018, spreadsheet shared with The New School.", margin-15,747-margin+60);
  p.text("Modern & Contemporary Art Collection Department, 14,350 artworks. Object Begin Date, Gender identified by Artist Display Name, 1850-2017 (14,284 artworks.)", margin-15,747-margin+82);

//   // 2. Let's draw the y Axis
  p.stroke(77,77,77);
  // line(margin,height-margin ,margin,margin);
  p.line(margin,747-margin,margin,margin);
  p.noStroke();
  p.textAlign(p.RIGHT);
  p.textStyle(p.NORMAL);

  for(var i=0; i<maxObjects; i+=50){
    var x = margin-20;
    // y = map(i,0, maxObjects,height-margin, margin);
     var y = p.map(i,0, maxObjects,747-margin, margin);
    p.noStroke();
    p.fill(77,77,77);
    p.text(i, x, y+5);
    p.stroke(77,77,77);
    p.strokeWeight(1);
    p.line(x+10,y,x+20,y);
  }

  p.push();
  // textStyle(BOLD);
  p.textFont('Khand');
  p.noStroke();
  p.textSize(19);
  p.translate(1000,700);
  p.rotate(p.radians(270)); 
  p.text("Number of Artworks", margin+300,margin-1057);
  p.pop();
//   // 3. Let's add the overall title
  p.textFont('Khand');
  p.textStyle(p.BOLD);
  p.noStroke();
  p.textAlign(p.LEFT);
  p.textSize(38);
  p.fill(77,77,77);
  p.text("The Met: ", 520,100);
  p.textSize(28);
  p.textStyle(p.NORMAL);
  p.text("Where are the artworks by ", 639,100);
  p.textSize(50);
  p.fill(77,77,77);
  p.text("women?",640,170);
  // p.text("How do the numbers stack up by gender?", 520,210);
  p.textSize(38);
  p.textStyle(p.NORMAL);
  p.fill(77,77,77);
  // p.text("The Met's", 520,170);
  p.textSize(26);
  p.text("Modern & Contemporary Art Collection", 640,225);
  p.textSize(38);
  p.textStyle(p.BOLD);
  p.text("By year", 640,275);

////4. Add legend
    p.textFont('Khand');
    p.fill(179,118,244,140);  //f
    p.rect(100,100,25,25);
    p.fill(92,242,145,140); //m
    p.rect(100,130,25,25);
    p.fill(168,71,5,140);  //t
    p.rect(100,160,25,25);
    p.fill(165,160,152,140);   //u
    p.rect(100,190,25,25);
    p.fill(224,199,50,140);   //a
    p.rect(100,220,25,25);
    p.textStyle();
    p.textAlign(p.LEFT);
    p.textSize(17);
    p.fill (77,77,77);
    p.text("Artwork", 132,90);
    p.textStyle(p.NORMAL);
    p.textSize(18);
    p.text("female", 132,117);
    p.text("male", 132,147);
    p.text("couple / collaborative with both genders",132,177);
    p.text("unknown",132,207);
    p.text("named, gender not yet identified",132,237);
  }
}

var myp5 = new p5(w, 'c1');


////////////////\\\\\\\\\\\\\\\\

///wrapped bars
var s = function(p){

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContG3final4sort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

   p.setup = function(){
   p.createCanvas(p.windowWidth,850);
   p.drawLabelsTot();
   // p.legend();

   p.background(100,10);
    
   p.push();
   p.scale(0.83); 
   p.translate(120,60);
   p.push();
    p.stroke(92,242,145,160);
    p.strokeWeight(8);
    p.noFill();
    p.beginShape(); 
    p.vertex(830, 20);   // total m/2 = 10825/2 = 5412.5
    p.vertex(830, 760);   //  740
    p.vertex(940, 760);   //  110
    p.vertex(940,  20);   //740
    p.vertex(1280,  20);   //340
    p.vertex(1280, 840);   //820
    p.vertex(1250, 840);   //30
    p.vertex(1250,  40);   //800
    p.vertex(1110, 40);    //140
    p.vertex(1110, 840);   //800
    p.vertex(217.5, 840);  //892.5     ///5412.5
    p.endShape();  
    p.pop();

    p.push();
    p.stroke(179,118,244,160);
    // stroke(153,50,204,80); //total f/2 = 2027/2 = 1013.5
    p.strokeWeight(8);
    p.noFill();
    p.beginShape();
    p.vertex(838, 20);   //  
    p.vertex(838,  754);   //734
    p.vertex(934,  754);   //98
    p.vertex(934, 572.5);  //181.5      //1013.5
    p.endShape();
    p.pop();

    p.push();
    p.stroke(168,71,5,160); //total t couple/collab 128/2 = 64
    p.strokeWeight(8);
    p.noFill();
    p.beginShape();
    p.vertex(845, 20);   //  
    p.vertex(845,  84);   //64 = 64
    p.endShape();
    p.pop();

    p.push();
    p.stroke(165,160,152,160);  //total u unknown 1318/2 = 659
    p.strokeWeight(8);
    p.noFill();
    p.beginShape();
    p.vertex(852, 20);   //  
    p.vertex(852,  679);   // 659
    p.endShape();
    p.pop();

    p.push();
    p.stroke(224,199,50,160);  //total a to find out 52/2 = 26
    p.strokeWeight(8);
    p.noFill();
    p.beginShape();
    p.vertex(858, 20);   //  
    p.vertex(858,  46);   // 26
    p.endShape();
    p.pop();
  p.pop();
}


  p.windowResized = function() {
   p.resizeCanvas(p.windowWidth, p.windowHeight);
}

  p.drawLabelsTot = function(){
  //label wrapped total bars
  p.textFont('Khand');
  p.textAlign(p.RIGHT);
  p.noStroke();
  p.textSize(18);
  // text("Year", width-margin,height-margin+70);
  // text("Year", 1341-margin,747-margin+70);
  p.fill(77,77,77);
  p.textSize(26);
  // p.text("Modern & Contemporary Art Collection", 720,90);
  p.textSize(38);
  p.textStyle(p.BOLD);
  p.text("All 14,350 artworks", 450,90);
  // p.text("Met Modern & Contemporary Collection", 850-margin,165-margin+30);
  p.push();
  p.translate(0,50)
  p.textAlign(p.LEFT);
  p.textSize(16);
  p.text("Scale: 1 pixel = 2 artworks", 205,280);
  p.textAlign(p.RIGHT);
  p.textSize(26);
  p.text("14.13%", 190,120);
  p.text("75.44%", 190,150);
  p.text("0.89%", 190,180);
  p.text("9.18%", 190,210);
  p.text("0.36%", 190,240);


//// Add legend

    p.textFont('Khand');
    p.fill(179,118,244,140);  //f
    p.rect(205,100,25,25);
    p.fill(92,242,145,140); //m
    p.rect(205,130,25,25);
    p.fill(168,71,5,140);  //t
    p.rect(205,160,25,25);
    p.fill(165,160,152,140);   //u
    p.rect(205,190,25,25);
    p.fill(224,199,50,140);   //a
    p.rect(205,220,25,25);
    p.textStyle();
    p.textAlign(p.LEFT);
    // p.textSize(16);
    p.fill (77,77,77);
    // p.text("Artwork by a :", 132,90);
    p.textStyle(p.NORMAL);
    p.textSize(20);
    p.text("female", 237,117);
    p.text("male", 237,147);
    p.text("couple / collaborative with both genders",237,177);
    p.text("unknown",237,207);
    p.text("named, gender not yet identified",237,237);
    p.pop();
}
}

var myp5 = new p5(s, 'c2');

///////////////////////

// ////VERTICAL BARS TOTALS 

var t = function(p) {

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContG3final4sort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

  p.setup = function(){
    p.createCanvas(p.windowWidth, 5650);
    p.displaySingleBars();
    p.drawLabelsBar();
  }

  p.windowResized = function() {
   p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.displaySingleBars = function(){
    p.noStroke();
    p.fill(255,0,0);

  var x,y,w,h;

  var singleData = [52, 1318, 128, 10825, 2027];
//var fillBars = [(fill("#ededed"),("#5c5c5c"),("#e5e5o5"),("#f0f0f0"),("#000"))];

  var width = 5800,
   // var width = 11000,
       height = p.windowHeight,

        margin = 15,
        w = width - 2 * margin, // chart area width and height
        h = height - 2 * margin;
    
    var barWidth =  (h / singleData.length) * 0.15; // width of bar
    var barMargin = (h / singleData.length) * 0.2; // margin between two bars
    
    p.textFont('Khand');
    p.textSize(15);
  
  for(var b=0; b<singleData.length; b++) {
    p.push();  //save 
      //fill(fillBars);
     // fill(50,198,255, 80);
      p.fill(160,42,85, 160);
      p.noStroke();

      p.rotate(p.radians(90));   // rotate to vertical
      p.translate(0, b* (barWidth + barMargin)); // jump to the top right corner of the bar
      // rect(20, -windowWidth/1.5, singleData[b], barWidth);
      p.rect(20, -p.windowWidth/1.5, singleData[b]/2, barWidth/2); // draw rect
      p.fill(0,0,0);
      p.text(singleData[b], 21, barWidth/2 + -p.windowWidth/1.527); // write data label

/////////PERCENTAGES ARE NOT CORRECT
      p.textSize(13);
      // p.text((((singleData[b]/singleData.length)*100).toFixed(0)+'%'), 55, barWidth/2 + -p.windowWidth/1.525); // write data label
    p.pop();   // reset, restore
  } 
  }


  p.drawLabelsBar = function(){
 //label long bars
    p.textFont('Khand');
    p.textAlign(p.LEFT);
    p.noStroke();
    p.fill(77,77,77);
    p.textSize(32);
    p.textStyle(p.BOLD);
    // text("Year", width-margin,height-margin+70);
    // text("Year", 1341-margin,747-margin+70);
    p.text("Another View of All Artworks by Gender", 100,147-margin-10);
    p.textSize(26);
    p.textStyle(p.NORMAL);
    p.text("The Met Modern & Contemporary Collection", 100,165-margin+30);
    p.textStyle(p.BOLD);
    p.textSize(16);
    p.text("Scale: 1 pixel = 2 artworks", 100,186-margin+30);
  }

}

var myp5 = new p5(t, 'c3');


///////////

////try to show year # on hover
// function showInfo() {
//   // Check if mouse is inside the circle
//    if(dist(mouseX, mouseY, 1060, 200)<50) {
//       overBars = true;  
//     } 
//   else
//    {
//      overBars = false;
//     }
//     if(overBars == true){
//       show(barTotals, barTotals2);
//     } 
//     else {
//   }
// }

// function mouseOver(){
//   if(overBars == true){
//     show(barTotals, barTotals2);
//   }
// }

////////////////\\\\\\\\\\\\\\\\\



////////\\\\\\\\\\\==========================

/////========================================
// // ////WORKS TO DRAW Horizontal BAR CHART for totals 
// function displaySingleBar(){
//   noStroke();
//   fill(255,0,0);

// var x,y,w,h;

// var singleData = [2021, 10817, 128, 1314, 41];

// // x = 0;
// // y = (height*(j/gender[i]));
// // w = width/max(gender)*gender[i];
// // h = (height/gender.length)-5;

// // push();                    // <- push a drawing context
// //     translate(x,y);            // <- move to position
// //     rect(0,0,w,h);             // <- draw a rectangle
// //     fill(255);                 // <- change colors
// //     // text(gender[i],10,h/2);      // <- draw the label 
// //     pop();                     // <- reset the drawing context

//   var width = 1000, // canvas width and height
//       height = 350,
//       margin = 20,
//       w = width - 2 * margin, // chart area width and height
//       h = height - 2 * margin;
  
//   var barWidth =  (h / singleData.length) * 0.8; // width of bar
//   var barMargin = (h / singleData.length) * 0.2; // margin between two bars
  
//   createCanvas(width, height);
  
//   textSize(14);
  
//   push();
//   translate(margin, margin); // ignore margin area
  
//   for(var b=0; b<singleData.length; b++) {
//     push();
//     fill('green');
//     noStroke();
//     translate(0, b* (barWidth + barMargin)); // jump to the top right corner of the bar
//     rect(0, 0, singleData[b], barWidth); // draw rect

//     fill('#FFF');
//     text(singleData[b], 5, barWidth/2 + 5); // write data

//     pop();
//   }
  
//   pop();
// }

/////==============================

// ///=========max number of items by one artist 
/// using display name column 10 
  
//   var rows = table.getRowCount();

//   var displayName = {};
//   displayName.artist = table.getString(0,9);
//   displayName.items = table.findRows(String(displayName.artist),9);
//  append(ArtistColl, displayName);
 
//   maxArtistColl = 0;
//   maxArtist = null;
    


// for (var n=0; n<rows; n++) {
//       //var artist = int(table.getString(i,11));

//       var artist = (String(table.getString(n,9)));
//       if(artist!=displayName.artist){
//         var displayName = {};
//         displayName.artist = artist;
//         displayName.items =[];
//         displayName.items = table.findRows(String(displayName.artist),10);
//         append(ArtistColl, displayName);
//         // console.log(ArtistColl);
//         // console.log(ArtistColl)
//         if(displayName.items.length>maxArtistColl){
//           maxArtistColl = displayName.items.length;
//           maxArtist = ArtistColl.length-1;
//           console.log(maxArtist);
//           console.log(ArtistColl[maxArtist].items.length)
//           //maxArtistName = ArtistColl.length.ArtistColl;
//         }
//      }
// //      // console.log("thisis maxArtist" + maxArtist);
// //      // console.log("thisis ArtistColl length" + ArtistColl.length);
// //       // console.log("The artist" + ArtistColl[maxArtistColl].artist + " that has the most objects has " + ArtistColl[maxArtistColl].items.length + " items by " + (String(maxArtistColl.displayName)));
//   }
// console.log("The maximum number of artworks by one artist " + ArtistColl[maxArtist].artist + "by" + ArtistColl[maxArtist].items.length);

// // //   console.log("The artist" + ArtistColl[maxArtistColl].artist + " that has the most objects has " + ArtistColl[maxArtistColl].items.length + " items by " + (String(maxArtistColl.displayName)));
// // // };
// }

//============================



//=========
//to get all the rows
//warning: rows is an array of objects
//  for (var i=0; i<row.length; i++) {
//      rows[i].set('name', 'MetFullObjects');
      
// //show the results
//    var rows = table.getRows();
//    var span = createSpan(rows(i) + " | ");
//    // var span = createSpan(rows.getString(i) + " | ");

// //     if(objectName=="American Paintings and Sculpture") {
// //       span.addClass("highlight:yellow");
// //     }
  
  
//     console.log(rows);
//     console.log(column);
// }
// //===========


//=================
// //this works to get one column: table.get.String
//  for(var i=0; i<row; i++){
    
//  var objectName = table.getString(i,"Artist Display Name");
// //createSpan to show data on server
//    // var span = createSpan(objectName + " | ");
//    // if(objectName=="Clara Chipman Newton") {
//    //  span.addClass("highlighted");
//    // }

//    console.log(table.get(i, 14));
// }
//================


//=================
// //to get all the columns in a specific row: table.get.Row(1)
// 	for(var i=0; i<row; i++){
// 		 var row = table.getRow(10);
//   		//print it column by column
//   		//note: a row is an object, not an array
//   		for (var c = 0; c < table.getColumnCount(); c++) {
//     	console.log(row.getString(c));
//     	var span = createSpan(row.getString(c) + " | ");
//     }
// }
//================

//shows first row, 2nd column cell
		// console.log(table.get(i, 1));
//shows total number of rows
		// console.log(table.get(i,1));
    	
	
// }