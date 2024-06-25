import { createPaginator } from "@smithy/core";
import { ListPlatformApplicationsCommand, } from "../commands/ListPlatformApplicationsCommand";
import { SNSClient } from "../SNSClient";
export const paginateListPlatformApplications = createPaginator(SNSClient, ListPlatformApplicationsCommand, "NextToken", "NextToken", "");
