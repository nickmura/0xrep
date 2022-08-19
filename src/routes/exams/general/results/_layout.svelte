<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { results } from './result_store.js'
  import { browser } from '$app/env'
  
  var score
  var total
  var percent
  onMount(() => {

      if ($results[0].selectedAnswer) { 
          var persist = results.subscribe((val) => browser && localStorage.setItem("score", JSON.stringify(val))) // saves results/answer to localStorage
          var parsed = JSON.parse(localStorage.getItem('score'))
          console.log(parsed)
          var allAnswers = parsed.map(obj => obj.selectedAnswer);
          console.log(allAnswers)

          score = document.querySelectorAll('.valid').length
          total = (document.querySelectorAll('.invalid').length + score)
          percent = (score / total) * 100
      }
      if (allAnswers) {
          results.set(parsed)
          console.log(allAnswers)
      }
      if (!parsed) {
          console.log(allAnswers)
          goto('/')
      }
  } )    
  onDestroy(() => {
    localStorage.setItem('myData', JSON.stringify($results))
  })


    onMount(() => {
        var parsed = JSON.parse(localStorage.getItem('results'))
        if (JSON.parse(localStorage.getItem('results') != null)) {
            results.set(JSON.parse(localStorage.getItem('results')))
            var allAnswers = parsed.map(obj => obj.selectedAnswer);
            var score = parsed.map(obj => obj.selectedAnswer);
            console.log(parsed)
            /**correct = document.querySelectorAll('.valid').length
            total = allAnswers.length
            percent = (correct / total) * 100/*/
        }
    })
  </script> 

