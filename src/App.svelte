<script>
import Valor from './Valor.svelte';
</script>

<main>
    <h1>Calculadora de SC</h1>
    <p>Esta calculadora foi feita para ajudar na cadeira de Sistemas de Computação.</p>
    <p>Permite converter valores em qualquer base, calcular complementos para 2 de qualquer tamanho, e calcular a representação IEEE 754 de qualquer número.</p>

    <Valor></Valor>

    <hr/>
    <footer>
        Desenvolvido por <a href="https://github.com/pta2002">Pedro Alves</a>.<br>
        <a href="https://github.com/pta2002/sccalc">Ver no GitHub</a>
    </footer>
</main>

<style>
    main {
        padding: 1em;
        max-width: 700px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
    }

    hr {
        border-color: darkgray;
    }

    footer {
        font-size: .9rem;
    }
</style>