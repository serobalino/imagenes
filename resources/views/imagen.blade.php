@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-9 mt-5">
                <div class="card">
                    <div class="card-body">
                        <fotos id="{{$obj}}"></fotos>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection