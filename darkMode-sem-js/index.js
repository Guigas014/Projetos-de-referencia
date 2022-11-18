document.querySelectorAll('input[type="radio"]').forEach((input) => {
 input.onclick = function() {
 console.log("teste")

 document.documentElement.classList.value = ""
 document.documentElement.classList.add(input.id)
 }
})


