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

///////wrapped bars NEW FINAL
var s = function(p){

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
   p.table = p.loadTable('assets/ModContGenderfinalazsort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

  p.setup = function(){
    p.createCanvas(p.windowWidth,830);
    p.drawLabelsTot();

    // p.background(100,05);
      
    p.push(); ;
    p.translate(350,100);

    p.push();
    p.stroke(92,242,145,145);
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape(); 

    p.vertex(20,172);   // total m/2 = 10829/2 = 5414.5
    p.vertex(900,172);   //  880
    p.vertex(900, 400);   //  228
    p.vertex(830, 400);   //70
    p.vertex(830, 240);   //160
    p.vertex(705, 240);   //125
    p.vertex(705, 280);   //40
    p.vertex(110, 280);   //595
    p.vertex(110, 316);    //36
    p.vertex(75, 316);   //35
    p.vertex(75, 346);   //30
    p.vertex(30, 346);   //45  ///2244
    p.vertex(30, 390);   //44
    p.vertex(120, 390);  //90
    p.vertex(120, 350);  //40
    p.vertex(160, 350);  //40
    p.vertex(160, 320);  //30
    p.vertex(750, 320);  //590
    p.vertex(750, 280);  //40
    p.vertex(795, 280);  //45  ///3163


    p.vertex(795, 360);  //80
    p.vertex(200, 360);  //595
    p.vertex(200, 385);  //25
    p.vertex(160, 385);  //40  
    p.vertex(160, 425);  //40  //3943
    p.vertex(30, 425); // 130
    p.vertex(30, 470);  //45
    p.vertex(200, 470);  //170  //4288
    p.vertex(200, 425);  //45
    p.vertex(240, 425); //40
    p.vertex(240, 395); //30   
    p.vertex(795, 395); //555  //4958
    p.vertex(795, 435);  //40  //4998
    p.vertex(900, 435); //105
    p.vertex(900, 475);  //40
    p.vertex(755, 475);  //145  //5288
    p.vertex(755, 435);  //40   //5328
    p.vertex(668.5, 435);  //86.5    ////5414.5    
    p.endShape();  
    p.pop();

    p.push();
    p.stroke(179,118,244,145);
    // stroke(153,50,204,80); //total f/2 = 2027/2 = 1013.5
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20, 208);   //  
    p.vertex(864,  208);   //844
    p.vertex(864,  377.5);   //169.5  //1013.5
    p.endShape();
    p.pop();

    p.push();
    p.stroke(165,160,152,145);  //total u unknown 1318/2 = 659
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20,244);   //  
    p.vertex(679,244);   // 659
    p.endShape();
    p.pop();

    p.push();
    p.stroke(168,71,5,145); //total t couple/collab 128/2 = 64
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20, 280);   //  
    p.vertex(84, 280);   //64 = 64
    p.endShape();
    p.pop();

    p.push();
    p.stroke(224,199,50,145);  //total z to find out 48/2 = 24
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20, 316);   //  
    p.vertex(46, 316);   // 26
    p.endShape();
    p.pop();
  p.pop();
}


  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

  p.drawLabelsTot = function(){

    p.push(); 
  //label wrapped total bars
    p.textFont('Khand');
    p.textAlign(p.RIGHT);
    p.noStroke();
    p.textSize(18);
    p.fill(77,77,77);
    p.textSize(44);
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT);
    p.text("Gender at The Met", 370,95);
    p.textSize(28);
    p.text("What % of the Modern & Contemporary Art Collection's 14,350 works are by women?", 370,132);
    p.textSize(20);
    p.text("1 pixel = 2 artworks", 370,160);
    p.pop();

    p.push();
    p.translate(120,150)
    p.textFont('Khand');
    p.textAlign(p.RIGHT);
    p.noStroke();
    p.fill(77,77,77);
    p.textSize(21);
    p.text("75.46%", 226,129);
    p.textSize(29);
    p.text("14.13%", 228,166.5);
    p.textSize(21.5);
    p.text("9.18%", 225,201.5);
    p.textSize(21);
    p.text("0.89%", 225,237.75);
    p.textSize(21);
    p.text("0.33%", 225,274);

//// Add legend

    p.textFont('Khand');
    p.textStyle();
    p.textAlign(p.RIGHT);
    p.noStroke();
    p.fill (77,77,77);
    p.textStyle(p.NORMAL);
    p.textSize(19);
    //////need to add 
    p.text("male", 165,129);
    p.textSize(29);
    p.text("female", 162,166.5);
    p.textSize(19);
    p.text("unknown",165,201.5);
    p.text("couple/collaborative, both genders",165,237.75);
    p.text("named, gender not yet identified",165,274);


    p.pop();
  }
}

var myp5 = new p5(s, 'canvas-zigzag');



// $("div#c2").append('<a href="' + "https://churc.github.io/MajorStudio1/MetProjects/gender" + "c2" + '</a>');


///////////\\\\\\\\\\\

////////Chart items by YEAR TIMELINE

var w = function(p) {


  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
   p.table = p.loadTable('assets/ModContGenderfinalzasort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

   p.setup = function(){
     p.createCanvas(1440,930);
      // p.createCanvas(1440,930);
     // p.background(100,10);
     p.analyzeData();
     p.analyzeGender();
     p.displayData();
     p.drawLabelsCh();
     p.noLoop();

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
    var todo = p.table.findRows('z', 10);
    console.log(todo);

// ///=======gives the YEARS w/ the MAX & MIN NUMBER OF OBJECTS 
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
           minYear = allYears.length-1;
        }
     }
  }
 

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
console.log(mxYear);
     }
console.log("Number of artworks since 1850 is " + midYears.length + " the year with the most artworks 1850 -2017 is " + mxYear);

  }
}
////====================

// /======TOTAL NUMBER of FEMALE, MALE, TWO, UNKNOWN artists
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

   } else if (gender === 'z') {
    // console.log('z');
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

///DISPLAY PER YEAR by GENDER
  p.displayData = function(){

  /////move chart over

  p.push();
  p.translate(90,30);

  p.scale(0.89);
// p.scale(0.7);
  p.noStroke();
  p.fill(255,0,0);

  for(var i=0; i<allYears.length; i++){
//// years use map incoming value and range

    var x = p.map(allYears[i].year,1850,allYears[allYears.length-1].year, margin, 1341-margin);

    var totalFemaleArtistsPerBar = 0;
    var totalMaleArtistsPerBar = 0;

  ///then do same for y height
  for(var j=0; j<allYears[i].items.length; j++){
      var y= p.map(j,0,maxObjects,747-margin, margin);

///====FILL BY GENDER
   var gender = allYears[i].items[j].obj.Gender;
    if (gender === 'm') {
       p.fill(92,242,145,170);
       p.rect(x-2,y-1,5,2);
       // console.log('m');
       totalMaleArtistsPerBar = totalMaleArtistsPerBar + 1;

    } else if (gender === 'f') {
       p.fill(179,118,244,170);
       p.rect(x-2,y-1,5,2);
       // console.log('f');
      totalFemaleArtistsPerBar = totalFemaleArtistsPerBar + 1;
     // console.log(totalFemaleArtistsPerBar);
    } else if (gender === 't') {
       p.fill(168,71,5,170);
       p.rect(x-2,y-1,5,2);
      // console.log('t');
      
    } else if (gender === 'u') {
       p.fill(165,160,152,170);
       p.rect(x-2,y-1,5,2);
       // console.log('u');

    } else if (gender === 'z') {
       p.fill(224,199,50,170);
       p.rect(x-2,y-1,5,2);
       //console.log('z');

    } else {
       p.fill(100,100);
       p.rect(x-2,y-1,5,2);
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
  p.pop();
}


  p.drawLabelsCh = function(){
    p.push();
    p.translate(90,30);

    p.scale(0.89);
    // p.scale(0.7);

   //x axis
    p.textFont('Khand');
    p.textSize(17);
    p.stroke(77,77,77);

   //just the lines
    p.line(margin,747-margin,1350-margin,747-margin);
    p.noStroke();
    p.textAlign(p.CENTER);

  // draw the sections and add text for each section
   //go throught the years
for(var i=1850; i<=2017; i+=10){

   var y = 747-margin+30;

   var x = p.map(i,1850,2017, margin, 1341-margin);

    p.noStroke();
    p.fill(77,77,77);
    p.text(i, x, y);
    p.stroke(77,77,77);
    p.strokeWeight(1);
    p.line(x,y-25,x, y-30);
  }

// label the whole axis
  p.textFont('Khand');
  p.textAlign(p.RIGHT);
  p.noStroke();
  p.textSize(21);
  p.text("Year: Object Begin Date", 990,780);

//source
  p.textAlign(p.LEFT);
  p.noStroke();
  p.textSize(18);
  p.text("Source: MetObjects.csv, January 2018, spreadsheet shared with The New School.", margin-15,747-margin+105);
  p.text("Modern & Contemporary Art Collection Department, 14,350 artworks. Object Begin Date, Gender identified by Artist Display Name, 1850-2017 (14,284 artworks)", margin-15,747-margin+135);

////draw the y Axis
  p.stroke(77,77,77);
  p.line(margin,747-margin,margin,margin);

  p.noStroke();
  p.textAlign(p.RIGHT);
  p.textStyle(p.NORMAL);

  for(var i=0; i<maxObjects; i+=50){
    var x = margin-20;
    var y = p.map(i,0, maxObjects,747-margin, margin);
      p.noStroke();
      p.fill(77,77,77);
      p.text(i, x+3, y+4);
      p.stroke(77,77,77);
      p.strokeWeight(1);
      p.line(x+15,y,x+20,y);
  }

  p.push();
  p.translate(65,0);
  p.textFont('Khand');
  p.noStroke();
  p.textSize(22);
  p.translate(1000,700);
  p.rotate(p.radians(270)); 
  p.text("Number of Artworks", margin+300,margin-1135);
  p.pop();

////the overall title
  p.push();
  p.translate(50,-40);
  // p.translate(65,0);

p.push();
p.translate(37,0);
  p.stroke(112,112,112);
  p.noFill();
  p.ellipse(355.5,251,5,5);
  p.line(357,250,400,240);
  p.textFont('Khand');
  p.textStyle(p.NORMAL);
  p.noStroke();
  p.textAlign(p.LEFT);
  p.fill(112,112,112);
  p.textSize(15);

  p.text("1900 spike: many are artist unknown, manufacturing companies", 410, 240);
  p.text("female artworks dated 1900 include work by Anni Albers, Margarete Willers & Hilde Reindl", 410, 255);
  p.fill(77,77,77);
  p.textSize(40);
  p.text("",540,110);
  // p.text("What year were these artworks made?",540,110);
p.pop();

p.push();
p.translate(6,4);
  p.stroke(112,112,112);
  p.noFill();
  p.ellipse(710,608,5,5);
  p.line(710,607,740,535);
  p.fill(112,112,112);
  p.textFont('Khand');
  p.textStyle(p.NORMAL);
  p.textAlign(p.LEFT);
  p.noStroke();
  p.textSize(15);
  p.text("1947 female spike include artworks by Dorothy Liebes & Eva Zeisel", 740,527);
  // p.text("women as by men", 1250,653);
p.pop();
  p.stroke(112,112,112);
  p.noFill();
  p.ellipse(810.5,642,5,5);
  p.line(811,639.5,854,570);
  p.fill(112,112,112);
  p.textFont('Khand');
  p.textStyle(p.NORMAL);
  p.textAlign(p.LEFT);
  p.noStroke();
  p.textSize(15);
  p.text("1959 couple / collaborative spike: many are artworks by", 860,570);
  p.text("Ada Louise Huxtable & Garth Huxtable", 860,585);

p.push();
p.translate(-28.5,-8);
  p.stroke(112,112,112);
  p.noFill();
  p.ellipse(1193,693.5,5,5);
  p.line(1194.5,691,1243,635);
  p.fill(112,112,112);
  p.noStroke();
  p.textSize(15);
  p.text("2010: more artworks with", 1250,638);
  p.text("object begin date by women", 1250,653);
  p.text("than by men (16 to 11)", 1250,668);

  // p.fill(77,77,77);
  // p.textSize(26);
  // p.text("The Met Modern & Contemporary Art Collection", 500,120);
  // p.textSize(38);
  p.pop();
p.pop();

///legend
    p.textFont('Khand');
    p.noStroke();
    p.fill(179,118,244,140);  //f
    p.rect(100,220,25,25);
    p.fill(92,242,145,140); //m
    p.rect(100,190,25,25);
    p.fill(168,71,5,140);  //t
    p.rect(100,160,25,25);
    p.fill(165,160,152,140);   //u
    p.rect(100,130,25,25);
    p.fill(224,199,50,140);   //a //z
    p.rect(100,100,25,25);
    
    p.textStyle();
    p.textAlign(p.LEFT);
    p.fill (77,77,77);
    p.textStyle(p.NORMAL);
    p.textSize(18);
    p.text("named, gender not yet identified", 132,117);
    p.text("unknown", 132,147);
    p.text("couple / collaborative with both genders",132,177);
    p.text("male",132,207);
    p.textSize(25);
    p.text("female",132,242);


    p.pop();
  }
  
}

var myp5 = new p5(w, 'canvas-timeline');

