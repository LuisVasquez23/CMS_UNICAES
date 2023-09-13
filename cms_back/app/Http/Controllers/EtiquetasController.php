<?php

namespace App\Http\Controllers;

use App\Models\Etiquetas;
use Illuminate\Http\Request;

class EtiquetasController extends Controller
{
    public function index()
    {
        $etiquetas = Etiquetas::all();
        return response()->json($etiquetas);
    }


    public function store(Request $request)
    {
        //
    }


    public function show(Etiquetas $etiquetas)
    {
        return response()->json(['status' => true, 'data' => $etiquetas]);

    }


    public function update(Request $request, Etiquetas $etiquetas)
    {
        //
    }


    public function destroy(Etiquetas $etiquetas)
    {
        //
    }
}
