import { state }
    from "./state.js";

/* ===================================================
   ESCONDER TODAS AS TELAS
=================================================== */

export function esconderTelas() {

    const telas =
        document.querySelectorAll(".tela");

    telas.forEach(function (tela) {

        tela.classList.remove("ativa");

        setTimeout(function () {

            if (
                !tela.classList.contains("ativa")
            ) {

                tela.style.display = "none";
            }

        }, 450);
    });
}

/* ===================================================
   MOSTRAR TELA COM TRANSIÇÃO
=================================================== */

export function mostrarTela(id) {

    esconderTelas();

    const el =
        document.getElementById(id);

    if (el) {

        el.style.display = "flex";

        el.scrollTop = 0;

        requestAnimationFrame(function () {

            el.classList.add("ativa");
        });
    }
}

/* ===================================================
   VIDAS
=================================================== */

export function mostrarVidas() {

    const vidas =
        document.querySelector(".vidas");

    if (vidas) {

        vidas.style.display = "flex";
    }
}

export function esconderVidas() {

    const vidas =
        document.querySelector(".vidas");

    if (vidas) {

        vidas.style.display = "none";
    }
}

export function atualizarVidas() {

    const vidas =
        document.querySelectorAll(".vida");

    for (let i = 0; i < vidas.length; i++) {

        vidas[i].classList.remove(
            "perdida"
        );
    }

    for (
        let i = state.tentativas;
        i < 3;
        i++
    ) {

        if (vidas[i]) {

            vidas[i].classList.add(
                "perdida"
            );
        }
    }
}

/* ===================================================
   NAVEGAÇÃO
=================================================== */

export function irParaDados() {

    mostrarTela("dados");
}

export function finalizarDados() {

    const campos = [
        "nomeAluno",
        "idadeAluno",
        "escolaAluno"
    ];

    for (
        let i = 0;
        i < campos.length;
        i++
    ) {

        const el =
            document.getElementById(
                campos[i]
            );

        if (el) {

            el.value = "";
        }
    }

    mostrarTela("Inicio");

    esconderVidas();
}

export function irParaInicio() {

    mostrarTela("Inicio");

    esconderVidas();
}