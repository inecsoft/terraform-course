import { Paginator } from "@smithy/types";
import { ListPlatformApplicationsCommandInput, ListPlatformApplicationsCommandOutput } from "../commands/ListPlatformApplicationsCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListPlatformApplications: (config: SNSPaginationConfiguration, input: ListPlatformApplicationsCommandInput, ...rest: any[]) => Paginator<ListPlatformApplicationsCommandOutput>;
