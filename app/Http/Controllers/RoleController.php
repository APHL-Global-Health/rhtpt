<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Role;

class RoleController extends Controller
{

    public function manageRole()
    {
        return view('role.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roles = Role::latest()->paginate(5);

        $response = [
            'pagination' => [
                'total' => $roles->total(),
                'per_page' => $roles->perPage(),
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'from' => $roles->firstItem(),
                'to' => $roles->lastItem()
            ],
            'data' => $roles
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
        ]);

        $create = Role::create($request->all());

        return response()->json($create);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
        ]);

        $edit = Role::find($id)->update($request->all());

        return response()->json($edit);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Role::find($id)->delete();
        return response()->json(['done']);
    }
}