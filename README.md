# Laravel Starter Kit

Ponto de partida moderno para apps Laravel com Vue 3, Inertia e PrimeVue. Inclui autenticação, theming, testes e scripts prontos para produtividade imediata.

## 🚀 Stack

- **Backend**: Laravel 12, PHP 8.2+, SQLite por padrão (fácil trocar)
- **Frontend**: Vue 3, TypeScript, Inertia.js, Vite, Tailwind CSS, PrimeVue 4, PrimeIcons
- **Qualidade**: Pest, Laravel Pint, TypeScript strict mode
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

### Type-checking TypeScript

```bash
npm run type-check
```

Valida todos os componentes Vue, composables e arquivos TypeScript usando `vue-tsc`.

## 🦾 TypeScript

Este projeto é **100% TypeScript** no frontend:

- **Type-safe**: Todos os componentes Vue, composables e utilitários com tipos completos
- **Strict mode**: Configuração TypeScript com modo estrito habilitado
- **Arquitetura**:
  - `resources/js/app.ts` - Entry point da aplicação
  - `resources/js/bootstrap.ts` - Configuração do Axios e utilitários globais
  - `resources/js/composables/` - Composables reativos (useTheme, usePagination)
  - `resources/js/types/` - Definições de tipo centralizadas
  - `resources/js/Components/` - Componentes Vue 3 com setup script
  - `resources/js/Pages/` - Páginas Inertia com tipos automáticos

**Exemplo de componente TypeScript:**

```typescript
<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { PageProps } from '@inertiajs/core';

interface User {
  id: number;
  name: string;
  email: string;
}

const page = usePage<PageProps & { auth?: { user?: User } }>();
const user = computed(() => page.props.auth?.user);
</script>
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

### Exemplo simples

```php
return redirect()->route('dashboard')
  ->withToast('success', 'Perfil atualizado', 'Suas informações foram salvas.');
```

### Exemplo com vida customizada

```php
return back()->withToast('warn', 'Atenção', 'Revise os campos opcionais.', 5000);
```

As props são enviadas ao frontend via Inertia e consumidas pelo `ToastManager`, exibindo o toast globalmente.

## 🧩 usePagination Composable

Composable completo para paginação, filtros e ordenação múltipla com sincronização automática via localStorage.

### Características principais

- ✅ **Paginação com DataTable ou componentes customizados**
- ✅ **Filtros reativos com debounce automático**
- ✅ **Ordenação múltipla (até 3 campos)**
- ✅ **Persistência de estado no localStorage**
- ✅ **Sincronização automática com PrimeVue DataTable**
- ✅ **Rows globais compartilhados entre tabelas**
- ✅ **Limpeza automática do localStorage quando retorna ao estado inicial**

### Uso com DataTable (PrimeVue)

```vue
<template>
  <div>
    <!-- Filtros -->
    <div class="mb-4 flex gap-3">
      <InputText 
        v-model="filters.name" 
        @input="applyFilters" 
        placeholder="Filtrar por nome..."
        class="flex-1" 
      />
      <InputText 
        v-model="filters.email" 
        @input="applyFilters" 
        placeholder="Filtrar por email..."
        class="flex-1" 
      />
      <Button label="Limpar Filtros" @click="clearFilters" severity="secondary" />
    </div>

    <!-- DataTable com ordenação múltipla -->
    <DataTable
      :value="data"
      :loading="loading"
      :paginator="true"
      :rows="rows"
      :totalRecords="total"
      :first="(page - 1) * rows"
      :multiSortMeta="dataTable.multiSortMeta"
      :rowsPerPageOptions="[5, 10, 25, 50]"
      sortMode="multiple"
      removableSort
      lazy
      @page="dataTable.handlePageChange"
      @sort="dataTable.handleSortChange"
    >
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Nome" sortable />
      <Column field="email" header="Email" sortable />
    </DataTable>
  </div>
</template>

<script setup>
import { InputText, Button, DataTable, Column } from 'primevue'
import usePagination from '@/Composables/usePagination'

const {
  data,
  loading,
  total,
  page,
  rows,
  filters,
  clearFilters,
  applyFilters,
  dataTable,
} = usePagination({
  endpoint: '/api/users',
  storageKey: 'users-table-pagination',
  initialFilters: { name: '', email: '' },
  initialSort: null,
  initialPage: 1,
  initialRows: 'global',
  autoFetch: true,
})
</script>
```

### Uso com Componentes Customizados (Paginator + Cards)

Exemplo prático com o componente `UsersList.vue` (lista de cartões com paginação interativa):

```vue
<template>
  <div>
    <!-- Filtros -->
    <div class="mb-6 flex gap-3">
      <InputText 
        v-model="filters.name" 
        @input="applyFilters" 
        placeholder="Filtrar por nome..."
        class="flex-1" 
      />
      <InputText 
        v-model="filters.email" 
        @input="applyFilters" 
        placeholder="Filtrar por email..."
        class="flex-1" 
      />
      <Button label="Limpar Filtros" @click="clearFilters" severity="secondary" />
    </div>

    <!-- Ordenação Múltipla com Ícones Interativos -->
    <div class="mb-6">
      <label class="block text-sm font-semibold mb-3">Ordenação</label>
      <div class="flex gap-3 flex-wrap">
        <div 
          v-for="field in sortFields" 
          :key="field.value"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all"
          :class="[
            sort.find(s => s.field === field.value)?.direction === 'asc'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : sort.find(s => s.field === field.value)?.direction === 'desc'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
          ]"
        >
          <span class="text-sm font-medium">{{ field.label }}</span>
          <Button 
            :icon="getSortIcon(field.value)" 
            @click="toggleSort(field.value)" 
            text rounded size="small"
            :severity="getSortSeverity(field.value)"
            :title="getSortTitle(field.value)"
          />
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div v-if="data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="user in data" 
        :key="user.id"
        class="hover:shadow-xl transition-all duration-300"
      >
        <template #header>
          <div class="bg-linear-to-br from-blue-500 to-indigo-600 p-6 flex items-center gap-4">
            <Avatar 
              :label="user.name.charAt(0).toUpperCase()" 
              size="xlarge" 
              shape="circle"
              class="bg-white text-blue-600"
              style="width: 4rem; height: 4rem;"
            />
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white">{{ user.name }}</h3>
              <span class="text-sm text-white/90">ID: {{ user.id }}</span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex items-center text-gray-700 dark:text-gray-300">
            <i class="pi pi-envelope mr-3 text-blue-500"></i>
            <span class="text-sm">{{ user.email }}</span>
          </div>
        </template>
        <template #footer>
          <div class="flex gap-2">
            <Button label="Detalhes" icon="pi pi-eye" class="flex-1" />
            <Button label="Editar" icon="pi pi-pencil" severity="secondary" class="flex-1" outlined />
          </div>
        </template>
      </Card>
    </div>

    <!-- Paginador PrimeVue -->
    <div v-if="total > 0" class="mt-6">
      <Paginator 
        :rows="rows" 
        :totalRecords="total" 
        :first="(page - 1) * rows"
        :rowsPerPageOptions="[5, 10, 25, 50]" 
        @page="dataTable.handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { InputText, Button, Card, Avatar, Paginator } from 'primevue'
import usePagination from '@/Composables/usePagination'

const {
  data,
  loading,
  total,
  page,
  rows,
  filters,
  sort,
  clearFilters,
  applyFilters,
  dataTable,
} = usePagination({
  endpoint: route('users.list'),
  storageKey: 'users-list-pagination',
  initialFilters: { name: '', email: '' },
  initialSort: null,
  initialPage: 1,
  initialRows: 'global',
  autoFetch: true,
})

const sortFields = [
  { label: 'ID', value: 'id' },
  { label: 'Nome', value: 'name' },
  { label: 'Email', value: 'email' }
]

// Obtém o estado atual de um campo
const getSortState = (field) => {
  return sort.value.find(s => s.field === field)?.direction || null
}

// Obtém o ícone baseado no estado
const getSortIcon = (field) => {
  const state = getSortState(field)
  if (state === 'asc') return 'pi pi-sort-amount-up-alt'
  if (state === 'desc') return 'pi pi-sort-amount-down'
  return 'pi pi-sort-alt'
}

// Obtém a severidade baseada no estado
const getSortSeverity = (field) => {
  const state = getSortState(field)
  if (state === 'asc') return 'info'
  if (state === 'desc') return 'help'
  return 'secondary'
}

// Obtém o título do tooltip baseado no estado
const getSortTitle = (field) => {
  const state = getSortState(field)
  if (state === 'asc') return 'Crescente - Clique para Decrescente'
  if (state === 'desc') return 'Decrescente - Clique para Desabilitar'
  return 'Desabilitado - Clique para Crescente'
}

// Alterna entre os 3 estados: desabilitado -> asc -> desc -> desabilitado
const toggleSort = (field) => {
  const currentState = getSortState(field)
  
  if (currentState === null) {
    sort.value = [...sort.value, { field, direction: 'asc' }]
  } else if (currentState === 'asc') {
    sort.value = sort.value.map(s => s.field === field ? { ...s, direction: 'desc' } : s)
  } else {
    sort.value = sort.value.filter(s => s.field !== field)
  }
}
</script>
```

### API do Composable

#### Parâmetros de inicialização

```typescript
interface UsePaginationOptions {
  endpoint: string;              // URL da API (obrigatório)
  storageKey: string;            // chave localStorage para persistência (obrigatório)
  initialFilters?: Record<string, any>;  // filtros iniciais, default: {}
  initialSort?: { field: string; direction: 'asc' | 'desc' }[] | null;  // default: null
  initialPage?: number;          // página inicial, default: 1
  initialRows?: number | 'global';  // itens por página, 'global' compartilha entre tabelas, default: 10
  autoFetch?: boolean;           // buscar dados automaticamente, default: true
  pageName?: string;             // nome do parâmetro de página, default: 'page'
}
```

**Propriedades retornadas:**

```typescript
interface UsePaginationReturn {
  // Estado
  loading: Ref<boolean>;         // carregando
  data: Ref<any[]>;              // dados da página
  total: Ref<number>;            // total de registros
  page: Ref<number>;             // página atual
  rows: Ref<number>;             // itens por página
  filters: Record<string, any>;   // filtros ativos
  sort: Ref<SortItem[]>;         // ordenações ativas
  
  // Métodos
  fetch,                // () => Promise - buscar dados manualmente
  setPage,              // (p: number) => void
  setRows,              // (r: number) => void
  setSort,              // (s: array|string|null) => void
  setFilters,           // (f: object) => void
  clearFilters,         // () => array - limpa filtros/sort e retorna multiSortMeta
  applyFilters,         // (debounceMs?: number) => void - buscar com debounce
  
  // Helpers DataTable
  multiSortMeta,        // ref<array> - formato PrimeVue
  dataTable: {
    handlePageChange,   // (event) => void - sincroniza page e rows
    handleSortChange,   // (event) => void - sincroniza sort e multiSortMeta
    multiSortMeta,      // ref<array> - referência
  }
}
```

### Formato de Persistência no localStorage

```json
{
  "filters": {
    "name": "john",
    "email": ""
  },
  "sort": [
    { "field": "name", "direction": "asc" },
    { "field": "id", "direction": "desc" }
  ],
  "rows": 25
}
```

### Backend - Processamento de Filtros e Sort

```php
Route::get('/api/users', function (\Illuminate\Http\Request $request) {
    $query = User::query();

    // Filtros: filters[name]=john&filters[email]=test@example.com
    $filters = $request->input('filters', []);
    if (is_array($filters)) {
        foreach ($filters as $key => $value) {
            if ($value && in_array($key, ['name', 'email'])) {
                $query->where($key, 'like', '%' . $value . '%');
            }
        }
    }

    // Sort: sort[]=id,asc&sort[]=name,desc (múltiplo)
    $sort = $request->input('sort', []);
    if (is_array($sort)) {
        foreach ($sort as $sortItem) {
            if ($sortItem) {
                [$field, $direction] = explode(',', $sortItem) + [null, 'asc'];
                if ($field && in_array($field, ['id', 'name', 'email'])) {
                    $query->orderBy($field, $direction);
                }
            }
        }
    }

    // Paginação
    $perPage = (int) $request->input('per_page', 10);
    $users = $query->paginate($perPage);

    return response()->json([
        'data' => $users->items(),
        'total' => $users->total(),
        'current_page' => $users->currentPage(),
        'per_page' => $users->perPage(),
    ]);
});
```

**Exemplo de URL gerada:**

```http
GET /api/users?page=1&per_page=10&filters[name]=john&sort[]=id,asc&sort[]=name,desc
```

### Exemplo de Controller (UserController.php)

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return inertia('UsersTable');
    }

    public function list(Request $request)
    {
        $query = User::query();

        // Processar filtros
        $filters = $request->input('filters', []);
        if (is_array($filters)) {
            foreach ($filters as $key => $value) {
                if ($value && in_array($key, ['name', 'email'])) {
                    $query->where($key, 'like', '%' . $value . '%');
                }
            }
        }

        // Processar ordenação múltipla
        $sort = $request->input('sort', []);
        if (is_array($sort)) {
            foreach ($sort as $sortItem) {
                if ($sortItem) {
                    [$field, $direction] = explode(',', $sortItem) + [null, 'asc'];
                    if ($field && in_array($field, ['id', 'name', 'email', 'created_at'])) {
                        $query->orderBy($field, $direction);
                    }
                }
            }
        }

        $perPage = (int) $request->input('per_page', 10);
        $users = $query->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'current_page' => $users->currentPage(),
            'per_page' => $users->perPage(),
        ]);
    }
}
```

### Observações Importantes

- ✅ Filtros usam `v-model="filters.field"` diretamente (sem refs adicionais)
- ✅ `filters` é um objeto reativo gerenciado pelo composable
- ✅ `sort` é um array de objetos `{field, direction}` sincronizado com localStorage
- ✅ Debounce de 500ms padrão previne requisições excessivas
- ✅ `clearFilters()` reseta filtros, sort e página 1
- ✅ `multiSortMeta` é sincronizado automaticamente com PrimeVue DataTable
- ✅ localStorage é limpado automaticamente quando volta ao estado inicial
- ✅ `initialRows: 'global'` compartilha preferências entre múltiplas tabelas

## 🧩 Sidebar Component

Menu lateral flutuante/responsivo independente do layout, com controle de posição, anexação e persistência de estado.

### Características principais do Sidebar

- ✅ **Menu lateral flutuante (desktop) ou drawer fullscreen (mobile/tablet)**
- ✅ **Posição configurável: esquerda ou direita**
- ✅ **Modo anexado (sticky) ou flutuante**
- ✅ **Persistência unificada de estado em localStorage (chave única: `sidebar`)**
- ✅ **Expansão/Retração com transições suaves**
- ✅ **Overlay mobile clicável para fechar**
- ✅ **Tooltips para itens retraídos**
- ✅ **Submenus com chevrons e indicadores de expansão**
- ✅ **Menu do usuário integrado (perfil, logout)**
- ✅ **Seletor de tema claro/escuro/sistema**
- ✅ **Limpeza automática do localStorage quando retorna ao estado inicial**

### Uso básico

```vue
<template>
  <Sidebar :items="sidebarItems" :initialState="customState">
    <template #content>
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </template>
  </Sidebar>
</template>

<script setup>
import Sidebar from '@/Components/Sidebar.vue'

const sidebarItems = [
  { label: 'Home', action: route('home'), icon: 'pi pi-home' },
  { label: 'Dashboard', action: route('dashboard'), icon: 'pi pi-chart-bar' },
  {
    label: 'Usuários',
    icon: 'pi pi-users',
    submenu: [
      { label: 'Tabela', action: route('users.index'), icon: 'pi pi-table' },
      { label: 'Lista de Cartões', action: route('users-list.index'), icon: 'pi pi-th-large' }
    ]
  },
  {
    label: 'Configurações',
    icon: 'pi pi-cog',
    submenu: [
      { label: 'Perfil', action: '#', icon: 'pi pi-user' },
      { label: 'Segurança', action: '#', icon: 'pi pi-shield' }
    ]
  }
]

const customState = {
  expanded: true,      // Sidebar inicialmente expandida (desktop)
  attached: false,     // Sidebar flutuante por padrão
  position: 'left'     // Posição: 'left' ou 'right'
}
</script>
```

### Props

- **`items`** (obrigatório): Array de itens do menu

  ```typescript
  interface SidebarItem {
    label: string;              // Texto exibido
    action?: string | (() => void);  // URL (route()) ou função callback
    icon?: string;              // Classe de ícone PrimeIcons
    submenu?: SidebarItem[];    // Subitens para dropdown
  }
  ```

- **`initialState`** (opcional): Customiza o estado inicial

  ```typescript
  interface SidebarState {
    expanded: boolean;      // Expandido inicialmente
    attached: boolean;      // Flutuante (false) ou anexado/sticky (true)
    position: 'left' | 'right';  // 'left' ou 'right'
  }
  ```

### Formato de Persistência no localStorage (Sidebar)

Todos os estados são salvos em uma única chave `sidebar`:

```json
{
  "expanded": true,
  "attached": false,
  "position": "left"
}
```

- O estado é **automaticamente removido** do localStorage se retornar aos valores iniciais
- Desktop: estado é persistido entre sessões
- Mobile: sempre inicia colapsado, mas respira posição e anexação

### Slots

- **`#header`**: `{ isExpanded, toggleSidebar }` — Personalize o cabeçalho
- **`#footer`**: `{ user, logout, currentTheme, setTheme, cycleTheme, getCurrentThemeIcon, getCurrentThemeLabel }` — Menu do usuário e temas
- **`#content`** (obrigatório): Conteúdo principal da página

### Comportamento por Breakpoint

- **`<768px`**: Drawer fullscreen com overlay clicável, botão hamburguer fixo
- **`768-1023px`**: Drawer overlay com dimensões ajustadas
- **`>=1024px`**: Flutuante/anexado conforme estado, com ícones de controle visíveis

### Exemplo com AppLayout

Em páginas autenticadas, use o `AppLayout` que já embute a estrutura Sidebar:

```vue
<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'

defineOptions({ layout: AppLayout })
</script>

<template>
  <div>
    <h1>Seu conteúdo aqui</h1>
    <!-- O AppLayout cuida de Sidebar, Header e estrutura geral -->
  </div>
</template>
```

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
