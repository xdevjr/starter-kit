<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
})->name('home');

Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->name('dashboard')->middleware('auth');
