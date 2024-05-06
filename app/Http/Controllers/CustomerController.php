<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    // GET - Obtener todos los clientes
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers, 200);
    }

    // GET - Obtener un cliente por su ID
    public function show($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
        return response()->json($customer, 200);
    }

    // POST - Crear un nuevo cliente
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:customers',
            'password' => 'required',
            'phone' => 'required'
        ]);

        $customer = Customer::create($request->all());
        return response()->json($customer, 201);
    }

    // PUT - Actualizar un cliente existente
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:customers,email,'.$customer->id,
            'password' => 'required',
            'phone' => 'required'
        ]);

        $customer->update($request->all());
        return response()->json($customer, 200);
    }

    // DELETE - Eliminar un cliente
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
        $customer->delete();
        return response()->json(['message' => 'Cliente eliminado correctamente'], 200);
    }
}
