import { PaginationConfiguration } from "@smithy/types";
import { SNSClient } from "../SNSClient";
export interface SNSPaginationConfiguration extends PaginationConfiguration {
  client: SNSClient;
}
