<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // GET - Obtener todos los productos
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    // GET - Obtener un producto por su ID
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        return response()->json($product, 200);
    }

    // POST - Crear un nuevo producto
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'id_subcategory' => 'required|exists:subcategories,id_subcategory',
            'size' => 'nullable',
            'color' => 'nullable',
            'available_quantity' => 'integer',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $product = Product::create($request->all());
        if ($request->hasFile('img_path')) {
            $image = $request->file('img_path');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $product->img_path = 'images/'.$imageName;
            $product->save();
        }
        return response()->json($product, 201);
    }

    // PUT - Actualizar un producto existente
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'id_subcategory' => 'required|exists:subcategories,id_subcategory',
            'size' => 'nullable',
            'color' => 'nullable',
            'available_quantity' => 'integer',
            'img' => 'nullable'
        ]);

        $product->update($request->all());
        return response()->json($product, 200);
    }

    // DELETE - Eliminar un producto
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Producto eliminado correctamente'], 200);
    }
}
