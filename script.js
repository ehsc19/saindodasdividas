$(document).ready(function() {
    $('#phone').mask('(00) 00000-0000');

    let userName = '';

    $('#initialForm').on('submit', function(event) {
        event.preventDefault();
        userName = $('#name').val();

        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");

        $('#initialContainer').hide();
        $('#loadingContainer').show();
        $('html, body').animate({
            scrollTop: $('#loadingContainer').offset().top
        }, 1000);
        setTimeout(function() {
            $('#loadingContainer').hide();
            $('#testContainer').show();
            $('html, body').animate({
                scrollTop: $('#testContainer').offset().top
            }, 1000);
        }, 1000);
    });

    $('#debtTestForm').on('submit', function(event) {
        event.preventDefault();

        let totalPoints = 0;
        const formData = new FormData(event.target);

        totalPoints += parseFloat(formData.get('incomeSource'));
        totalPoints += parseFloat(formData.get('housing'));
        totalPoints += parseFloat(formData.get('vehicleLoan'));
        totalPoints += parseFloat(formData.get('creditCards'));
        totalPoints += parseFloat(formData.get('cardLate'));
        totalPoints += parseFloat(formData.get('overdraftUsed'));
        formData.getAll('streamingServices').forEach(() => totalPoints += 0.5);
        totalPoints += parseFloat(formData.get('savingMoney'));

        $('#testContainer').hide();
        $('#processingContainer').show();
        $('html, body').animate({
            scrollTop: $('#processingContainer').offset().top
        }, 1000);
        setTimeout(function() {
            $('#processingContainer').hide();
            $('#resultContainer').show();
            const video = $('#resultVideo')[0];
            video.load();
            video.play().catch(error => {
                console.error('Erro ao reproduzir o vídeo:', error);
            });

            let resultMessage;

            if (totalPoints <= 4) {
                resultMessage = `Olá ${userName},<br><br>Parabéns! Seu resultado na nossa avaliação financeira indica que você está no Nível 1 de Endividamento, o que significa que suas dívidas não ultrapassam 10% da sua renda mensal. Isso é excelente e mostra que você tem uma gestão financeira saudável.<br><br>Continue praticando bons hábitos financeiros e explore maneiras de investir seu dinheiro para garantir um futuro ainda mais seguro.<br><br>Atenciosamente,<br>Equipe do Guia Prático Como Sair das Dívidas`;
            } else if (totalPoints <= 8) {
                resultMessage = `Olá ${userName},<br><br>Você está no Nível 2 de Endividamento. Isso significa que suas dívidas representam entre 10% e 30% da sua renda mensal. É um bom momento para revisar seus gastos e assegurar que seu endividamento não aumente.<br><br>Considere criar um plano de pagamento mais estruturado ou ajustar seu orçamento para evitar que seu endividamento cresça.<br><br>Atenciosamente,<br>Equipe do Guia Prático Como Sair das Dívidas`;
            } else if (totalPoints <= 13) {
                resultMessage = `Olá ${userName},<br><br>Você está no Nível 3 de Endividamento, com dívidas que representam entre 30% e 50% da sua renda. Isso indica que você pode estar enfrentando alguns desafios financeiros.<br><br>É importante que você comece a tomar medidas para reduzir suas dívidas, como consultar um conselheiro financeiro ou reestruturar suas finanças para evitar problemas maiores no futuro.<br><br>Atenciosamente,<br>Equipe do Guia Prático Como Sair das Dívidas`;
            } else if (totalPoints <= 16) {
                resultMessage = `Olá ${userName},<br><br>Você foi classificado no Nível 4 de Endividamento, com dívidas entre 50% e 70% da sua renda. Esta é uma situação que requer ações imediatas para evitar maiores complicações financeiras.<br><br>É crucial que você considere maneiras de reduzir suas dívidas urgentemente, como negociar termos com credores ou cortar despesas não essenciais.<br><br>Atenciosamente,<br>Equipe do Guia Prático Como Sair das Dívidas`;
            } else if (totalPoints <= 18) {
                resultMessage = `Olá ${userName},<br><br>Você está no Nível 5 de Endividamento, onde suas dívidas alcançam entre 70% e 100% da sua renda. Esta é uma situação crítica que pode impactar significativamente sua qualidade de vida.<br><br>É essencial buscar ajuda profissional para reestruturar suas dívidas e considerar maneiras de aumentar sua renda para lidar com esta condição.<br><br>Atenciosamente,<br>Equipe do Guia Prático Como Sair das Dívidas`;
            } else {
                resultMessage = `Olá ${userName},<br><br>Seu nível de endividamento foi classificado como Nível 6, indicando insolvência, pois suas dívidas ultrapassam sua renda mensal. <span style="font-weight: bold; color: red;">Esta é uma condição SÉRIA que requer ação IMEDIATA e profissional.</span> <br><br>Por favor, considere entrar em contato com um serviço de aconselhamento de dívidas ou um especialista financeiro para discutir possíveis soluções, como a reestruturação de dívidas ou até mesmo procedimentos legais, se necessário.<br><br>Atenciosamente,<br>Equipe do Guia Prático Como Sair das Dívidas`;
            }

            $('#resultText').html(resultMessage);

            // Enviar os dados para o servidor de forma oculta
            $.ajax({
                url: 'http://localhost:3000/submitTest',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: userName,
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    totalPoints: totalPoints,
                    resultMessage: resultMessage
                })
            });

            $('html, body').animate({
                scrollTop: $('#resultContainer').offset().top
            }, 1000);
        }, 2000); // Tempo da animação de processamento alterado para 2 segundos
    });

    $('#buyButton').on('click', function() {
        window.location.href = 'link_para_compra_do_ebook'; // Substitua 'link_para_compra_do_ebook' pelo link real de compra do e-book
    });

    $('#shareButton').on('click', function() {
        const pageUrl = encodeURIComponent(window.location.href);
        const message = encodeURIComponent('Confira seu nível de endividamento com este teste: ' + pageUrl);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
});
