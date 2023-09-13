<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validación de los datos con mensajes personalizados
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email', // Agregamos el campo 'email' para especificar la columna en la base de datos
            'password' => 'required'
        ], [
            'name.required' => 'El campo nombre es obligatorio.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico no tiene un formato válido.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'password.required' => 'El campo contraseña es obligatorio.',
        ]);

        if ($validator->fails()) {
            // Si la validación falla, retornamos una respuesta JSON con los errores
            return new JsonResponse(['errors' => $validator->errors()], 422);
        }

        // Alta del usuario
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response($user, Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {

            /** @var \App\Models\User $user **/
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);

            $userId = $user->id;
            $userName = $user->name;

            $pageCount = $user->pages()->count();
           

            return response()->json([
                'token' => $token,
                'userId' => $userId,
                'userName' => $userName,
                'pageCount' => $pageCount,
                
            ], Response::HTTP_OK);

        } else {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function userProfile()
    {
        try {
            return response()->json([
                "message" => "Usuario Ok",
                "userData" => auth()->user()
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "No tienes permisos",
            ], Response::HTTP_UNAUTHORIZED);
        }
    }


    public function logout(Request $request)
    {
        try {
            $cookie = Cookie::forget('cookie_token');
            // Revoke the user's token
            $request->user()->tokens()->where('id', $request->user()->currentAccessToken()->id)->delete();

            return response()->json(['message' => 'Logout exitoso']);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()]);
        }
    }
}
