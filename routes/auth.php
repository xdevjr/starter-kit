<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)
    ->group(function () {
        Route::middleware('guest')->group(function () {
            Route::post('/register', 'register')->name('register.store');
            Route::post('/login', 'login')->name('login.store');
            Route::post('/forgot-password', 'forgotPassword')->name('forgot-password.store');
            Route::post('/reset-password', 'resetPassword')->name('reset-password.store');

            // Page Routes
            Route::get('/login', function () {
                return inertia('Login');
            })->name('login');

            Route::get('/register', function () {
                return inertia('Register');
            })->name('register');

            Route::get('/forgot-password', function () {
                return inertia('ForgotPassword');
            })->name('forgot-password');

            Route::get('/reset-password', function () {
                return inertia('ResetPassword');
            })->name('reset-password');
        });
        Route::post('/logout', 'logout')->middleware('auth', 'verified')->name('logout');
    });