<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = ['id_product', 'id_customer', 'sale_date', 'quantity', 'total_price'];

    public function product()
    {
        return $this->belongsTo('App\Models\Product', 'id_product');
    }

    public function customer()
    {
        return $this->belongsTo('App\Models\Customer', 'id_customer');
    }
    use HasFactory;
}
