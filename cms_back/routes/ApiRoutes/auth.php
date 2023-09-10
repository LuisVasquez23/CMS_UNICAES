<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('userProfile', [AuthController::class, 'userProfile']);
});

Route::post('login', [AuthController::class, 'login']);
Route::get('users', [AuthController::class, 'allUsers']);
