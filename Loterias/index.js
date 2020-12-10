// Calcula os possíveis jogos da Lotofácil
const numbers = []
let sequence = []
let cont = 1
//const name = document.querySelector('.nome')


function getNumbers() {
   let inc = 1
   
   while (inc <= 60) {
       numbers.push(inc)
       inc++
   }
  console.log(numbers)
   return numbers
}


function sorteio() {
    getNumbers()

    const option = 15
    
    switch (option) {
        case 15: {
            console.log(15 + ' OK')
            getSequence(6)
            break
        }
        case 16: {
            console.log(16 + ' OK')
            break
        }
        case 17: {
            console.log(17 + ' OK')
            break
        }
        case 18: {
            console.log(18 + ' OK')
            break
        }
        case 19: {
            console.log(19 + ' OK')
            break
        }
        case 20: {
            console.log(20 + ' OK')
            break
        }
        default: {
            console.log('Opção inválida')
            break
        }
    }
    return "sorteio ok"
}


function getSequence(num) {
    sequence = Array(num).fill(1)
    console.log(sequence)
    let inc = 1
    sequence[num-1] = 0
    let sub1 = 1
    let sub2 = 2

    console.log(sequence.length)

    while (sequence[0] <= numbers.length) {

      for (let inc1 = 1; inc1 < num; inc1++) {
        if (sequence[num-sub1] > numbers.length) {
          sequence[num-sub1] = 1
          sequence[num-sub2]++

          sub1++
          sub2++
        }
      }  

      if (sub1 <= num+1 && sub2 <= num+2) {
        sub1 = 1
        sub2 = 2
      }

        //Fazer o teste
        //testSequence()
        teste2()

      /*if (teste2()) {
        console.log(inc + ") " + sequence)
        inc++
      }*/

        /*console.log(inc + ") " + sequence)
        inc++*/
        sequence[num-sub1]++
    }

    

}

/*function testSequence() {

  const str1 = sequence[3]!=sequence[2] && sequence[3]!=sequence[1] && sequence[3]!=sequence[0] 
  //console.log(str1)

 [> if (sequence[5]!=sequence[4] && sequence[5]!=sequence[3] && sequence[5]!=sequence[2] && sequence[5]!=sequence[1] && sequence[5]!=sequence[0]<]
[>  if (sequence[4]!=sequence[3] && sequence[4]!=sequence[2] && sequence[4]!=sequence[1] && sequence[4]!=sequence[0]<]
  if (str1 
  && sequence[2]!=sequence[1] && sequence[2]!=sequence[0]
    && sequence[1]!=sequence[0]) {

    console.log(cont + ") " + sequence)
    cont++
  } 

}*/

function teste2() {
  let teste


    for (let inc2 = 0; inc2 <= (sequence.length - 1); inc2++) {
      //console.lo\g(sequence)
      let vet = sequence.filter((value, index) =>  {
        if (index != inc2) {
          return value
        } 
      })
      //console.log(vet)

      let result = vet.every(value => sequence[inc2] != value)
       if (result == true) {
        teste = result 
      }
      else {
        teste = false
        break
      }
  }
  

  if (teste == true) {
    console.log(cont + ") " + sequence)
    cont++
  } 
  /*else {
    console.log('erro') 
  }*/
}


//console.log(getNumbers())
console.log(sorteio())


