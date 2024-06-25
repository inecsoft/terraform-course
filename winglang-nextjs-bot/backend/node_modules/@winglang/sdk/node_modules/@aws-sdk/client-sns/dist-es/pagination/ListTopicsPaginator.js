import { createPaginator } from "@smithy/core";
import { ListTopicsCommand } from "../commands/ListTopicsCommand";
import { SNSClient } from "../SNSClient";
export const paginateListTopics = createPaginator(SNSClient, ListTopicsCommand, "NextToken", "NextToken", "");
