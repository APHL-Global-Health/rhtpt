@extends('app')
@section('content')
<div class="row">
    <div class="col-sm-12">
        <ol class="breadcrumb">
            <li><a href="{!! url('home') !!}"><i class="fa fa-home"></i> {!! trans('messages.home') !!}</a></li>
            <li class="active"><i class="fa fa-cubes"></i> {!! trans('messages.pt') !!}</li>
            <li class="active"><i class="fa fa-cube"></i> {!! trans_choice('messages.program', 2) !!}</li>
        </ol>
    </div>
</div>
<div class="" id="manage-program">
    <!-- Program Listing -->
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h5><i class="fa fa-book"></i> {!! trans_choice('messages.program', 2) !!}
        
                @permission('create-role')
                    <button type="button" class="btn btn-sm btn-belize-hole" data-toggle="modal" data-target="#create-program">
                        <i class="fa fa-plus-circle"></i>
                        {!! trans('messages.add') !!}
                    </button>
                @endpermission
                    <a class="btn btn-sm btn-carrot" href="#" onclick="window.history.back();return false;" alt="{!! trans('messages.back') !!}" title="{!! trans('messages.back') !!}">
                        <i class="fa fa-step-backward"></i>
                        {!! trans('messages.back') !!}
                    </a></h5>
            </div>
        </div>
    </div>
    <table class="table table-bordered">
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
        <tr v-for="program in programs">
            <td>@{{ program.name }}</td>
            <td>@{{ program.description }}</td>
            <td>	
                <button class="btn btn-sm btn-primary" @click.prevent="editProgram(program)"><i class="fa fa-edit"></i> Edit</button>
                <button class="btn btn-sm btn-danger" @click.prevent="deleteProgram(program)"><i class="fa fa-trash-o"></i> Delete</button>
            </td>
        </tr>
    </table>
    <!-- Pagination -->
    <nav>
        <ul class="pagination">
            <li v-if="pagination.current_page > 1" class="page-item">
                <a class="page-link" href="#" aria-label="Previous"
                    @click.prevent="changePage(pagination.current_page - 1)">
                    <span aria-hidden="true">«</span>
                </a>
            </li>
            <li v-for="page in pagesNumber" class="page-item"
                v-bind:class="[ page == isActived ? 'active' : '']">
                <a class="page-link" href="#"
                    @click.prevent="changePage(page)">@{{ page }}</a>
            </li>
            <li v-if="pagination.current_page < pagination.last_page" class="page-item">
                <a class="page-link" href="#" aria-label="Next"
                    @click.prevent="changePage(pagination.current_page + 1)">
                    <span aria-hidden="true">»</span>
                </a>
            </li>
        </ul>
    </nav>

    <!-- Create Program Modal -->
    <div class="modal fade" id="create-program" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Create Program</h4>
            </div>
            <div class="modal-body">

                <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="createProgram">

                    <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" name="name" class="form-control" v-model="newProgram.name" />
                    <span v-if="formErrors['name']" class="error text-danger">@{{ formErrors['name'] }}</span>
                </div>

                <div class="form-group">
                    <label for="title">Description:</label>
                    <textarea name="description" class="form-control" v-model="newProgram.description"></textarea>
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

    <!-- Edit Program Modal -->
    <div class="modal fade" id="edit-program" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Edit Program</h4>
            </div>
            <div class="modal-body">

                <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="updateProgram(fillProgram.id)">

                    <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" name="name" class="form-control" v-model="fillProgram.name" />
                    <span v-if="formErrorsUpdate['name']" class="error text-danger">@{{ formErrorsUpdate['name'] }}</span>
                </div>

                <div class="form-group">
                    <label for="title">Description:</label>
                    <textarea name="description" class="form-control" v-model="fillProgram.description"></textarea>
                    <span v-if="formErrorsUpdate['description']" class="error text-danger">@{{ formErrorsUpdate['description'] }}</span>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>

                </form>

            </div>
        </div>
        </div>
    </div>

</div>
@endsection