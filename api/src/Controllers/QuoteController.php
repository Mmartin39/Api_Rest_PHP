<?php
namespace App\Controllers;

use App\Models\Quote;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class QuoteController {
    public function getAll(Request $request, Response $response) {
        $quotes = Quote::orderBy('created_at', 'desc')->get();
        $response->getBody()->write(json_encode($quotes));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getById(Request $request, Response $response, array $args) {
        $quote = Quote::find($args['id']);
        if (!$quote) {
            return $response->withStatus(404);
        }
        $response->getBody()->write(json_encode($quote));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response) {
        $data = json_decode($request->getBody(), true);
        
        if (!$this->validate($data)) {
            return $response->withStatus(400);
        }

        $quote = Quote::create([
            'author' => $data['author'],
            'content' => $data['content'],
            'rating' => $data['rating']
        ]);

        $response->getBody()->write(json_encode($quote));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    private function validate($data) {
        return isset($data['author']) && 
               isset($data['content']) && 
               isset($data['rating']) &&
               $data['rating'] >= 0 && 
               $data['rating'] <= 5;
    }
}