<html>

<body>
    <h1>Recuperação de Senha</h1>
    <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
    <a href="{{ url('/reset-password?token=' . $token) }}">Redefinir Senha</a>
</body>

</html>