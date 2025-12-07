# Laravel Starter Kit

Ponto de partida moderno para apps Laravel com Vue 3, Inertia e PrimeVue. Inclui autenticação, theming, testes e scripts prontos para produtividade imediata.

## 🚀 Stack

- **Backend**: Laravel 12, PHP 8.2+, SQLite por padrão (fácil trocar)
- **Frontend**: Vue 3, Inertia.js, Vite, Tailwind CSS, PrimeVue 4, PrimeIcons
- **Qualidade**: Pest, Laravel Pint
- **Produtividade**: Macro `withToast`, Laravel Boost, auto-import de componentes
- **DevOps**: Laravel Sail opcional, scripts Composer (`setup`, `dev`, `test`)

## 📋 Requisitos

- PHP 8.2+
- Composer
- Node.js 18+ (npm ou yarn)

## 🚀 Como iniciar

### Instalação rápida

```bash
git clone <seu-repositorio>
cd starter-kit
composer setup
```

`composer setup` instala dependências PHP/JS, cria `.env` se faltar, gera APP_KEY, roda migrations e builda assets.

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

## 🧭 Desenvolvimento

- Tudo junto: `composer dev` (Laravel em `http://localhost:8000`, queue worker e Vite hot reload).
- Separado:
  ```bash
  php artisan serve
  npm run dev
  php artisan queue:listen
  ```

### Build produção

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

- Menu do usuário mostra primeiro nome e dá acesso a perfil e logout.
- Página de perfil (`/profile`) para alterar nome/email e senha.
- Exclusão de conta com modal de confirmação (exige senha antes de remover e desconectar).
- Seletor de tema (claro/escuro/sistema) disponível nas páginas.
- Macro backend `withToast` para toasts globais em redirects.

## 🍞 Toasts globais (`withToast`)

- Disponível em qualquer `RedirectResponse` (macro registrada em `AppServiceProvider`).
- Assinatura: `withToast($severity, $summary, $detail, $life = 3000)`.
- Severities mais comuns: `success`, `info`, `warn`, `error` (mapeados pelo PrimeVue Toast).

**Exemplo simples**
```php
return redirect()->route('dashboard')
  ->withToast('success', 'Perfil atualizado', 'Suas informações foram salvas.');
```

**Exemplo com vida customizada**
```php
return back()->withToast('warn', 'Atenção', 'Revise os campos opcionais.', 5000);
```

As props são enviadas ao frontend via Inertia e consumidas pelo `ToastManager`, exibindo o toast globalmente.

## 🧩 Sidebar Component

Menu lateral flutuante/responsivo independente do layout, com controle de posição e anexação internos.

**Principais pontos**
- Wrapper próprio com slot `#content` que envolve a página.
- Posição esquerda/direita com persistência (`sidebar-position`).
- Anexar/Desanexar com persistência (`sidebar-attached`).
- Estado expandido/retraído salvo (`sidebar-expanded`).
- Overlay mobile/tablet clicável para fechar; não bloqueia desktop.
- Tooltips reativos para itens retraídos; submenus e menu do usuário inline quando expandido.
- Seletor de tema claro/escuro/sistema integrado.

**Uso básico**
```vue
<template>
  <Sidebar :items="sidebarItems">
    <template #content>
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </template>
  </Sidebar>
</template>

<script setup>
import Sidebar from '@/Components/Sidebar.vue';

const sidebarItems = [
  { label: 'Home', action: route('home'), icon: 'pi pi-home' },
  { label: 'Dashboard', action: route('dashboard'), icon: 'pi pi-chart-bar' },
  {
    label: 'Projetos',
    icon: 'pi pi-folder',
    submenu: [
      { label: 'Meus Projetos', action: '#', icon: 'pi pi-briefcase' },
      { label: 'Arquivos', action: '#', icon: 'pi pi-file' }
    ]
  }
];
</script>
```

> Em páginas autenticadas, o `AppLayout` já embute essa estrutura; basta usar o `slot` do layout para o conteúdo.

**Props**
- `items` (obrigatório): `{ label, action?: string|function, icon, submenu?: Item[] }`

**Slots**
- `#header`: `{ isExpanded, toggleSidebar }`
- `#footer`: `{ user, logout, currentTheme, setTheme, cycleTheme }`
- `#content`: conteúdo principal

**Comportamento por breakpoint**
- `<768px`: drawer fullscreen com overlay clicável
- `768-1023`: drawer overlay mais largo
- `>=1024`: flutuante ou anexado, posição esquerda/direita

## 🧪 Testes

- Pest por padrão. Exemplos em `tests/Feature` e `tests/Unit`.

## 🐳 Docker (Sail)

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm run dev
./vendor/bin/sail test
```

## 📦 Scripts Composer

- `composer setup` — setup completo
- `composer dev` — ambiente dev completo (Laravel + Vite + queue)
- `composer test` — suíte de testes

## 🔒 Boas práticas

- Não commite `.env`
- Use variáveis de ambiente para segredos
- Atualize dependências regularmente
- Revise código antes de deploy

## 🤝 Contribuindo

1. Fork
2. Branch (`feature/minha-feature`)
3. Commit
4. Push
5. PR

## 📄 Licença

MIT License

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

Menu lateral flutuante/responsivo com controle completo dentro do próprio componente (não depende mais do `AppLayout`).

#### 🎯 Novidades e características

- **Wrapper próprio**: envolve o conteúdo com slot `#content` e controla layout/scroll.
- **Posição esquerda/direita**: toggle interno, persiste em `localStorage` (`sidebar-position`).
- **Anexar/Desanexar**: alterna entre flutuante e fixo, persiste em `localStorage` (`sidebar-attached`).
- **Persistência de expansão**: estado expandido/retraído salvo em `localStorage` (`sidebar-expanded`).
- **Overlay mobile/tablet**: clicável para fechar; não bloqueia desktop.
- **Tooltips reativos**: lado do tooltip acompanha a posição da sidebar.
- **Submenus e menu do usuário**: inline quando expandido; tooltips quando retraído.
- **Seletor de tema**: claro/escuro/sistema com ícones e persistência.

#### 📖 Como usar

```vue
<template>
  <Sidebar :items="sidebarItems">
    <template #content>
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </template>
  </Sidebar>
</template>

<script setup>
import Sidebar from '@/Components/Sidebar.vue';

const sidebarItems = [
  { label: 'Home', action: route('home'), icon: 'pi pi-home' },
  { label: 'Dashboard', action: route('dashboard'), icon: 'pi pi-chart-bar' },
  {
    label: 'Projetos',
    icon: 'pi pi-folder',
    submenu: [
      { label: 'Meus Projetos', action: '#', icon: 'pi pi-briefcase' },
      { label: 'Arquivos', action: '#', icon: 'pi pi-file' }
    ]
  }
];
</script>
```

> Dica: o `AppLayout` já usa essa estrutura; em páginas autenticadas é só colocar o conteúdo no `slot` do layout.

#### 📦 Props

- `items` (obrigatório): array de itens `{ label, action?: string|function, icon, submenu?: Item[] }`.

#### 🎨 Modos e comportamento

- **Flutuante** (padrão): não ocupa o fluxo; posição pode ser esquerda/direita.
- **Anexado**: entra no fluxo com `flex-row`/`flex-row-reverse` conforme posição.
- **Mobile/Tablet**: drawer fullscreen com overlay clicável para fechar.
- **Desktop**: interação normal, overlay não bloqueia conteúdo.

#### 🧩 Slots úteis

- `#header`: customizar topo; recebe `{ isExpanded, toggleSidebar }`.
- `#footer`: customizar rodapé; recebe `{ user, logout, currentTheme, setTheme, cycleTheme }`.
- `#content`: conteúdo principal (envolto pelo wrapper da sidebar).

#### 🔄 Estados e persistência

- `sidebar-expanded`, `sidebar-attached`, `sidebar-position` no `localStorage`.
- Auto-fecha em mobile ao navegar ou clicar no overlay.

#### 📱 Breakpoints

| Breakpoint | Comportamento |
|-----------|---------------|
| <768px    | Drawer fullscreen com overlay |
| 768-1023  | Drawer overlay mais largo |
| ≥1024     | Flutuante ou anexado, posição esquerda/direita |

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
