<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

class MacroServiceProvider extends ServiceProvider
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
        $this->registerToastMacros();
    }

    /**
     * Register toast macros for RedirectResponse and JsonResponse.
     */
    protected function registerToastMacros(): void
    {
        RedirectResponse::macro('withToast', function ($severity, $summary, $detail, $life = 3000) {
            return $this->with('toast', [
                'severity' => $severity,
                'summary' => $summary,
                'detail' => $detail,
                'life' => $life,
            ]);
        });

        JsonResponse::macro('withToast', function ($severity, $summary, $detail, $life = 3000) {
            $data = $this->getData(true);
            $data['toast'] = [
                'severity' => $severity,
                'summary' => $summary,
                'detail' => $detail,
                'life' => $life,
            ];
            return $this->setData($data);
        });
    }
}
