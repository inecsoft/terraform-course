import { HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";
import {
  AddPermissionCommandInput,
  AddPermissionCommandOutput,
} from "./commands/AddPermissionCommand";
import {
  CheckIfPhoneNumberIsOptedOutCommandInput,
  CheckIfPhoneNumberIsOptedOutCommandOutput,
} from "./commands/CheckIfPhoneNumberIsOptedOutCommand";
import {
  ConfirmSubscriptionCommandInput,
  ConfirmSubscriptionCommandOutput,
} from "./commands/ConfirmSubscriptionCommand";
import {
  CreatePlatformApplicationCommandInput,
  CreatePlatformApplicationCommandOutput,
} from "./commands/CreatePlatformApplicationCommand";
import {
  CreatePlatformEndpointCommandInput,
  CreatePlatformEndpointCommandOutput,
} from "./commands/CreatePlatformEndpointCommand";
import {
  CreateSMSSandboxPhoneNumberCommandInput,
  CreateSMSSandboxPhoneNumberCommandOutput,
} from "./commands/CreateSMSSandboxPhoneNumberCommand";
import {
  CreateTopicCommandInput,
  CreateTopicCommandOutput,
} from "./commands/CreateTopicCommand";
import {
  DeleteEndpointCommandInput,
  DeleteEndpointCommandOutput,
} from "./commands/DeleteEndpointCommand";
import {
  DeletePlatformApplicationCommandInput,
  DeletePlatformApplicationCommandOutput,
} from "./commands/DeletePlatformApplicationCommand";
import {
  DeleteSMSSandboxPhoneNumberCommandInput,
  DeleteSMSSandboxPhoneNumberCommandOutput,
} from "./commands/DeleteSMSSandboxPhoneNumberCommand";
import {
  DeleteTopicCommandInput,
  DeleteTopicCommandOutput,
} from "./commands/DeleteTopicCommand";
import {
  GetDataProtectionPolicyCommandInput,
  GetDataProtectionPolicyCommandOutput,
} from "./commands/GetDataProtectionPolicyCommand";
import {
  GetEndpointAttributesCommandInput,
  GetEndpointAttributesCommandOutput,
} from "./commands/GetEndpointAttributesCommand";
import {
  GetPlatformApplicationAttributesCommandInput,
  GetPlatformApplicationAttributesCommandOutput,
} from "./commands/GetPlatformApplicationAttributesCommand";
import {
  GetSMSAttributesCommandInput,
  GetSMSAttributesCommandOutput,
} from "./commands/GetSMSAttributesCommand";
import {
  GetSMSSandboxAccountStatusCommandInput,
  GetSMSSandboxAccountStatusCommandOutput,
} from "./commands/GetSMSSandboxAccountStatusCommand";
import {
  GetSubscriptionAttributesCommandInput,
  GetSubscriptionAttributesCommandOutput,
} from "./commands/GetSubscriptionAttributesCommand";
import {
  GetTopicAttributesCommandInput,
  GetTopicAttributesCommandOutput,
} from "./commands/GetTopicAttributesCommand";
import {
  ListEndpointsByPlatformApplicationCommandInput,
  ListEndpointsByPlatformApplicationCommandOutput,
} from "./commands/ListEndpointsByPlatformApplicationCommand";
import {
  ListOriginationNumbersCommandInput,
  ListOriginationNumbersCommandOutput,
} from "./commands/ListOriginationNumbersCommand";
import {
  ListPhoneNumbersOptedOutCommandInput,
  ListPhoneNumbersOptedOutCommandOutput,
} from "./commands/ListPhoneNumbersOptedOutCommand";
import {
  ListPlatformApplicationsCommandInput,
  ListPlatformApplicationsCommandOutput,
} from "./commands/ListPlatformApplicationsCommand";
import {
  ListSMSSandboxPhoneNumbersCommandInput,
  ListSMSSandboxPhoneNumbersCommandOutput,
} from "./commands/ListSMSSandboxPhoneNumbersCommand";
import {
  ListSubscriptionsByTopicCommandInput,
  ListSubscriptionsByTopicCommandOutput,
} from "./commands/ListSubscriptionsByTopicCommand";
import {
  ListSubscriptionsCommandInput,
  ListSubscriptionsCommandOutput,
} from "./commands/ListSubscriptionsCommand";
import {
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import {
  ListTopicsCommandInput,
  ListTopicsCommandOutput,
} from "./commands/ListTopicsCommand";
import {
  OptInPhoneNumberCommandInput,
  OptInPhoneNumberCommandOutput,
} from "./commands/OptInPhoneNumberCommand";
import {
  PublishBatchCommandInput,
  PublishBatchCommandOutput,
} from "./commands/PublishBatchCommand";
import {
  PublishCommandInput,
  PublishCommandOutput,
} from "./commands/PublishCommand";
import {
  PutDataProtectionPolicyCommandInput,
  PutDataProtectionPolicyCommandOutput,
} from "./commands/PutDataProtectionPolicyCommand";
import {
  RemovePermissionCommandInput,
  RemovePermissionCommandOutput,
} from "./commands/RemovePermissionCommand";
import {
  SetEndpointAttributesCommandInput,
  SetEndpointAttributesCommandOutput,
} from "./commands/SetEndpointAttributesCommand";
import {
  SetPlatformApplicationAttributesCommandInput,
  SetPlatformApplicationAttributesCommandOutput,
} from "./commands/SetPlatformApplicationAttributesCommand";
import {
  SetSMSAttributesCommandInput,
  SetSMSAttributesCommandOutput,
} from "./commands/SetSMSAttributesCommand";
import {
  SetSubscriptionAttributesCommandInput,
  SetSubscriptionAttributesCommandOutput,
} from "./commands/SetSubscriptionAttributesCommand";
import {
  SetTopicAttributesCommandInput,
  SetTopicAttributesCommandOutput,
} from "./commands/SetTopicAttributesCommand";
import {
  SubscribeCommandInput,
  SubscribeCommandOutput,
} from "./commands/SubscribeCommand";
import {
  TagResourceCommandInput,
  TagResourceCommandOutput,
} from "./commands/TagResourceCommand";
import {
  UnsubscribeCommandInput,
  UnsubscribeCommandOutput,
} from "./commands/UnsubscribeCommand";
import {
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "./commands/UntagResourceCommand";
import {
  VerifySMSSandboxPhoneNumberCommandInput,
  VerifySMSSandboxPhoneNumberCommandOutput,
} from "./commands/VerifySMSSandboxPhoneNumberCommand";
import { SNSClient } from "./SNSClient";
export interface SNS {
  addPermission(
    args: AddPermissionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<AddPermissionCommandOutput>;
  addPermission(
    args: AddPermissionCommandInput,
    cb: (err: any, data?: AddPermissionCommandOutput) => void
  ): void;
  addPermission(
    args: AddPermissionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: AddPermissionCommandOutput) => void
  ): void;
  checkIfPhoneNumberIsOptedOut(
    args: CheckIfPhoneNumberIsOptedOutCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CheckIfPhoneNumberIsOptedOutCommandOutput>;
  checkIfPhoneNumberIsOptedOut(
    args: CheckIfPhoneNumberIsOptedOutCommandInput,
    cb: (err: any, data?: CheckIfPhoneNumberIsOptedOutCommandOutput) => void
  ): void;
  checkIfPhoneNumberIsOptedOut(
    args: CheckIfPhoneNumberIsOptedOutCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CheckIfPhoneNumberIsOptedOutCommandOutput) => void
  ): void;
  confirmSubscription(
    args: ConfirmSubscriptionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ConfirmSubscriptionCommandOutput>;
  confirmSubscription(
    args: ConfirmSubscriptionCommandInput,
    cb: (err: any, data?: ConfirmSubscriptionCommandOutput) => void
  ): void;
  confirmSubscription(
    args: ConfirmSubscriptionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ConfirmSubscriptionCommandOutput) => void
  ): void;
  createPlatformApplication(
    args: CreatePlatformApplicationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreatePlatformApplicationCommandOutput>;
  createPlatformApplication(
    args: CreatePlatformApplicationCommandInput,
    cb: (err: any, data?: CreatePlatformApplicationCommandOutput) => void
  ): void;
  createPlatformApplication(
    args: CreatePlatformApplicationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreatePlatformApplicationCommandOutput) => void
  ): void;
  createPlatformEndpoint(
    args: CreatePlatformEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreatePlatformEndpointCommandOutput>;
  createPlatformEndpoint(
    args: CreatePlatformEndpointCommandInput,
    cb: (err: any, data?: CreatePlatformEndpointCommandOutput) => void
  ): void;
  createPlatformEndpoint(
    args: CreatePlatformEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreatePlatformEndpointCommandOutput) => void
  ): void;
  createSMSSandboxPhoneNumber(
    args: CreateSMSSandboxPhoneNumberCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateSMSSandboxPhoneNumberCommandOutput>;
  createSMSSandboxPhoneNumber(
    args: CreateSMSSandboxPhoneNumberCommandInput,
    cb: (err: any, data?: CreateSMSSandboxPhoneNumberCommandOutput) => void
  ): void;
  createSMSSandboxPhoneNumber(
    args: CreateSMSSandboxPhoneNumberCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateSMSSandboxPhoneNumberCommandOutput) => void
  ): void;
  createTopic(
    args: CreateTopicCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateTopicCommandOutput>;
  createTopic(
    args: CreateTopicCommandInput,
    cb: (err: any, data?: CreateTopicCommandOutput) => void
  ): void;
  createTopic(
    args: CreateTopicCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateTopicCommandOutput) => void
  ): void;
  deleteEndpoint(
    args: DeleteEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEndpointCommandOutput>;
  deleteEndpoint(
    args: DeleteEndpointCommandInput,
    cb: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): void;
  deleteEndpoint(
    args: DeleteEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): void;
  deletePlatformApplication(
    args: DeletePlatformApplicationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeletePlatformApplicationCommandOutput>;
  deletePlatformApplication(
    args: DeletePlatformApplicationCommandInput,
    cb: (err: any, data?: DeletePlatformApplicationCommandOutput) => void
  ): void;
  deletePlatformApplication(
    args: DeletePlatformApplicationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeletePlatformApplicationCommandOutput) => void
  ): void;
  deleteSMSSandboxPhoneNumber(
    args: DeleteSMSSandboxPhoneNumberCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteSMSSandboxPhoneNumberCommandOutput>;
  deleteSMSSandboxPhoneNumber(
    args: DeleteSMSSandboxPhoneNumberCommandInput,
    cb: (err: any, data?: DeleteSMSSandboxPhoneNumberCommandOutput) => void
  ): void;
  deleteSMSSandboxPhoneNumber(
    args: DeleteSMSSandboxPhoneNumberCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteSMSSandboxPhoneNumberCommandOutput) => void
  ): void;
  deleteTopic(
    args: DeleteTopicCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteTopicCommandOutput>;
  deleteTopic(
    args: DeleteTopicCommandInput,
    cb: (err: any, data?: DeleteTopicCommandOutput) => void
  ): void;
  deleteTopic(
    args: DeleteTopicCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteTopicCommandOutput) => void
  ): void;
  getDataProtectionPolicy(
    args: GetDataProtectionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetDataProtectionPolicyCommandOutput>;
  getDataProtectionPolicy(
    args: GetDataProtectionPolicyCommandInput,
    cb: (err: any, data?: GetDataProtectionPolicyCommandOutput) => void
  ): void;
  getDataProtectionPolicy(
    args: GetDataProtectionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetDataProtectionPolicyCommandOutput) => void
  ): void;
  getEndpointAttributes(
    args: GetEndpointAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetEndpointAttributesCommandOutput>;
  getEndpointAttributes(
    args: GetEndpointAttributesCommandInput,
    cb: (err: any, data?: GetEndpointAttributesCommandOutput) => void
  ): void;
  getEndpointAttributes(
    args: GetEndpointAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetEndpointAttributesCommandOutput) => void
  ): void;
  getPlatformApplicationAttributes(
    args: GetPlatformApplicationAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetPlatformApplicationAttributesCommandOutput>;
  getPlatformApplicationAttributes(
    args: GetPlatformApplicationAttributesCommandInput,
    cb: (err: any, data?: GetPlatformApplicationAttributesCommandOutput) => void
  ): void;
  getPlatformApplicationAttributes(
    args: GetPlatformApplicationAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetPlatformApplicationAttributesCommandOutput) => void
  ): void;
  getSMSAttributes(): Promise<GetSMSAttributesCommandOutput>;
  getSMSAttributes(
    args: GetSMSAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSMSAttributesCommandOutput>;
  getSMSAttributes(
    args: GetSMSAttributesCommandInput,
    cb: (err: any, data?: GetSMSAttributesCommandOutput) => void
  ): void;
  getSMSAttributes(
    args: GetSMSAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSMSAttributesCommandOutput) => void
  ): void;
  getSMSSandboxAccountStatus(): Promise<GetSMSSandboxAccountStatusCommandOutput>;
  getSMSSandboxAccountStatus(
    args: GetSMSSandboxAccountStatusCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSMSSandboxAccountStatusCommandOutput>;
  getSMSSandboxAccountStatus(
    args: GetSMSSandboxAccountStatusCommandInput,
    cb: (err: any, data?: GetSMSSandboxAccountStatusCommandOutput) => void
  ): void;
  getSMSSandboxAccountStatus(
    args: GetSMSSandboxAccountStatusCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSMSSandboxAccountStatusCommandOutput) => void
  ): void;
  getSubscriptionAttributes(
    args: GetSubscriptionAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSubscriptionAttributesCommandOutput>;
  getSubscriptionAttributes(
    args: GetSubscriptionAttributesCommandInput,
    cb: (err: any, data?: GetSubscriptionAttributesCommandOutput) => void
  ): void;
  getSubscriptionAttributes(
    args: GetSubscriptionAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSubscriptionAttributesCommandOutput) => void
  ): void;
  getTopicAttributes(
    args: GetTopicAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetTopicAttributesCommandOutput>;
  getTopicAttributes(
    args: GetTopicAttributesCommandInput,
    cb: (err: any, data?: GetTopicAttributesCommandOutput) => void
  ): void;
  getTopicAttributes(
    args: GetTopicAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetTopicAttributesCommandOutput) => void
  ): void;
  listEndpointsByPlatformApplication(
    args: ListEndpointsByPlatformApplicationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListEndpointsByPlatformApplicationCommandOutput>;
  listEndpointsByPlatformApplication(
    args: ListEndpointsByPlatformApplicationCommandInput,
    cb: (
      err: any,
      data?: ListEndpointsByPlatformApplicationCommandOutput
    ) => void
  ): void;
  listEndpointsByPlatformApplication(
    args: ListEndpointsByPlatformApplicationCommandInput,
    options: __HttpHandlerOptions,
    cb: (
      err: any,
      data?: ListEndpointsByPlatformApplicationCommandOutput
    ) => void
  ): void;
  listOriginationNumbers(): Promise<ListOriginationNumbersCommandOutput>;
  listOriginationNumbers(
    args: ListOriginationNumbersCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListOriginationNumbersCommandOutput>;
  listOriginationNumbers(
    args: ListOriginationNumbersCommandInput,
    cb: (err: any, data?: ListOriginationNumbersCommandOutput) => void
  ): void;
  listOriginationNumbers(
    args: ListOriginationNumbersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListOriginationNumbersCommandOutput) => void
  ): void;
  listPhoneNumbersOptedOut(): Promise<ListPhoneNumbersOptedOutCommandOutput>;
  listPhoneNumbersOptedOut(
    args: ListPhoneNumbersOptedOutCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListPhoneNumbersOptedOutCommandOutput>;
  listPhoneNumbersOptedOut(
    args: ListPhoneNumbersOptedOutCommandInput,
    cb: (err: any, data?: ListPhoneNumbersOptedOutCommandOutput) => void
  ): void;
  listPhoneNumbersOptedOut(
    args: ListPhoneNumbersOptedOutCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListPhoneNumbersOptedOutCommandOutput) => void
  ): void;
  listPlatformApplications(): Promise<ListPlatformApplicationsCommandOutput>;
  listPlatformApplications(
    args: ListPlatformApplicationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListPlatformApplicationsCommandOutput>;
  listPlatformApplications(
    args: ListPlatformApplicationsCommandInput,
    cb: (err: any, data?: ListPlatformApplicationsCommandOutput) => void
  ): void;
  listPlatformApplications(
    args: ListPlatformApplicationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListPlatformApplicationsCommandOutput) => void
  ): void;
  listSMSSandboxPhoneNumbers(): Promise<ListSMSSandboxPhoneNumbersCommandOutput>;
  listSMSSandboxPhoneNumbers(
    args: ListSMSSandboxPhoneNumbersCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListSMSSandboxPhoneNumbersCommandOutput>;
  listSMSSandboxPhoneNumbers(
    args: ListSMSSandboxPhoneNumbersCommandInput,
    cb: (err: any, data?: ListSMSSandboxPhoneNumbersCommandOutput) => void
  ): void;
  listSMSSandboxPhoneNumbers(
    args: ListSMSSandboxPhoneNumbersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListSMSSandboxPhoneNumbersCommandOutput) => void
  ): void;
  listSubscriptions(): Promise<ListSubscriptionsCommandOutput>;
  listSubscriptions(
    args: ListSubscriptionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListSubscriptionsCommandOutput>;
  listSubscriptions(
    args: ListSubscriptionsCommandInput,
    cb: (err: any, data?: ListSubscriptionsCommandOutput) => void
  ): void;
  listSubscriptions(
    args: ListSubscriptionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListSubscriptionsCommandOutput) => void
  ): void;
  listSubscriptionsByTopic(
    args: ListSubscriptionsByTopicCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListSubscriptionsByTopicCommandOutput>;
  listSubscriptionsByTopic(
    args: ListSubscriptionsByTopicCommandInput,
    cb: (err: any, data?: ListSubscriptionsByTopicCommandOutput) => void
  ): void;
  listSubscriptionsByTopic(
    args: ListSubscriptionsByTopicCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListSubscriptionsByTopicCommandOutput) => void
  ): void;
  listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsForResourceCommandOutput>;
  listTagsForResource(
    args: ListTagsForResourceCommandInput,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  listTopics(): Promise<ListTopicsCommandOutput>;
  listTopics(
    args: ListTopicsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTopicsCommandOutput>;
  listTopics(
    args: ListTopicsCommandInput,
    cb: (err: any, data?: ListTopicsCommandOutput) => void
  ): void;
  listTopics(
    args: ListTopicsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTopicsCommandOutput) => void
  ): void;
  optInPhoneNumber(
    args: OptInPhoneNumberCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<OptInPhoneNumberCommandOutput>;
  optInPhoneNumber(
    args: OptInPhoneNumberCommandInput,
    cb: (err: any, data?: OptInPhoneNumberCommandOutput) => void
  ): void;
  optInPhoneNumber(
    args: OptInPhoneNumberCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: OptInPhoneNumberCommandOutput) => void
  ): void;
  publish(
    args: PublishCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PublishCommandOutput>;
  publish(
    args: PublishCommandInput,
    cb: (err: any, data?: PublishCommandOutput) => void
  ): void;
  publish(
    args: PublishCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PublishCommandOutput) => void
  ): void;
  publishBatch(
    args: PublishBatchCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PublishBatchCommandOutput>;
  publishBatch(
    args: PublishBatchCommandInput,
    cb: (err: any, data?: PublishBatchCommandOutput) => void
  ): void;
  publishBatch(
    args: PublishBatchCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PublishBatchCommandOutput) => void
  ): void;
  putDataProtectionPolicy(
    args: PutDataProtectionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutDataProtectionPolicyCommandOutput>;
  putDataProtectionPolicy(
    args: PutDataProtectionPolicyCommandInput,
    cb: (err: any, data?: PutDataProtectionPolicyCommandOutput) => void
  ): void;
  putDataProtectionPolicy(
    args: PutDataProtectionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutDataProtectionPolicyCommandOutput) => void
  ): void;
  removePermission(
    args: RemovePermissionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<RemovePermissionCommandOutput>;
  removePermission(
    args: RemovePermissionCommandInput,
    cb: (err: any, data?: RemovePermissionCommandOutput) => void
  ): void;
  removePermission(
    args: RemovePermissionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RemovePermissionCommandOutput) => void
  ): void;
  setEndpointAttributes(
    args: SetEndpointAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SetEndpointAttributesCommandOutput>;
  setEndpointAttributes(
    args: SetEndpointAttributesCommandInput,
    cb: (err: any, data?: SetEndpointAttributesCommandOutput) => void
  ): void;
  setEndpointAttributes(
    args: SetEndpointAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetEndpointAttributesCommandOutput) => void
  ): void;
  setPlatformApplicationAttributes(
    args: SetPlatformApplicationAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SetPlatformApplicationAttributesCommandOutput>;
  setPlatformApplicationAttributes(
    args: SetPlatformApplicationAttributesCommandInput,
    cb: (err: any, data?: SetPlatformApplicationAttributesCommandOutput) => void
  ): void;
  setPlatformApplicationAttributes(
    args: SetPlatformApplicationAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetPlatformApplicationAttributesCommandOutput) => void
  ): void;
  setSMSAttributes(
    args: SetSMSAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SetSMSAttributesCommandOutput>;
  setSMSAttributes(
    args: SetSMSAttributesCommandInput,
    cb: (err: any, data?: SetSMSAttributesCommandOutput) => void
  ): void;
  setSMSAttributes(
    args: SetSMSAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetSMSAttributesCommandOutput) => void
  ): void;
  setSubscriptionAttributes(
    args: SetSubscriptionAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SetSubscriptionAttributesCommandOutput>;
  setSubscriptionAttributes(
    args: SetSubscriptionAttributesCommandInput,
    cb: (err: any, data?: SetSubscriptionAttributesCommandOutput) => void
  ): void;
  setSubscriptionAttributes(
    args: SetSubscriptionAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetSubscriptionAttributesCommandOutput) => void
  ): void;
  setTopicAttributes(
    args: SetTopicAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SetTopicAttributesCommandOutput>;
  setTopicAttributes(
    args: SetTopicAttributesCommandInput,
    cb: (err: any, data?: SetTopicAttributesCommandOutput) => void
  ): void;
  setTopicAttributes(
    args: SetTopicAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetTopicAttributesCommandOutput) => void
  ): void;
  subscribe(
    args: SubscribeCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SubscribeCommandOutput>;
  subscribe(
    args: SubscribeCommandInput,
    cb: (err: any, data?: SubscribeCommandOutput) => void
  ): void;
  subscribe(
    args: SubscribeCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SubscribeCommandOutput) => void
  ): void;
  tagResource(
    args: TagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<TagResourceCommandOutput>;
  tagResource(
    args: TagResourceCommandInput,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  tagResource(
    args: TagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  unsubscribe(
    args: UnsubscribeCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UnsubscribeCommandOutput>;
  unsubscribe(
    args: UnsubscribeCommandInput,
    cb: (err: any, data?: UnsubscribeCommandOutput) => void
  ): void;
  unsubscribe(
    args: UnsubscribeCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UnsubscribeCommandOutput) => void
  ): void;
  untagResource(
    args: UntagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagResourceCommandOutput>;
  untagResource(
    args: UntagResourceCommandInput,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  untagResource(
    args: UntagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  verifySMSSandboxPhoneNumber(
    args: VerifySMSSandboxPhoneNumberCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<VerifySMSSandboxPhoneNumberCommandOutput>;
  verifySMSSandboxPhoneNumber(
    args: VerifySMSSandboxPhoneNumberCommandInput,
    cb: (err: any, data?: VerifySMSSandboxPhoneNumberCommandOutput) => void
  ): void;
  verifySMSSandboxPhoneNumber(
    args: VerifySMSSandboxPhoneNumberCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: VerifySMSSandboxPhoneNumberCommandOutput) => void
  ): void;
}
export declare class SNS extends SNSClient implements SNS {}
