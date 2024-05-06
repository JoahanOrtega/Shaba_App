<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'id_subcategory', 'size', 'color', 'available_quantity', 'img'];

    public function subcategory()
    {
        return $this->belongsTo('app\Models\Subcategory', 'id_subcategory');
    }
    use HasFactory;
}
