<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = ['description', 'id_category'];

    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'id_subcategory');
    }
}