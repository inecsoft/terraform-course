import { createPaginator } from "@smithy/core";
import { ListSMSSandboxPhoneNumbersCommand, } from "../commands/ListSMSSandboxPhoneNumbersCommand";
import { SNSClient } from "../SNSClient";
export const paginateListSMSSandboxPhoneNumbers = createPaginator(SNSClient, ListSMSSandboxPhoneNumbersCommand, "NextToken", "NextToken", "MaxResults");
