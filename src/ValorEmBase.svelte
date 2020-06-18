<h5 class="card-title">Representação em base <input type="number" min="2" max="36" step="1" bind:value={repr.base}></h5>
<!-- TODO spaces between numbers, separators, etc -->
<pre>{ showNum(number, repr.base) }</pre>
<!-- TODO show tips about 2's and 1's complement -->

<style>
    pre {
        margin-bottom: 0;
    }

    input {
        width: 4rem;
    }
</style>

<script>
    import {showNum} from './helper';

    export let repr, number;
</script>