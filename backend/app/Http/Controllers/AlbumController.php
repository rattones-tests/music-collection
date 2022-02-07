<?php

namespace App\Http\Controllers;

use App\Helpers\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $this->middleware('authorization');
    }


    /**
     * get a list or a single album
     *
     * @param  Request  $request request params
     * @param  string   [$id]    album id to return
     * @return Response
     */
    public function get (Request $request, string $id= null) {
        $token= $request->header('Authorization');
        $token= explode(' ', $token);
        $token= Validation::token($token[1]);
// return response()->json($token, 400);

        $result= (is_null($id))?
            DB::table('album')->where('user_id', $token->id)->get():
            DB::table('album')->where('id', $id)->get();

        return (count($result) === 0)? response('Album list is empty', 204): response()->json($result, 200);
    }


    /**
     * create or update an album
     *
     * @param  Request $request request params
     * @param  string  [$id]    album id to update
     * @return Response
     */
    public function save (Request $request, string $id= null)
    {
        $data= $request->all();
        $data['id']= $id;
        if (is_null($id)) {
            $data['created_at']= date('Y-m-d H:i:s');
            $action= 'create';
        } else {
            $data['updated_at']= date('Y-m-d H:i:s');
            $action= 'update';
        }
        $result= DB::table('album')->upsert($data,
                    ['name', 'artist_id', 'year', 'user_id'],
                    ['name', 'artist_id', 'year', 'updated_at']);
        return ($action === 'create')?
                (($result === 1)? response()->json($data, 201): response('Album do not created, album already exists', 409)):
                (($result >= 1)? response()->json($data, 200): response('Nothing to update', 202));

    }


    /**
     * delete an album
     *
     * @param  Request $request request params
     * @param  string  $id      album id to delete
     * @return Response
     */
    public function delete (string $id) {
        $result= DB::table('album')->where('id', $id)->delete();

        return ($result === 0)? response('Album not found', 400): response('Album deleted', 200);
    }

    //
}
