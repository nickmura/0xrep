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
    let { questions } = questions_l
    import { results } from './results/result_store.js'

    import { goto } from '$app/navigation'
    import { browser } from '$app/env'
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';




    var validSubmit
    var resultStorage
    let visible = false



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
            goto('/results')
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
        let signer = $accountProvider.getSigner()
        console.log($accountProvider.connection)
        //signer.signMessage('test')

    }

</script>

<main>
    <div>
        <div class="flex justify-end">
            <!--<button class="btn btn-primary ml-auto" on:click={testInstance}>Get exam instance</button>-->
        {#if $connected}
            <button class="btn btn-primary ml-auto" on:click={getInstance}>Get instance</button>
            <button class="btn btn-primary ml-auto" style="background-color: rgb(13, 182, 0);" on:click={connectMetamask}>Connected</button>  
        {/if}
        {#if !$connected}
            <button class="btn btn-primary ml-auto" on:click={connectMetamask}>Connect metamask</button>
        {/if}
        </div>
    </div>

    {#if $connected}
    <div in:fade={{ duration: 1000 }}>
        {#if resultStorage != null}
            <div style="color: grey; margin-top: 1rem;"><i>I notice you've already taken the test. Feel free to take it again, or see your results <a href='/results'>here</a>.</i></div>
        {/if}
        <div class='choosebest' style='color: grey; margin-top: 1rem;'><i>Please choose the best answer for all of the following questions.</i></div>
        <div class='invalidsubmit'>{validSubmit === false ? 'Please answer all of the questions to submit.' : '' }</div>
        {#each questions as q,i} <!-- q for question objects, i for result objects -->
            <div id="question" class={q.isEmpty === true ? '' : ''}>

                <form>

                    <h2 style='font-size:larger' class={($results[i] && $results[i].isEmpty === true) ? 'invalidanswer' : ''}>{q.question}</h2> <!-- if results.selectedAnswer is empty, add styling to specific question -->
                    {#each q.answers as a}
                        <div style="margin-bottom: 3px;">
                            <input type='radio' value={a} bind:group={q.selectedAnswer}> {a}
                        </div>
                    {/each}

                </form>
            </div>
        {/each}
        <button class='btn btn-primary' on:click={getResults}>Submit</button>
    </div>
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