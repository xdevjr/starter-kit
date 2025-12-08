<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Exibe a página de usuários
     */
    public function table()
    {
        return inertia('UsersTable');
    }

    public function card()
    {
        return inertia('UsersList');
    }

    /**
     * Lista usuários com filtros, ordenação e paginação
     */
    public function list(Request $request)
    {
        $query = User::query();

        // Filtros no formato filters[key]=value
        $filters = $request->input('filters', []);
        if (is_array($filters)) {
            foreach ($filters as $key => $value) {
                if ($value && in_array($key, ['name', 'email'])) {
                    $query->where($key, 'like', '%' . $value . '%');
                }
            }
        }

        // Ordenação como sort[]=field,direction
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
    }
}
