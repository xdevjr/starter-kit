<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Http\RedirectResponse::macro('withToast', function ($severity, $summary, $detail, $life = 3000) {
            return $this->with('toast', [
                'severity' => $severity,
                'summary' => $summary,
                'detail' => $detail,
                'life' => $life,
            ]);
        });
    }
}
