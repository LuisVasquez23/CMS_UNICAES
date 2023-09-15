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


    public function show($id)
    {
        try {
            $page = Page::findOrFail($id);

            return response()->json($page);
        } catch (\Exception $e) {
            // Maneja cualquier error que pueda ocurrir, como página no encontrada
            return response()->json(['message' => 'Página no encontrada'], 404);
        }
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


    public function getPageCount($user_id)
    {

    $user = User::find($user_id);

    if (!$user) {
        // Si el usuario no existe, devuelve una respuesta de error
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    $pageCount = Page::where('user_id', $user_id)->count();
    
    return response()->json(['pageCount' => $pageCount]);
    }
    
    
    
    public function deletePage($id)
    {
    $page = Page::find($id);

    if (!$page) {
        return response()->json(['message' => 'Página no encontrada'], 404);
    }

    // Elimina la página
    $page->delete();

    return response()->json(['message' => 'Página eliminada con éxito']);
    }


    public function update(Request $request, $id)
    {
        // Valida los datos del formulario
        $request->validate([
            'title' => 'required|string',
            'url' => 'required|url',
            'HTMLContent' => 'required|string',
        ]);

        try {
            // Encuentra la página por su ID
            $page = Page::findOrFail($id);

            // Actualiza los campos de la página con los datos del formulario
            $page->title = $request->input('title');
            $page->url = $request->input('url');
            $page->HTMLContent = $request->input('HTMLContent');

            // Guarda los cambios en la base de datos
            $page->save();

            // Devuelve una respuesta exitosa
            return response()->json(['message' => 'Página actualizada correctamente'], 200);
        } catch (\Exception $e) {
            // Manejo de errores en caso de que algo salga mal
            return response()->json(['error' => 'Error al actualizar la página'], 500);
        }
    }




}
