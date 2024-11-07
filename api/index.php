<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'vendor/autoload.php';
require_once 'config/database.php';

use Slim\Factory\AppFactory;

$app = AppFactory::create();

// Rutas
$app->get('/api/quotes', 'App\Controllers\QuoteController:getAll');
$app->get('/api/quotes/{id}', 'App\Controllers\QuoteController:getById');
$app->post('/api/quotes', 'App\Controllers\QuoteController:create');

$app->run();