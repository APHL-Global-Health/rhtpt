@extends('app')
@section('content')
<div class="" id="manage-role">
    <!-- Role Listing -->
    <meta id="token" name="token" value="{{ csrf_token() }}">
    <h3 class="box-title m-b-0">Departments Details</h3>
    <hr>
            <div class="pull-right">
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#create-role">
                <i class="fa fa-plus-circle"></i> Create Role
            </button>
            </div>
            <table class="table table-bordered table-responsive">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                <tr v-for="role in roles">
                    <td>@{{ role.name }}</td>
                    <td>@{{ role.description }}</td>
                    <td>	
                        <button class="btn btn-sm btn-primary" @click.prevent="editRole(role)"><i class="fa fa-edit"></i> Edit</button>
                        <button class="btn btn-sm btn-danger" @click.prevent="deleteRole(role)"><i class="fa fa-trash-o"></i> Delete</button>
                    </td>
                </tr>
            </table>
            <hr>
            <!-- Pagination -->
            <nav>
                <ul class="pagination">
                    <li v-if="pagination.current_page > 1">
                        <a href="#" aria-label="Previous"
                            @click.prevent="changePage(pagination.current_page - 1)">
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    <li v-for="page in pagesNumber"
                        v-bind:class="[ page == isActived ? 'active' : '']">
                        <a href="#"
                            @click.prevent="changePage(page)">@{{ page }}</a>
                    </li>
                    <li v-if="pagination.current_page < pagination.last_page">
                        <a href="#" aria-label="Next"
                            @click.prevent="changePage(pagination.current_page + 1)">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
      </div>

    <!-- Create Role Modal -->
    <div class="modal fade" id="create-role" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Create Role</h4>
            </div>
            <div class="modal-body">

                <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="createRole">

                    <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" name="name" class="form-control" v-model="newRole.name" />
                    <span v-if="formErrors['name']" class="error text-danger">@{{ formErrors['name'] }}</span>
                </div>

                <div class="form-group">
                    <label for="title">Description:</label>
                    <textarea name="description" class="form-control" v-model="newRole.description"></textarea>
                    <span v-if="formErrors['description']" class="error text-danger">@{{ formErrors['description'] }}</span>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>

                </form>

            
            </div>
        </div>
        </div>
    </div>

    <!-- Edit Role Modal -->
    <div class="modal fade" id="edit-role" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Edit Role</h4>
            </div>
            <div class="modal-body">

                <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="updateRole(fillRole.id)">

                    <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" name="name" class="form-control" v-model="fillRole.name" />
                    <span v-if="formErrorsUpdate['name']" class="error text-danger">@{{ formErrorsUpdate['name'] }}</span>
                </div>

                <div class="form-group">
                    <label for="title">Description:</label>
                    <textarea name="description" class="form-control" v-model="fillRole.description"></textarea>
                    <span v-if="formErrorsUpdate['description']" class="error text-danger">@{{ formErrorsUpdate['description'] }}</span>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>

                </form>

            </div>
        </div>
        </div>
@endsection