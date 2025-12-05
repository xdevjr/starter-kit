# Laravel Starter Kit

Um starter kit completo e moderno para projetos Laravel, pré-configurado com as melhores ferramentas e práticas do ecossistema.

## 🚀 Stack Tecnológica

Este starter kit vem pré-configurado com:

### Backend
- **Laravel 12** - Framework PHP moderno e elegante
- **PHP 8.2+** - Versão mais recente do PHP
- **SQLite** - Banco de dados padrão (fácil de trocar)
- **Pest** - Framework de testes moderno e expressivo
- **Laravel Pint** - Code style fixer opinativo
- **Laravel Boost** - Ferramenta de desenvolvimento com IA

### Frontend
- **Vue 3** - Framework JavaScript progressivo
- **Inertia.js** - Monolito moderno sem a complexidade de uma API
- **Vite** - Build tool extremamente rápido
- **Tailwind CSS 4** - Framework CSS utility-first
- **PrimeVue 4** - Biblioteca de componentes UI ricos
- **PrimeIcons** - Conjunto completo de ícones

### DevOps
- **Laravel Sail** - Ambiente Docker leve
- **Concurrently** - Execução simultânea de comandos
- **Auto-import** - Resolução automática de componentes Vue

## 📋 Pré-requisitos

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM ou Yarn

## 🔧 Instalação

### 1. Clone ou baixe o repositório

```bash
git clone <seu-repositorio>
cd starter-kit
```

### 2. Instalação rápida com Composer

```bash
composer setup
```

Este comando irá:
- Instalar dependências PHP
- Criar arquivo `.env` (se não existir)
- Gerar chave da aplicação
- Executar migrations
- Instalar dependências Node.js
- Compilar assets frontend

### 3. Instalação manual (alternativa)

```bash
# Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate

# Frontend
npm install
npm run build
```

## 🎯 Uso

### Desenvolvimento

#### Opção 1: Ambiente completo (recomendado)

Execute servidor, queue worker e Vite simultaneamente:

```bash
composer dev
```

Isso iniciará:
- **Servidor Laravel** em `http://localhost:8000`
- **Queue Worker** para processar jobs
- **Vite Dev Server** com hot reload

#### Opção 2: Serviços individuais

```bash
# Servidor Laravel
php artisan serve

# Vite (em outro terminal)
npm run dev

# Queue Worker (em outro terminal, se necessário)
php artisan queue:listen
```

### Build de Produção

```bash
npm run build
```

### Testes

```bash
composer test
# ou
php artisan test
```

## 🏗️ Estrutura do Projeto

```
├── app/
│   ├── Http/Controllers/     # Controladores da aplicação
│   ├── Models/                # Modelos Eloquent
│   └── Providers/             # Service Providers
├── resources/
│   ├── js/
│   │   ├── Components/        # Componentes Vue
│   │   ├── Composables/       # Composables Vue
│   │   ├── Pages/             # Páginas Inertia
│   │   └── app.js             # Entry point JS
│   ├── css/
│   │   └── app.css            # Estilos globais
│   └── views/
│       └── app.blade.php      # Template principal Inertia
├── routes/
│   └── web.php                # Rotas web
├── database/
│   ├── migrations/            # Migrations do banco
│   ├── factories/             # Factories para testes
│   └── seeders/               # Seeders
├── tests/                     # Testes Pest
└── lang/                      # Arquivos de tradução (pt-BR incluído)
```

## 🌐 Internacionalização

O projeto já vem com traduções em português brasileiro (pt-BR) incluídas através do pacote `lucascudo/laravel-pt-br-localization`.

Para alterar o idioma padrão, edite o arquivo `.env`:

```env
APP_LOCALE=pt_BR
APP_FALLBACK_LOCALE=pt_BR
```

## 🎨 Componentes UI

Este starter kit usa **PrimeVue** com auto-import configurado. Você pode usar qualquer componente PrimeVue sem importação manual:

```vue
<template>
    <Button label="Clique aqui" />
    <DataTable :value="produtos" />
</template>
```

Documentação PrimeVue: https://primevue.org/

## 🧪 Testes

O projeto usa Pest para testes. Exemplos estão em `tests/Feature/` e `tests/Unit/`.

```bash
# Executar todos os testes
composer test

# Executar com cobertura
php artisan test --coverage

# Executar testes específicos
php artisan test --filter=ExampleTest
```

## 🐳 Docker (Laravel Sail)

Se preferir usar Docker:

```bash
# Iniciar containers
./vendor/bin/sail up -d

# Executar comandos artisan
./vendor/bin/sail artisan migrate

# Executar npm
./vendor/bin/sail npm run dev

# Executar testes
./vendor/bin/sail test
```

## 📦 Scripts Composer Úteis

```bash
composer setup    # Setup completo do projeto
composer dev      # Ambiente de desenvolvimento completo
composer test     # Executar testes
```

## 🔒 Segurança

- Mantenha as dependências atualizadas regularmente
- Nunca commite o arquivo `.env`
- Use variáveis de ambiente para dados sensíveis
- Revise o código antes de fazer deploy

## 📝 Customização

### Trocar banco de dados

Edite `.env` e `config/database.php` para usar MySQL, PostgreSQL, etc.

### Adicionar novos pacotes

```bash
# Backend
composer require nome/pacote

# Frontend
npm install nome-pacote
```

### Configurar tema PrimeVue

Edite `resources/js/app.js` para personalizar o tema PrimeVue.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é open-source e está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 🙏 Créditos

Este starter kit é construído sobre os ombros de gigantes:

- [Laravel](https://laravel.com)
- [Vue.js](https://vuejs.org)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [PrimeVue](https://primevue.org)
- [Pest](https://pestphp.com)

## 📞 Suporte

Para questões e suporte:

- Abra uma [issue](../../issues)
- Consulte a [documentação do Laravel](https://laravel.com/docs)
- Visite a [comunidade Laravel Brasil](https://laravel.com.br)
