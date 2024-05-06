<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;

class SubcategoryController extends Controller
{
    // GET - Obtener todas las ventas
    public function index()
    {
        $sales = Sale::all();
        return response()->json($sales, 200);
    }

    // GET - Obtener una venta por su ID
    public function show($id)
    {
        $sale = Sale::find($id);
        if (!$sale) {
            return response()->json(['message' => 'Venta no encontrada'], 404);
        }
        return response()->json($sale, 200);
    }

    // POST - Crear una nueva venta
    public function store(Request $request)
    {
        $request->validate([
            'id_product' => 'required|exists:products,id_product',
            'id_customer' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0'
        ]);

        $sale = Sale::create($request->all());
        return response()->json($sale, 201);
    }

    // PUT - Actualizar una venta existente
    public function update(Request $request, $id)
    {
        $sale = Sale::find($id);
        if (!$sale) {
            return response()->json(['message' => 'Venta no encontrada'], 404);
        }

        $request->validate([
            'id_product' => 'required|exists:products,id_product',
            'id_customer' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0'
        ]);

        $sale->update($request->all());
        return response()->json($sale, 200);
    }

    // DELETE - Eliminar una venta
    public function destroy($id)
    {
        $sale = Sale::find($id);
        if (!$sale) {
            return response()->json(['message' => 'Venta no encontrada'], 404);
        }
        $sale->delete();
        return response()->json(['message' => 'Venta eliminada correctamente'], 200);
    }
}
