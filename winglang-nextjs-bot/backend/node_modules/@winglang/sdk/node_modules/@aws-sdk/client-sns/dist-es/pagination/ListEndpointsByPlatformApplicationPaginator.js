import { createPaginator } from "@smithy/core";
import { ListEndpointsByPlatformApplicationCommand, } from "../commands/ListEndpointsByPlatformApplicationCommand";
import { SNSClient } from "../SNSClient";
export const paginateListEndpointsByPlatformApplication = createPaginator(SNSClient, ListEndpointsByPlatformApplicationCommand, "NextToken", "NextToken", "");
