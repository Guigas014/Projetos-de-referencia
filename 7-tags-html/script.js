document.addEventListener("DOMContentLoaded", () => {
  let 
  	progress = 0, 
    incrementSpeed = 1,
  	progressBar = document.getElementById('bar'),
    progressInterval = setInterval(() => {
     
      progress += incrementSpeed;
      progressBar.value = progress;
      console.log(progress)

      if(progress >= 100){
        clearInterval(progressInterval);
      }
    }, 100);
  
});
