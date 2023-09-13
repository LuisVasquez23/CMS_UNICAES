<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PageController extends Controller
{


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'url' => 'required|url',
            'HTMLContent' => 'required',
            'user_id' => 'required|exists:users,id'
        ], [
            'title.required' => 'El titulo es obligatorio.',
            'url.required' => 'La url de la pagina es obligatoria.',
            'HTMLContent.required' => 'No puedes crear una pagina en blanco, añade contenido',
            'user_id.required' => 'El id del usuario es requerido',
        ]);

        if ($validator->fails()) {
            // Si la validación falla, retornamos una respuesta JSON con los errores
            return new JsonResponse(['errors' => $validator->errors()], 422);
        }

        // $user = Auth::user();

        // $userId = $user->id;

        // Valida los datos del formulario
        $request->validate([
            'title' => 'required|string',
            'url' => 'required|url',
            'HTMLContent' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $page = new Page([
            'title' => $request->input('title'),
            'url' => $request->input('url'),
            'HTMLContent' => $request->input('HTMLContent'),
            'user_id' => $request->input('user_id'),
        ]);

        $page->save();

        return response()->json(['message' => 'Página creada con éxito'], 201);
    }






    public function getPagesByUserId($user_id)
    {
        // Busca al usuario por su ID
        $user = User::find($user_id);

        if (!$user) {
            // Si el usuario no existe, devuelve una respuesta de error
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        // Recupera las páginas asociadas al usuario
        $pages = $user->pages;
    
        return response()->json($pages, 200);
    }


}
