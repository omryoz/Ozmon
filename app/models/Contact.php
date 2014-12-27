<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

class Contact extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	public $timestamps = false;
	public $incrementing = false;
	protected $table = 'contacts';
	protected  $fillable = ['id','firstname','lastname','address','mobilenumber','landline','notes'];

	public function getColumns(){

			return $this->fillable;
	}


	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	//protected $hidden = array('password');
}
