<script>
    import { onMount, beforeUpdate } from 'svelte';

    import { goto } from '$app/navigation';
    import { results } from './result_store.js'
    import { browser } from '$app/env'
    
    var resultStorage
    var correct
    var total
    var percent

    
    beforeUpdate(() => {
        if (localStorage.getItem('results') === null) {
            goto('/')
        }
		});

    onMount(() => {
        resultStorage = JSON.parse(localStorage.getItem('results'))
        if (resultStorage != null) {
            results.set(JSON.parse(localStorage.getItem('results'))) // Writes store as results from localStorage.

            //var allAnswers = resultStorage.map(obj => obj.selectedAnswer);
            var scores = resultStorage.map(obj => obj.isValid); // Provides boolean(s) if user answer is correct, and stores all of them in an array.
            correct = scores.filter(answer => answer==true).length // Sees how many answers are correct
            total = scores.length // Sees how many total questions there are
            percent = (correct / total) * 100 // Derives percent of score.

        }
    })


    
    </script>
    
    
    <main>
    <div>
        {#if resultStorage != null}
            <div id='score' class={(correct / total * 100) >= 80 ? 'valid' : (correct / total * 100) > 50 ? 'meh' : (correct / total * 100) < 50 ? 'invalid' : ''}>Your score was {correct}/{total}, or {percent}% as a percentage. {(correct / total * 100) === 100 ? 'Well done! Superstar!' : (correct / total * 100) >= 80 ? 'Nice!' : (correct / total * 100) < 50 ? '' : 'Give it another shot.'}</div>
        {/if}
        {#each $results as q}
        <div id="question" class={q.isValid === true ? 'valid' : 'invalid'}>
            <form>
                <h2>{q.question}</h2>

                <div id='explain'> <!-- provides styling for either correct or incorrect answers-->

                    
                        <details class='dropdown'>
                            <summary>{q.dropdown}</summary>
                            <hr>
                            <p style="color: grey">{@html q.explanation}</p>
                        </details>

                </div>
                {#each q.answers as a}
                    <div style="color: #24292f;">
                        <input type='radio' value={a} bind:group={q.selectedAnswer} disabled>{a}
                    </div>
                {/each}
            </form>
        </div>
        {/each}
    </div>
    </main>
    
    
    <style>
        main {
            margin-left: 1.5rem;
        }


        #question {
        width: 75%;
        }
        /**#resultdiv {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s linear 300ms, opacity 500ms;
        }*/


        .valid { color: rgb(26, 151, 26); }
    
        .invalid { color: rgb(251, 103, 103); }
        .meh {color: darkorange; }
    
        #explain {
            padding-left: 0.5rem;
            max-width: 800px;
        }
    
        .dropdown {
            cursor: pointer;
            list-style: none;
        }
    
        hr {
            margin-top: 1rem;
            margin-bottom: 1rem;
            height: 1px;
            width: 200px;
        }
        #score {
            margin-top: 1rem;
        }

    </style>