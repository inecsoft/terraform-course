import { Paginator } from "@smithy/types";
import {
  ListPhoneNumbersOptedOutCommandInput,
  ListPhoneNumbersOptedOutCommandOutput,
} from "../commands/ListPhoneNumbersOptedOutCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
export declare const paginateListPhoneNumbersOptedOut: (
  config: SNSPaginationConfiguration,
  input: ListPhoneNumbersOptedOutCommandInput,
  ...rest: any[]
) => Paginator<ListPhoneNumbersOptedOutCommandOutput>;
