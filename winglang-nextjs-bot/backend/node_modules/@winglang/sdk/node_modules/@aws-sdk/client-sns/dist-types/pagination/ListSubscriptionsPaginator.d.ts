import { Paginator } from "@smithy/types";
import { ListSubscriptionsCommandInput, ListSubscriptionsCommandOutput } from "../commands/ListSubscriptionsCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListSubscriptions: (config: SNSPaginationConfiguration, input: ListSubscriptionsCommandInput, ...rest: any[]) => Paginator<ListSubscriptionsCommandOutput>;
