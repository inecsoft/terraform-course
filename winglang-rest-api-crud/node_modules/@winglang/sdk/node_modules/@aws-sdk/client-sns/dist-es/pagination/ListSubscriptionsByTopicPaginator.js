import { createPaginator } from "@smithy/core";
import { ListSubscriptionsByTopicCommand, } from "../commands/ListSubscriptionsByTopicCommand";
import { SNSClient } from "../SNSClient";
export const paginateListSubscriptionsByTopic = createPaginator(SNSClient, ListSubscriptionsByTopicCommand, "NextToken", "NextToken", "");
