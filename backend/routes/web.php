<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// users routers
$router->get('users', 'UsersController@get');
$router->get('users/{uuid}', 'UsersController@get');
$router->put('users/{uuid}', 'UsersController@save');
$router->post('users', 'UsersController@save');
$router->delete('users/{uuid}', 'UsersController@delete');
$router->post('login', 'UsersController@login');
$router->post('validation', 'UsersController@validation');

// album routers
$router->get('album', 'AlbumController@get');
$router->get('album/{id}', 'AlbumController@get');
$router->post('album', 'AlbumController@save');
$router->post('album/{id}', 'AlbumController@save');
$router->delete('album/{id}', 'AlbumController@delete');
