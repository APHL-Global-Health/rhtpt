<?php namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Notification extends Model
{
	public $fillable = ['template', 'message'];
  	/**
  	 * Enabling soft deletes for rounds.
  	 *
  	 */
  	use SoftDeletes;
  	protected $dates = ['deleted_at'];

  	/**
  	 * The database table used by the model.
  	 *
  	 * @var string
  	 */
  	protected $table = 'notifications';
	//  Notification templates
    const PANEL_DISPATCH = 1;
    const RESULTS_RECEIVED = 2;
    const FEEDBACK_RELEASE = 3;
    const OTHER = 4;
    const ENROLMENT = 5;

    /**
  	 * Return readable tag
  	 */
  	public function notification($id)
  	{
  		  if($id == Notification::PANEL_DISPATCH)
            return 'Panels Dispatched';
        else if($id == Notification::RESULTS_RECEIVED)
            return 'Results Received';
        else if($id == Notification::FEEDBACK_RELEASE)
            return 'Feedback Release';
        else if($id == Notification::OTHER)
            return 'Other';
        else if($id == Notification::ENROLMENT)
            return 'Enrolment';
  	}
}
