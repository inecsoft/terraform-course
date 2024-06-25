import { Paginator } from "@smithy/types";
import {
  ListEndpointsByPlatformApplicationCommandInput,
  ListEndpointsByPlatformApplicationCommandOutput,
} from "../commands/ListEndpointsByPlatformApplicationCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
export declare const paginateListEndpointsByPlatformApplication: (
  config: SNSPaginationConfiguration,
  input: ListEndpointsByPlatformApplicationCommandInput,
  ...rest: any[]
) => Paginator<ListEndpointsByPlatformApplicationCommandOutput>;
