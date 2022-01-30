<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AlbumController extends Controller
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

    public function get (string $id= null) {
        return (is_null($id))?
            DB::table('album')->get():
            DB::table('album')->where('id', $id)->get();
    }

    public function save (Request $request, string $id= null)
    {
        $data= $request->all();
        $data['id']= $id;
        return DB::table('album')->upsert($data, ['id', 'name', 'artist_id', 'year', 'user_id'], ['name', 'artist_id', 'year']);
    }

    public function delete (string $id) {
        return DB::table('album')->where('id', $id)->delete();
    }

    //
}
