<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return inertia('Home');
})->name('home');

// Authentication Routes
Route::post('/register', [AuthController::class, 'register'])->name('register.store');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password.store');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('reset-password.store');

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

Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->name('dashboard')->middleware('auth');
