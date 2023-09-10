<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\ClientController;
use Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController;

// Registrar las rutas de Passport
Route::post('/oauth/token', [AccessTokenController::class, 'issueToken'])->middleware(['web']);
Route::post('/oauth/token/refresh', [AccessTokenController::class, 'refresh'])->middleware(['web']);

require __DIR__ . '/ApiRoutes/auth.php';
