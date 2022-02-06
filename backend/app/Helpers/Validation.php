<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Validation
{

    /**
     * Get user data by token
     *
     * @param  string        $token Header Authorization toke
     * @return null|stdClass        logged user data
     */
    public static function token(string $token) : ?\stdClass
    {
        $token= json_decode(base64_decode($token));

        if ($token->time >= (time()+(12*60*60))) {
            return response('', 403);
        }

        $result= DB::table('users')->where('id', $token->v4)->get();

        return (count($result) === 1)? $result[0]: null;
    }

    /**
     * verify if user logged is admin
     *
     * @param  Request $request request data
     * @return bool             true if user logged is in admin role
     */
    public static function isAdmin (Request $request) : bool
    {
        $result= Validation::token($request->input('token'));

        return ($result->role === 'admin')? true: false;
    }
}
