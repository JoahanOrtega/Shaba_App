<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Route;

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
        //
        Passport::tokensExpireIn(now()->addHour()); // Tokens de acceso expiran en 1 hora
        Passport::refreshTokensExpireIn(now()->addDays(7)); // Tokens de actualización expiran en 7 días

    }
}
