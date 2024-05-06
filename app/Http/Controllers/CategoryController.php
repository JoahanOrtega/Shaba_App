<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // GET - Obtener todas las categorías
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    // GET - Obtener una categoría por su ID
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
        return response()->json($category, 200);
    }

    // POST - Crear una nueva categoría
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories'
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }


    

    public function destroy(Request $request){
        $category = Category::where('id',$request->id)
        ->delete();
        return 'ok';
    }

    
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
    
        if (!$category) {
            return response()->json(['mensaje' => 'Categoría no encontrada'], 404);
        }
    
        $request->validate([
            'name' => 'required|unique:categories,name,'.$id.',id',
        ]);
    
        $category->name = $request->name;
        $category->save();
    
        return response()->json($category, 200);
    }
    
    
}
