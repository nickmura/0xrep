<script>
    import {
		accountChainId,
		connected,
		connectMetamask,
		connectWalletConnect,
		disconnect,
		walletAddress,
        accountProvider,
    } from '$lib/stores/provider';
    import { ethers } from "ethers"
	import { balanceOnBlock } from '$lib/stores/state';
	import { formatEther } from 'ethers/lib/utils';
	let src = 'https://raw.githubusercontent.com/nickmura/multi-sig-wallet/main/img/metamask-logo-black-and-white.png'

    import questions_l from './questions.js'
    import countCategory from './questions'
    let { questions } = questions_l
    import { results } from './results/result_store.js'

    import { goto } from '$app/navigation'
    import { browser } from '$app/env'
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';

    





    var validSubmit
    var resultStorage

    let visible = true
    let ifNewInstance = false
    let lastInstance = false
    


    console.log(countCategory)
    onMount(() => {
		resultStorage = JSON.parse(localStorage.getItem('results')) // Checks if user has completed the test already, via localStorage (results stored in localStorage)
    });

    

    const getResults = () => { //Submits user answers to store
        results.set(questions.map(question => {
            const isValid = question.selectedAnswer && question.selectedAnswer === question.correctAnswer ? true : false
            var isEmpty = !question.selectedAnswer ? true : false // So it doesn't think a question is invalid on startup.
            return {...question, isValid, isEmpty}
        }))

        if ($results.every(result => result.selectedAnswer != '')) {
            var persist = results.subscribe((result) => browser && localStorage.setItem("results", JSON.stringify(result)))
            results.set(JSON.parse(localStorage.getItem('results')))
            validSubmit = true
            goto('/exams/general/results')
        } else {
            validSubmit = false
        }

        const invalidAnswer = document.querySelector('.invalidanswer')
        if (validSubmit) return;
        invalidAnswer.scrollIntoView({
            behavior: 'smooth'
            })
    }

    async function getInstance() {
        let signer = new ethers.providers.Web3Provider($accountProvider).getSigner()
        const instance = await signer.signMessage('Get an instance of the beta comprehension test - ETHexams.com')
        visible = true
        ifNewInstance = true // Provides the prompt to get a new instance.
        lastInstance = true // Checks if there was a past instance, to get rid of the other prompt
        
    }


</script>

<main>
    <div>
        <!--<div class="flex justify-end">
            
        {#if $connected && !lastInstance}
            <button class="btn btn-primary ml-auto" on:click={getInstance}>Get instance</button>
            <button class="btn btn-primary ml-auto" style="background-color: rgb(13, 182, 0);" on:click={connectMetamask}>Connected</button>
            <div style="color: grey; margin-top: 1rem;"><i>To start the test, click the 'Get instance' button and sign a message on any network.</i></div>
            <hr> 
        {/if}
        {#if !$connected}
            <button class="btn btn-primary ml-auto" on:click={connectMetamask}>Connect metamask</button>
            <div style="color: grey; margin-top: 1rem;"><i>Connect to metamask and sign a message to recieve an instance of the test.</i></div>
        {/if}

        {#if $connected && ifNewInstance && lastInstance}
        <button class="btn btn-primary ml-auto" on:click={getInstance}>Get new instance</button>
        <button class="btn btn-primary ml-auto" style="background-color: rgb(13, 182, 0);" on:click={connectMetamask}>Connected</button>
        <div style="color: grey; margin-top: 1rem;"><i>To start a new instance of the test, click the 'Get new instance' button and sign a message on any network.</i></div>
        <hr> 
        {/if}
        </div>
    </div>-->

    {#if visible}
    <!--<div in:fade={{ duration: 3000 }}>-->
        {#if resultStorage != null}
            <div style="color: grey; margin-top: 1rem;"><i>I notice you've already taken the test. Feel free to take it again, or see your results <a href='/exams/general/results'>here</a>.</i></div>
        {/if}
        <div class='choosebest' style='color: grey; margin-top: 1rem;'><i>Please choose the best answer for all of the following questions.</i></div>
        <div class='invalidsubmit'>{validSubmit === false ? 'Please answer all of the questions to submit.' : '' }</div>
        {#each questions as q,i} <!-- q for question objects, i for result objects -->
            <div id="question" class={q.isEmpty === true ? '' : ''}>

                <form>

                    <h2 style='font-size:larger' class={($results[i] && $results[i].isEmpty === true) ? 'invalidanswer' : ''}>{q.question}</h2> <!-- if results.selectedAnswer is empty, add styling to specific question -->
                    {#each q.answers as a}
                        <div style="margin-bottom: 3px;" >
                            <input type='radio' value={a} bind:group={q.selectedAnswer}> {a}
                        </div>
                    {/each}

                </form>
            </div>
        {/each}
        <button class='btn btn-primary' on:click={getResults}>Submit</button>
    <!--</div>-->
    {/if}
</main>

<style>
    main {
        margin-left: 1.5rem;
    }

    #question {
        width: 75%;
    }
    .btn-primary { margin-top: 1rem; }


    .invalidsubmit {
        margin-top: 1rem;
        color: red;
    }

    .invalidanswer { color: rgb(187, 176, 21) }
    input {
        margin-top: 0.6rem;
    }

</style>