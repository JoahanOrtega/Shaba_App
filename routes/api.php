<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
#Route::post('/login', 'AuthController@login');
#Route::post('/register', 'AuthController@register');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas para el controlador CustomerController
Route::get('/customers', [CustomerController::class, 'index']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

// Rutas para el controlador CategoryController
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// Rutas para el controlador SubcategoryController
Route::get('/subcategories', [SubcategoryController::class, 'index']);
Route::get('/subcategories/{id}', [SubcategoryController::class, 'show']);
Route::post('/subcategories', [SubcategoryController::class, 'store']);
Route::put('/subcategories/{id}', [SubcategoryController::class, 'update']);
Route::delete('/subcategories/{id}', [SubcategoryController::class, 'destroy']);

// Rutas para el controlador ProductController
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Rutas para el controlador SaleController
Route::get('/sales', [SaleController::class, 'index']);
Route::get('/sales/{id}', [SaleController::class, 'show']);
Route::post('/sales', [SaleController::class, 'store']);
Route::put('/sales/{id}', [SaleController::class, 'update']);
Route::delete('/sales/{id}', [SaleController::class, 'destroy']);
