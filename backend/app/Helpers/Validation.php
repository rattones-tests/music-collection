<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class Validation
{

    public static function token(string $token)
    {
        $token= json_decode(base64_decode($token));

        if ($token->time >= (time()+(12*60*60))) {
            return response('', 403);
        }

        $result= DB::table('users')->where('id', $token->v4)->get();

        return $result;
    }

}
