<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return inertia('Home');
});

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Page Routes
Route::get('/login', function () {
    return inertia('Login');
});

Route::get('/register', function () {
    return inertia('Register');
});

Route::get('/forgot-password', function () {
    return inertia('ForgotPassword');
});

Route::get('/reset-password', function () {
    return inertia('ResetPassword');
});

Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->middleware('auth');
