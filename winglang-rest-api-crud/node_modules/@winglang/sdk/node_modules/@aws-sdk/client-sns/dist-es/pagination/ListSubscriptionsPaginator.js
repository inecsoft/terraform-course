import { createPaginator } from "@smithy/core";
import { ListSubscriptionsCommand, } from "../commands/ListSubscriptionsCommand";
import { SNSClient } from "../SNSClient";
export const paginateListSubscriptions = createPaginator(SNSClient, ListSubscriptionsCommand, "NextToken", "NextToken", "");
