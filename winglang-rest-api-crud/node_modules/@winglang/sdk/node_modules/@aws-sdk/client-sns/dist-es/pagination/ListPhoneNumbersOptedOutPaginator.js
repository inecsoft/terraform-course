import { createPaginator } from "@smithy/core";
import { ListPhoneNumbersOptedOutCommand, } from "../commands/ListPhoneNumbersOptedOutCommand";
import { SNSClient } from "../SNSClient";
export const paginateListPhoneNumbersOptedOut = createPaginator(SNSClient, ListPhoneNumbersOptedOutCommand, "nextToken", "nextToken", "");
