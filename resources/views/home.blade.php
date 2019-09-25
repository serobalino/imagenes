@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        @if (Auth::user()->can)
        <div class="col-md-9">
            <div class="card">
                <div class="card-body">
                    <formulario></formulario>
                </div>
            </div>
        </div>
        @endif
        <div class="col-md-9 mt-5">
            <div class="card">
                <div class="card-body">
                    <fotos></fotos>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
