
var results;
var cloudWords =[];
var cloudCounts = [];



function getData(callback){
  $.get("/scrape", function(data) {
    results = data;
      console.log("getting data")
      callback()
  });
}

function dataTransform(){
  console.log(results)
  console.log(results.length)
  // console.log(results[0].split)

  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

cloudWords = results.filter( onlyUnique )

var conj = ["and","of","with", "or", "but", "in", "to", "the", "on", "at", "by", "for", "says", "say", "after", 
            "from", "is", "as", "are", "The", "a", "this", "I", "be", "when", "these" ]

for (i=0; i<conj.length; i++){
  for (n=0; n<cloudWords.length; n++){
    if (conj[i] == cloudWords[n]){
      cloudWords.splice(n, 1)
    }
  }
}

console.log(cloudWords)

for (i =0; i<cloudWords.length; i++){
  cloudCounts.push(0);
 for (n=0; n<results.length; n++){
   if (results[n] == cloudWords[i]){
     cloudCounts[i] = cloudCounts[i] + 1
   }
 }
}
console.log(cloudCounts)

var wordDisplay = [{text: ' ', size: 15}]
  
for (i= 0; i<cloudWords.length; i++){
    var obj = {} 
    obj['text'] = cloudWords[i];
    obj['size'] = cloudCounts[i]
    wordDisplay.push(obj)
}
console.log(wordDisplay)
    
d3.wordcloud()
.size([800, 400])
.selector('#wordcloud')
.words(wordDisplay)
.start();
}

$("#button").on("click", function(event) {
    event.preventDefault();
  
    getData(dataTransform)
  
  });

 
  
