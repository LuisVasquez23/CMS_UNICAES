<?php

use App\Http\Controllers\EtiquetasController;
use App\Http\Controllers\PageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\ClientController;
use Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController;

// Registrar las rutas de Passport
Route::post('/oauth/token', [AccessTokenController::class, 'issueToken'])->middleware(['web']);
Route::post('/oauth/token/refresh', [AccessTokenController::class, 'refresh'])->middleware(['web']);


//Rutas para manejar el ingreso de paginas

Route::post('store', [PageController::class, 'store']);
Route::get('pages/{user_id}', [PageController::class, 'getPagesByUserId']);


//Ruta para acceder a las etiquetas

Route::resource('etiquetas', EtiquetasController::class);


require __DIR__ . '/ApiRoutes/auth.php';
