import { Paginator } from "@smithy/types";
import {
  ListSubscriptionsByTopicCommandInput,
  ListSubscriptionsByTopicCommandOutput,
} from "../commands/ListSubscriptionsByTopicCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
export declare const paginateListSubscriptionsByTopic: (
  config: SNSPaginationConfiguration,
  input: ListSubscriptionsByTopicCommandInput,
  ...rest: any[]
) => Paginator<ListSubscriptionsByTopicCommandOutput>;
