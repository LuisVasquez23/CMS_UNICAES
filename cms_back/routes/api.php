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
Route::get('pages/{user_id}', [PageController::class, 'getPagesByUserId']);
Route::get('/page-count/{user_id}', [PageController::class, 'getPageCount']);
Route::get('/pages/show/{id}', [PageController::class, 'show']);

Route::get('pages/{id}/html', [PageController::class, 'getPageHTML'])->name('pages.html');


Route::post('store', [PageController::class, 'store']);


Route::put('/pages/update/{id}', [PageController::class, 'update']);


Route::delete('/pages/{id}', [PageController::class, 'deletePage']);


//Ruta para acceder a las etiquetas

Route::resource('etiquetas', EtiquetasController::class);


require __DIR__ . '/ApiRoutes/auth.php';
