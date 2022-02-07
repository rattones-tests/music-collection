<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // creating first admin user
        $uuid= Str::uuid();
        DB::table('users')->insert([
            'id'=> $uuid,
            'fullname'=> 'Admin User',
            'username'=> 'admin',
            'password'=> md5('123$Pass'),
            'role'=> 'admin',
            'created_ae'=> date('Y-m-d H:i:s')
        ]);
    }
}
