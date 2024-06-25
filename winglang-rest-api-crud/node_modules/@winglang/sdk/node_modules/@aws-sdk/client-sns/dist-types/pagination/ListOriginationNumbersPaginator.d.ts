import { Paginator } from "@smithy/types";
import { ListOriginationNumbersCommandInput, ListOriginationNumbersCommandOutput } from "../commands/ListOriginationNumbersCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListOriginationNumbers: (config: SNSPaginationConfiguration, input: ListOriginationNumbersCommandInput, ...rest: any[]) => Paginator<ListOriginationNumbersCommandOutput>;
