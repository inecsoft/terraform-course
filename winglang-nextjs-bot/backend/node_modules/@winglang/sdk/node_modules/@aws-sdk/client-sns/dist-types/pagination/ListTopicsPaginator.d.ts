import { Paginator } from "@smithy/types";
import { ListTopicsCommandInput, ListTopicsCommandOutput } from "../commands/ListTopicsCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListTopics: (config: SNSPaginationConfiguration, input: ListTopicsCommandInput, ...rest: any[]) => Paginator<ListTopicsCommandOutput>;
