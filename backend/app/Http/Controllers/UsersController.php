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

    /**
     * get a list or a single user
     *
     * @param  string [$uuid] user uuid to return
     * @return Response
     */
    public function get (string $uuid= null) {
        $result= (is_null($uuid))?
            DB::table('users')->get():
            DB::table('users')->where('id', $uuid)->get();

        $this->removePass($result);

        return $result;
    }

    /**
     * create or update an user
     *
     * @param  Request $request request params
     * @param  string  [$uuid]  user uuid to update
     * @return Response
     */
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
            if (!Validation::isAdmin($request)) {
                unset($data['role']);
            }
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

    /**
     * delete an user
     *
     * @param  Request $request request params
     * @param  string  $uuid    user uuid to delete
     * @return Response
     */
    public function delete (Request $request, string $uuid) {
        if (!Validation::isAdmin($request)) {
            return response('User must be admin to delete users', 401);
        }

        $result= DB::table('users')->where('id', $uuid)->delete();

        return ($result === 1)? response('User deleted', 200): response('User not found', 400);
    }

    /**
     * do a login
     *
     * @param  Request  $request username and password
     * @return Response
     */
    public function login (Request $request) {
        $result= DB::table('users')->where([
            'username'=> $request->input('username'),
            'password'=> md5($request->input('password'))
        ])->get();

        $this->removePass($result);

        return (count($result) === 1)? response()->json($result[0]): response()->json([], 401);
    }

    public function validation (Request $request) {
        $result= Validation::token($request->input('token'));

        if (is_null($result)) {
            return response('No header sent, user not logged', 400);
        }

        $col= new Collection([$result]);

        $this->removePass($col);
        return response()->json($col, 200);
    }

    /**
     * remove password hash from result collection
     *
     * @param Collection &$result collection of users
     */
    protected function removePass (Collection &$result) {
        foreach ($result as &$r) {
            unset($r->password);
        }
    }

    //
}
