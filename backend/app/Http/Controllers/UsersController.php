<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function get (string $uuid= null) {
        return (is_null($uuid))?
            DB::table('users')->get():
            DB::table('users')->where('id', $uuid)->get();
    }

    public function save (Request $request, string $uuid= null)
    {
        $data= $request->all();
        if (is_null($uuid)) {
            $data['id']= Str::uuid();
        } else {
            $data['id']= $uuid;
        }
        if ($request->filled('password')) {
            $data['password']= md5($request->input('password'));
        }
        return DB::table('users')->upsert($data, ['id', 'username'], ['fullname', 'password']);
    }

    public function delete (string $uuid) {
        return DB::table('users')->where('id', $uuid)->delete();
    }

    public function login (Request $request) {
        $resultSet= DB::table('users')->where([
            'username'=> $request->input('username'),
            'password'=> md5($request->input('password'))
        ])->get();
        return $resultSet;
    }

    //
}
