<?php

namespace App\Http\Controllers;

use App\Helpers\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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
        $result= (is_null($uuid))?
            DB::table('users')->get():
            DB::table('users')->where('id', $uuid)->get();

        $this->removePass($result);

        return $result;
    }

    public function save (Request $request, string $uuid= null)
    {
        $data= $request->all();
        if (is_null($uuid)) {
            $data['id']= Str::uuid();
            $data['created_at']= date('Y-m-d H:i:s');
            $action= 'create';
        } else {
            $data['id']= $uuid;
            $data['updated_at']= date('Y-m-d H:i:s');
            $action= 'update';
        }
        if ($request->filled('password')) {
            $data['password']= md5($request->input('password'));
        }
        $result= DB::table('users')->upsert($data, ['id', 'username'], ['fullname', 'password', 'role', 'updated_at']);

        unset($data['password']);

        return ($action === 'create')?
                    (($result === 1)? response()->json($data, 201): response('User do not created, username already exists', 409)):
                    (($result >= 1)? response()->json($data, 200): response('Nothing to update', 202));
    }

    public function delete (string $uuid) {
        $result= DB::table('users')->where('id', $uuid)->delete();

        return ($result === 1)? response('User deleted', 200): response('User not found', 400);
    }

    public function login (Request $request) {
        $result= DB::table('users')->where([
            'username'=> $request->input('username'),
            'password'=> md5($request->input('password'))
        ])->get();

        $this->removePass($result);

        return (count($result) === 1)? response()->json($result[0]): response()->json([], 401);
    }

    public function validation (Request $request) {
        // $token= json_decode(base64_decode($request->input('token')));

        // if ($token->time >= (time()+(12*60*60))) {
        //     return response('', 403);
        // }

        // $result= DB::table('users')->where('id', $token->v4)->get();

        $result= Validation::token($request->input('token'));

        $this->removePass($result);

        return (count($result) === 0)? response('Token not found', 400): response()->json($result, 200);
    }

    protected function removePass (Collection &$result) {
        foreach ($result as &$r) {
            unset($r->password);
        }
    }

    //
}
