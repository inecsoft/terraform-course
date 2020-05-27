# Copyright (c) 2012-2018, Mark Peek <mark@peek.org>
# All rights reserved.
#
# See LICENSE file for full license.

from . import AWSObject, AWSProperty
from .validators import boolean


class Spend(AWSProperty):
    props = {
        'Amount': (float, True),
        'Unit': (str, True),
    }


class CostTypes(AWSProperty):
    props = {
        'IncludeCredit': (boolean, False),
        'IncludeDiscount': (boolean, False),
        'IncludeOtherSubscription': (boolean, False),
        'IncludeRecurring': (boolean, False),
        'IncludeRefund': (boolean, False),
        'IncludeSubscription': (boolean, False),
        'IncludeSupport': (boolean, False),
        'IncludeTax': (boolean, False),
        'IncludeUpfront': (boolean, False),
        'UseAmortized': (boolean, False),
        'UseBlended': (boolean, False),
    }


class TimePeriod(AWSProperty):
    props = {
        'End': (str, False),
        'Start': (str, False),
    }


class BudgetData(AWSProperty):
    props = {
        'BudgetLimit': (Spend, False),
        'BudgetName': (str, False),
        'BudgetType': (str, True),
        'CostFilters': (dict, False),
        'CostTypes': (CostTypes, False),
        'TimePeriod': (TimePeriod, False),
        'TimeUnit': (str, True),
    }


class Notification(AWSProperty):
    props = {
        'ComparisonOperator': (str, True),
        'NotificationType': (str, True),
        'Threshold': (float, True),
        'ThresholdType': (str, False),
    }


class Subscriber(AWSProperty):
    props = {
        'Address': (str, True),
        'SubscriptionType': (str, True),
    }


class NotificationWithSubscribers(AWSProperty):
    props = {
        'Notification': (Notification, True),
        'Subscribers': ([Subscriber], True),
    }


class Budget(AWSObject):
    resource_type = "AWS::Budgets::Budget"

    props = {
        'Budget': (BudgetData, True),
        'NotificationsWithSubscribers':
            ([NotificationWithSubscribers], False),
    }
