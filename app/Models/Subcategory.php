<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = ['description', 'id_category'];

    public function category()
    {
        return $this->belongsTo('app\Models\Category', 'id_category');
    }
    use HasFactory;
}
