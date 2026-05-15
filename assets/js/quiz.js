import {
    perguntas
} from "./perguntas.js";

import {
    state
} from "./state.js";

import {
    mostrarTela,
    atualizarVidas,
    esconderVidas,
    mostrarVidas
} from "./ui.js";

import {
    embaralhar
} from "./utils.js";

import {
    resetarDragItems
} from "./drag.js";

export function iniciarJogo() {

    state.perguntaAtual = 0;

    state.tentativas = 3;

    state.jogoVencido = false;

    embaralhar(perguntas);

    resetarDragItems();

    mostrarVidas();

    atualizarVidas();

    mostrarTela(
        perguntas[state.perguntaAtual]
    );
}

export function responder(
    acertou,
    elemento
) {

    if (elemento) {

        const opcoes =
            elemento.parentElement.querySelectorAll(".opcao");

        opcoes.forEach(function (opcao) {

            opcao.classList.add(
                "desabilitado"
            );
        });

        elemento.classList.add(
            acertou
                ? "correta"
                : "errada"
        );
    }

    setTimeout(function () {

        if (acertou) {

            state.perguntaAtual++;

            if (
                state.perguntaAtual <
                perguntas.length
            ) {

                mostrarTela(
                    perguntas[state.perguntaAtual]
                );

            } else {

                esconderVidas();

                state.jogoVencido = true;

                mostrarTela(
                    "acertou"
                );
            }

        } else {

            state.tentativas--;

            atualizarVidas();

            if (
                state.tentativas <= 0
            ) {

                esconderVidas();

                state.jogoVencido = false;

                mostrarTela(
                    "errou"
                );
            }
        }

        document
            .querySelectorAll(
                ".correta, .errada, .desabilitado"
            )
            .forEach(function (el) {

                el.classList.remove(
                    "correta",
                    "errada",
                    "desabilitado"
                );
            });

    }, 500);
}

export function inicializarOpcoes() {

    const opcoes =
        document.querySelectorAll(".opcao");

    opcoes.forEach(function (opcao) {

        opcao.addEventListener(
            "click",
            function () {

                const acertou =
                    this.dataset.correta === "true";

                responder(
                    acertou,
                    this
                );
            }
        );
    });
}