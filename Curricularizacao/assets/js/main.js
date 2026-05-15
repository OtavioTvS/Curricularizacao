import {
    esconderVidas,
    mostrarTela,
    irParaDados,
    finalizarDados,
    irParaInicio
} from "./ui.js";

import {
    inicializarDrag
} from "./drag.js";

import {
    inicializarOpcoes,
    iniciarJogo
} from "./quiz.js";

/* =========================
   BLOQUEIA VOLTAR
========================= */

history.pushState(
    null,
    null,
    location.href
);

window.onpopstate = function () {

    history.pushState(
        null,
        null,
        location.href
    );
};

/* =========================
   FUNÇÕES GLOBAIS
========================= */

window.iniciarJogo =
    iniciarJogo;

window.irParaDados =
    irParaDados;

window.finalizarDados =
    finalizarDados;

window.irParaInicio =
    irParaInicio;

/* =========================
   INICIALIZAÇÃO
========================= */

window.onload = function () {

    esconderVidas();

    mostrarTela("Inicio");

    inicializarDrag();

    inicializarOpcoes();
};