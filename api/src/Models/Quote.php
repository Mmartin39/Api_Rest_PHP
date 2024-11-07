<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model {
    protected $fillable = ['author', 'content', 'rating'];
    
    public static function rules() {
        return [
            'author' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:0|max:5'
        ];
    }
}