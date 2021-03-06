<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

class User extends Eloquent {
    public $timestamps = false;
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';
    protected $fillable = ['username', 'first_name','last_name','address'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	public function getColumns(){
		$columns = DB::query('SHOW COLUMNS FROM '+$this->table);
		$fields = array();
		foreach($columns as $col)
			$fields[] = $col->field;

		return $fields;
	}
}
