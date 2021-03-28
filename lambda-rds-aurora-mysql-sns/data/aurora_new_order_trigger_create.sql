DELIMITER ;;
CREATE TRIGGER TR_Order_Send_Notification
  AFTER INSERT ON "${local.default_name}-aurora-mysql.orders"
  FOR EACH ROW
BEGIN
  CALL mysql.lambda_async (
	  -- 'arn:aws:lambda:eu-west-1:120761991245:function:wiredbraincoffee-new-order-notification',
    '${aws_lambda_function.lambda-function.arn}',
	  '{}'
	);
END
;;
DELIMITER ;