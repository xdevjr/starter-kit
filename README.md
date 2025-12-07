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

## 👤 Funcionalidades de conta

- Menu do usuário no Dashboard mostra apenas o primeiro nome e dá acesso rápido ao perfil e logout.
- Página de perfil (`/profile`) com formulários para atualizar nome/email e alterar senha.
- Seção de perigo para exclusão de conta com modal de confirmação: exige senha atual antes de remover os dados e desconectar.
- Seletor de tema disponível dentro das páginas (card na Dashboard e bloco na lateral do Perfil) para alternar claro/escuro.
- Macro backend `withToast` adicionada em `AppServiceProvider` para exibir toasts globais via sessões em respostas de redirect.

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
# Laravel Starter Kit

Um ponto de partida moderno para apps Laravel com Vue 3, Inertia e PrimeVue. Pronto para autenticação, theming, testes e produtividade imediata.

## 🔥 O que vem pronto

- **Laravel 12** + **PHP 8.2+** com SQLite por padrão (fácil trocar)
- **Autenticação completa** (login, registro, reset de senha) e página de perfil
- **UI**: Vue 3 + Inertia + PrimeVue 4 + Tailwind CSS 4 + PrimeIcons
- **Build**: Vite, auto-import de componentes Vue
- **Qualidade**: Pest para testes, Laravel Pint para estilo
- **Produtividade**: Macro `withToast` para toasts globais, Laravel Boost, scripts Composer (setup/dev/test)
- **Docker**: Laravel Sail opcional

## 📋 Requisitos

- PHP >= 8.2
- Composer
- Node.js >= 18 (npm ou yarn)

## 🚀 Como iniciar

### Instalação rápida (recomendada)

```bash
git clone <seu-repositorio>
cd starter-kit
composer setup
```

`composer setup` faz tudo: instala PHP deps, cria `.env` (se preciso), gera APP_KEY, roda migrations, instala deps JS e builda assets.

### Instalação manual

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

## 🧭 Fluxo de desenvolvimento

- Tudo junto (recomendado): `composer dev` 
    - Sobe Laravel em `http://localhost:8000`, queue worker e Vite com hot reload
- Serviços separados:
    ```bash
    php artisan serve
    npm run dev
    php artisan queue:listen
    ```

### Build de produção

```bash
npm run build
```

### Testes

```bash
composer test
# ou
php artisan test
```

## 👤 Experiência da conta

- Menu do usuário (Dashboard) mostra o primeiro nome e acessa perfil/logout.
- Página de perfil (`/profile`) com formulários para nome/email e troca de senha.
- Exclusão de conta: seção de perigo abre modal com avisos; exige senha atual antes de deletar e desconectar.
- Seletor de tema dentro das páginas (card na Dashboard, bloco lateral no Perfil) para alternar claro/escuro.
- Macro `withToast` em `AppServiceProvider` para respostas de redirect exibirem toasts globais (via sessão).

## 🏗️ Estrutura

```
app/                 # Controllers, Models, Providers
resources/
    js/
        Components/      # Componentes Vue (UserMenu, ThemeSelector, etc.)
        Pages/           # Páginas Inertia (Home, Dashboard, Profile...)
        app.js           # Bootstrap + PrimeVue + Inertia
    css/app.css        # Estilos globais
    views/app.blade.php# Template raiz Inertia
routes/web.php       # Rotas web
database/            # Migrations, factories, seeders
tests/               # Testes Pest
lang/                # Traduções (pt-BR incluso)
```

## 🌐 Idioma

- Já vem com pt-BR (pacote `lucascudo/laravel-pt-br-localization`).
- Ajuste no `.env` se quiser trocar:

```env
APP_LOCALE=pt_BR
APP_FALLBACK_LOCALE=pt_BR
```

## 🎨 UI e temas

- PrimeVue com auto-import: use componentes sem import manual.

```vue
<template>
        <Button label="Clique aqui" />
        <DataTable :value="produtos" />
</template>
```

- Tema PrimeVue configurado em `resources/js/app.js` (Aura). Ajuste lá conforme sua identidade visual.

## 🧭 Sidebar Flutuante

O componente `Sidebar.vue` oferece um menu lateral moderno, flutuante e responsivo com as seguintes funcionalidades:

### ✨ Características

- **Expand/Collapse**: Toggle entre modo expandido (w-64) e retraído (w-16)
- **Menu Flutuante**: Não afeta o layout do conteúdo, posiciona-se lado a lado
- **Responsivo**: Hamburger mobile com slide-in da esquerda em telas pequenas
- **Submenus**: Em modo expandido, submenus aparecem internamente; em modo retraído, submenus flutuam ao lado
- **Menu do Usuário**: Integrado com submenu para Perfil e Logout
- **Seletor de Tema**: 3 opções (Claro, Escuro, Sistema) com persistência em localStorage
- **Auto-close**: Menus fecham automaticamente ao navegar ou clicar fora
- **Dark Mode**: Suporte completo com Tailwind CSS

### 📝 Uso

```vue
<template>
  <Sidebar>
    <!-- Conteúdo principal aqui -->
  </Sidebar>
</template>
```

### 🎯 Customização com Slots

O Sidebar oferece dois slots nomeados para customização:

#### Header Slot

```vue
<template>
  <Sidebar>
    <template #header="{ isExpanded, toggleSidebar }">
      <div class="custom-header">
        <h1 v-if="isExpanded">Meu App</h1>
        <button @click="toggleSidebar">Toggle</button>
      </div>
    </template>
  </Sidebar>
</template>
```

#### Footer Slot

```vue
<template>
  <Sidebar>
    <template #footer="{ user, logout, currentTheme, setTheme, cycleTheme }">
      <div class="custom-footer">
        <p>Olá, {{ user.name }}</p>
        <button @click="logout">Sair</button>
        <button @click="cycleTheme">Tema Atual: {{ currentTheme }}</button>
      </div>
    </template>
  </Sidebar>
</template>
```

**Props disponíveis no footer slot:**
- `isExpanded` - Se o sidebar está expandido
- `user` - Objeto do usuário autenticado
- `userInitials` - Iniciais do nome do usuário
- `logout` - Função para logout
- `currentTheme` - Tema atual (light/dark/system)
- `setTheme(valor)` - Define um tema específico
- `cycleTheme()` - Alterna entre temas
- `getCurrentThemeIcon()` - Ícone do tema atual
- `getCurrentThemeLabel()` - Label do tema atual
- `toggleUserMenu()` - Toggle do menu do usuário
- `userMenuExpanded` - Se o menu de usuário está aberto
- `isActive(rota)` - Verifica se rota está ativa
- `themeOptions` - Array com opções de tema

### 🔧 Estrutura Interna

- Menu items são definidos no script `setup`
- Submenus automáticos para itens com `children`
- Persistência de estado expandido em localStorage (chave: `sidebar-expanded`)
- Navegação detectada via `useRouter()` para fechar submenus automaticamente

## 🧪 Testes

- Pest como padrão; exemplos em `tests/Feature` e `tests/Unit`.

```bash
composer test          # todos os testes
php artisan test --filter=ExampleTest
```

## 🐳 Docker (Sail)

```bash
./vendor/bin/sail up -d          # sobe containers
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm run dev
./vendor/bin/sail test
```

## 📦 Scripts úteis

- `composer setup` — setup completo
- `composer dev`   — ambiente dev completo (Laravel + Vite + queue)
- `composer test`  — roda a suíte de testes

## 📚 Documentação de Componentes

### Sidebar Component

O componente `Sidebar` é um menu lateral flutuante e responsivo para aplicações Vue 3 com Inertia.js.

#### 🎯 Características

- ✅ **Modo Flutuante e Anexado**: Alterna entre painel flutuante e sidebar fixado
- ✅ **Responsivo**: Drawer modal em mobile, painel em desktop
- ✅ **Submenus**: Menus aninhados com expansão automática
- ✅ **Highlight de Rotas**: Destaca automaticamente o item ativo
- ✅ **Tema Dinâmico**: Integração com tema claro/escuro/sistema
- ✅ **Persistência**: Salva estado no localStorage
- ✅ **Ações Flexíveis**: Suporta rotas (strings) ou callbacks (functions)

#### 📖 Como Usar

**Com AppLayout (Recomendado):**

```vue
<template>
  <AppLayout>
    <h1>Seu conteúdo aqui</h1>
  </AppLayout>
</template>
```

O `AppLayout` automaticamente integra o Sidebar em páginas autenticadas.

**Uso Manual:**

```vue
<template>
  <div class="flex">
    <Sidebar :items="menuItems" />
    <div class="flex-1">
      <!-- Seu conteúdo -->
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/Components/Sidebar.vue';

const menuItems = [
  {
    label: 'Home',
    action: route('home'),
    icon: 'pi pi-home'
  },
  {
    label: 'Dashboard',
    action: route('dashboard'),
    icon: 'pi pi-chart-bar'
  },
  {
    label: 'Projetos',
    icon: 'pi pi-folder',
    submenu: [
      {
        label: 'Meus Projetos',
        action: route('projects.index'),
        icon: 'pi pi-briefcase'
      },
      {
        label: 'Arquivos',
        action: () => console.log('Arquivos'),
        icon: 'pi pi-file'
      }
    ]
  }
];
</script>
```

#### 📦 Props

**`items` (Required)** - Array de objetos do menu:

```typescript
{
  label: string;           // Título do item
  action?: string | Function; // Rota ou callback
  icon: string;           // Classes de ícone (PrimeIcons)
  submenu?: Item[];       // Array de subitens (opcional)
}
```

#### 🎨 Modos

**Flutuante (Padrão):**
- Desktop: Sidebar flutuante, altura automática
- Tablet/Mobile: Drawer modal deslizante
- Clique no ícone 🔒 para fixar na lateral

**Anexado (Fixado):**
- Desktop: Sidebar fixado na lateral, altura total
- Menu expande para preencher espaço
- Rodapé sempre no final

#### 🎭 Customização

**Header Slot:**
```vue
<Sidebar :items="items">
  <template #header="{ isExpanded, toggleSidebar }">
    <!-- Seu header customizado -->
  </template>
</Sidebar>
```

**Footer Slot:**
```vue
<Sidebar :items="items">
  <template #footer="{ user, logout, currentTheme, setTheme }">
    <!-- Seu footer customizado -->
  </template>
</Sidebar>
```

#### 🔄 Estados

- **Expandido**: Mostra rótulos completos e submenus internos
- **Retraído**: Apenas ícones com tooltips e submenus em popover
- **Mobile**: Drawer fullscreen ao clicar no hambúrguer

#### 📱 Responsividade

| Breakpoint | Comportamento |
|-----------|--------------|
| Mobile (< 768px) | Drawer modal fullscreen |
| Tablet (768px - 1023px) | Drawer modal mais largo |
| Desktop (≥ 1024px) | Flutuante ou Anexado |

#### ⚙️ Funcionalidades

- **Highlight de Rotas**: Detecta automaticamente rota ativa
- **Ações Dinâmicas**: Suporta rotas e callbacks
- **Persistência**: Salva estado em localStorage
- **Menu de Usuário**: Seção integrada com logout
- **Seletor de Tema**: Light/Dark/System

## 🔒 Boas práticas de segurança

- Não commite `.env`
- Use variáveis de ambiente para segredos
- Atualize dependências regularmente
- Revise código antes de deploy

## 📝 Customização rápida

- **Banco de dados**: ajuste `.env` e `config/database.php` (MySQL/Postgres/etc.).
- **Novos pacotes**: `composer require pacote` ou `npm install pacote`.
- **Tema**: personalize PrimeVue em `resources/js/app.js` e Tailwind em `resources/css/app.css`.

## 🤝 Contribuindo

1) Forke o projeto
2) Crie uma branch (`feature/minha-feature`)
3) Commit (`git commit -m "Minha feature"`)
4) Push
5) Abra um PR

## 📄 Licença

MIT License.

## 🙏 Créditos

- Laravel, Vue.js, Inertia.js, Tailwind CSS, PrimeVue, Pest

## 📞 Suporte

- Abra uma issue
- Documentação Laravel: https://laravel.com/docs
- Comunidade Laravel Brasil: https://laravel.com.br
