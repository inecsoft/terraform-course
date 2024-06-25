import { Paginator } from "@smithy/types";
import {
  ListSMSSandboxPhoneNumbersCommandInput,
  ListSMSSandboxPhoneNumbersCommandOutput,
} from "../commands/ListSMSSandboxPhoneNumbersCommand";
import { SNSPaginationConfiguration } from "./Interfaces";
export declare const paginateListSMSSandboxPhoneNumbers: (
  config: SNSPaginationConfiguration,
  input: ListSMSSandboxPhoneNumbersCommandInput,
  ...rest: any[]
) => Paginator<ListSMSSandboxPhoneNumbersCommandOutput>;
