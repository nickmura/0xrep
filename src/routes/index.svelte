<script>
import { goto } from "$app/navigation";



    function gotoBeta() {
        goto('/exams/general')
    }
</script>

<main>
    <h1>quiz.0xrep.com</h1>
    <p>
        0xreps is a community based initative researching effectiveness of educational and investigative tooling in 
        for anyone who wants to measure their learning progress, evaluate their understanding or discernment in preventing harm, or identify gaps in their knowledge of cryptocurrency. 
        Everyone is encouraged to review and submit knowledge, resources, information, and validate our resources provided, contributing to the 
        mission of this project. Our goals are to... 
    </p>

        <p>    
            <li>Provide concise and educational information for preventing crypto fraud</li>
            <li>Cover multiple aspects of knowledge for Ethereum (Transactions, Socialls, cryptography, solidity, infrastructure, etc)</li>
            <li>Provide a insightful educational resource, with dedication for providing the best quality information with the review of the community</li>
            <li>Encourage others to submit knowledge and support the initative, aswell as provide suggestions!</li>
            <li>Provide video demonstrations and flash card style exercises for various topics and levels of understanding</li>
            <li>Provide security challenges for users for different topics!</li>
        </p>
        <p>
            <b>The resources, and references used for this project..</b>
            <li>Herox.com/ScamShield (We built this Demo during the final hours of ScamShield Submission as a reference</li>
            <li><a href="https://ethereum.org/en/developers/docs/ "target="_blank">Ethereum.org</a> development documentation</li>
            <li><a href="https://docs.soliditylang.org/" target="_blank">Soliditylang.org</a> (Solidity) documentation</li>
        </p>
        

        <div class="beta">
            <i>Try a prototype of a basic comprehension test here!</i><button class='ml-3 btn btn-primary' on:click={gotoBeta}>Try beta test</button>
        </div>
        <div class="contact">
            <p><i><b>For any details or more questions, regards to contributing, please email dev@nickmura.ca</b></i></p>
        </div>

</main>


<style>
    .contact {
        font-size: 13px;
        margin-top: 60px;
        display: flex;
        justify-content: center;
    }
    main {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }

    @media (max-width: 767px) {
        main {
            padding: 15px;
        }
    }
</style>
