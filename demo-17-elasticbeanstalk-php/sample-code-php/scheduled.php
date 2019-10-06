<?
if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
  $file = '/tmp/sample-app.log';
  $taskname = $_SERVER['HTTP_X_AWS_SQSD_TASKNAME'];
  $schedule_time = $_SERVER['HTTP_X_AWS_SQSD_SCHEDULED_AT'];
  $message = sprintf(" Received task %s scheduled at %s.", $taskname, $schedule_time);
  file_put_contents($file, date('Y-m-d H:i:s') . $message . "\n", FILE_APPEND);
}
?>

