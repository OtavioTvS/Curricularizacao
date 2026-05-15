let feedbackTimeout = null;

export function mostrarFeedback(
    mensagem,
    tipo = "info"
) {

    const feedback =
        document.getElementById("feedback");

    if (!feedback) return;

    feedback.textContent = mensagem;

    feedback.className =
        "feedback " + tipo;

    feedback.classList.add("mostrar");

    clearTimeout(feedbackTimeout);

    feedbackTimeout =
        setTimeout(function () {

            feedback.classList.remove(
                "mostrar"
            );

        }, 2500);
}