<?php
namespace App\Http\Middleware;

use App\Helpers\Validation;
use Closure;
use Illuminate\Http\Request;

class Authorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle ($request, Closure $next)
    {
        $header= $request->header('Authorization');
        $header= explode(' ', $header);
        if (!isset($header[1])) {
            return response('Token did not sent', 401);
        }
        $token= $header[1];

        $result= Validation::token($token);

        $response = $next($request);

        return (is_null($result))? response('Unauthorized', 401): $response;
    }
}
