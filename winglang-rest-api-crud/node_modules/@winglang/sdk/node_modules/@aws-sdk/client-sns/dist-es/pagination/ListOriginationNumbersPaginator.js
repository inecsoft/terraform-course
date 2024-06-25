import { createPaginator } from "@smithy/core";
import { ListOriginationNumbersCommand, } from "../commands/ListOriginationNumbersCommand";
import { SNSClient } from "../SNSClient";
export const paginateListOriginationNumbers = createPaginator(SNSClient, ListOriginationNumbersCommand, "NextToken", "NextToken", "MaxResults");
