function setup() {
  canvas = createCanvas(350, 280);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.center();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw(){
  image(video, 0, 0, 350, 280);
  classifier.classify(video, gotResult);
}

function modelLoaded(){
  console.log("Model Loaded!");
}

var previousResult = " ";

function gotResult(error, results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
      console.log(results);
      previousResult = results[0].label;
      synth = window.speechSynthesis;
      speak_data = 'Object detected is ' + results[0].label;
      uttarthis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(uttarthis);

      document.getElementById("object").innerHTML = results[0].label;
      document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}