import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import {
  AddPermissionCommandInput,
  AddPermissionCommandOutput,
} from "../commands/AddPermissionCommand";
import {
  CheckIfPhoneNumberIsOptedOutCommandInput,
  CheckIfPhoneNumberIsOptedOutCommandOutput,
} from "../commands/CheckIfPhoneNumberIsOptedOutCommand";
import {
  ConfirmSubscriptionCommandInput,
  ConfirmSubscriptionCommandOutput,
} from "../commands/ConfirmSubscriptionCommand";
import {
  CreatePlatformApplicationCommandInput,
  CreatePlatformApplicationCommandOutput,
} from "../commands/CreatePlatformApplicationCommand";
import {
  CreatePlatformEndpointCommandInput,
  CreatePlatformEndpointCommandOutput,
} from "../commands/CreatePlatformEndpointCommand";
import {
  CreateSMSSandboxPhoneNumberCommandInput,
  CreateSMSSandboxPhoneNumberCommandOutput,
} from "../commands/CreateSMSSandboxPhoneNumberCommand";
import {
  CreateTopicCommandInput,
  CreateTopicCommandOutput,
} from "../commands/CreateTopicCommand";
import {
  DeleteEndpointCommandInput,
  DeleteEndpointCommandOutput,
} from "../commands/DeleteEndpointCommand";
import {
  DeletePlatformApplicationCommandInput,
  DeletePlatformApplicationCommandOutput,
} from "../commands/DeletePlatformApplicationCommand";
import {
  DeleteSMSSandboxPhoneNumberCommandInput,
  DeleteSMSSandboxPhoneNumberCommandOutput,
} from "../commands/DeleteSMSSandboxPhoneNumberCommand";
import {
  DeleteTopicCommandInput,
  DeleteTopicCommandOutput,
} from "../commands/DeleteTopicCommand";
import {
  GetDataProtectionPolicyCommandInput,
  GetDataProtectionPolicyCommandOutput,
} from "../commands/GetDataProtectionPolicyCommand";
import {
  GetEndpointAttributesCommandInput,
  GetEndpointAttributesCommandOutput,
} from "../commands/GetEndpointAttributesCommand";
import {
  GetPlatformApplicationAttributesCommandInput,
  GetPlatformApplicationAttributesCommandOutput,
} from "../commands/GetPlatformApplicationAttributesCommand";
import {
  GetSMSAttributesCommandInput,
  GetSMSAttributesCommandOutput,
} from "../commands/GetSMSAttributesCommand";
import {
  GetSMSSandboxAccountStatusCommandInput,
  GetSMSSandboxAccountStatusCommandOutput,
} from "../commands/GetSMSSandboxAccountStatusCommand";
import {
  GetSubscriptionAttributesCommandInput,
  GetSubscriptionAttributesCommandOutput,
} from "../commands/GetSubscriptionAttributesCommand";
import {
  GetTopicAttributesCommandInput,
  GetTopicAttributesCommandOutput,
} from "../commands/GetTopicAttributesCommand";
import {
  ListEndpointsByPlatformApplicationCommandInput,
  ListEndpointsByPlatformApplicationCommandOutput,
} from "../commands/ListEndpointsByPlatformApplicationCommand";
import {
  ListOriginationNumbersCommandInput,
  ListOriginationNumbersCommandOutput,
} from "../commands/ListOriginationNumbersCommand";
import {
  ListPhoneNumbersOptedOutCommandInput,
  ListPhoneNumbersOptedOutCommandOutput,
} from "../commands/ListPhoneNumbersOptedOutCommand";
import {
  ListPlatformApplicationsCommandInput,
  ListPlatformApplicationsCommandOutput,
} from "../commands/ListPlatformApplicationsCommand";
import {
  ListSMSSandboxPhoneNumbersCommandInput,
  ListSMSSandboxPhoneNumbersCommandOutput,
} from "../commands/ListSMSSandboxPhoneNumbersCommand";
import {
  ListSubscriptionsByTopicCommandInput,
  ListSubscriptionsByTopicCommandOutput,
} from "../commands/ListSubscriptionsByTopicCommand";
import {
  ListSubscriptionsCommandInput,
  ListSubscriptionsCommandOutput,
} from "../commands/ListSubscriptionsCommand";
import {
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "../commands/ListTagsForResourceCommand";
import {
  ListTopicsCommandInput,
  ListTopicsCommandOutput,
} from "../commands/ListTopicsCommand";
import {
  OptInPhoneNumberCommandInput,
  OptInPhoneNumberCommandOutput,
} from "../commands/OptInPhoneNumberCommand";
import {
  PublishBatchCommandInput,
  PublishBatchCommandOutput,
} from "../commands/PublishBatchCommand";
import {
  PublishCommandInput,
  PublishCommandOutput,
} from "../commands/PublishCommand";
import {
  PutDataProtectionPolicyCommandInput,
  PutDataProtectionPolicyCommandOutput,
} from "../commands/PutDataProtectionPolicyCommand";
import {
  RemovePermissionCommandInput,
  RemovePermissionCommandOutput,
} from "../commands/RemovePermissionCommand";
import {
  SetEndpointAttributesCommandInput,
  SetEndpointAttributesCommandOutput,
} from "../commands/SetEndpointAttributesCommand";
import {
  SetPlatformApplicationAttributesCommandInput,
  SetPlatformApplicationAttributesCommandOutput,
} from "../commands/SetPlatformApplicationAttributesCommand";
import {
  SetSMSAttributesCommandInput,
  SetSMSAttributesCommandOutput,
} from "../commands/SetSMSAttributesCommand";
import {
  SetSubscriptionAttributesCommandInput,
  SetSubscriptionAttributesCommandOutput,
} from "../commands/SetSubscriptionAttributesCommand";
import {
  SetTopicAttributesCommandInput,
  SetTopicAttributesCommandOutput,
} from "../commands/SetTopicAttributesCommand";
import {
  SubscribeCommandInput,
  SubscribeCommandOutput,
} from "../commands/SubscribeCommand";
import {
  TagResourceCommandInput,
  TagResourceCommandOutput,
} from "../commands/TagResourceCommand";
import {
  UnsubscribeCommandInput,
  UnsubscribeCommandOutput,
} from "../commands/UnsubscribeCommand";
import {
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "../commands/UntagResourceCommand";
import {
  VerifySMSSandboxPhoneNumberCommandInput,
  VerifySMSSandboxPhoneNumberCommandOutput,
} from "../commands/VerifySMSSandboxPhoneNumberCommand";
export declare const se_AddPermissionCommand: (
  input: AddPermissionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CheckIfPhoneNumberIsOptedOutCommand: (
  input: CheckIfPhoneNumberIsOptedOutCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ConfirmSubscriptionCommand: (
  input: ConfirmSubscriptionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreatePlatformApplicationCommand: (
  input: CreatePlatformApplicationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreatePlatformEndpointCommand: (
  input: CreatePlatformEndpointCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateSMSSandboxPhoneNumberCommand: (
  input: CreateSMSSandboxPhoneNumberCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateTopicCommand: (
  input: CreateTopicCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteEndpointCommand: (
  input: DeleteEndpointCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeletePlatformApplicationCommand: (
  input: DeletePlatformApplicationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteSMSSandboxPhoneNumberCommand: (
  input: DeleteSMSSandboxPhoneNumberCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteTopicCommand: (
  input: DeleteTopicCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetDataProtectionPolicyCommand: (
  input: GetDataProtectionPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetEndpointAttributesCommand: (
  input: GetEndpointAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetPlatformApplicationAttributesCommand: (
  input: GetPlatformApplicationAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetSMSAttributesCommand: (
  input: GetSMSAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetSMSSandboxAccountStatusCommand: (
  input: GetSMSSandboxAccountStatusCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetSubscriptionAttributesCommand: (
  input: GetSubscriptionAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetTopicAttributesCommand: (
  input: GetTopicAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListEndpointsByPlatformApplicationCommand: (
  input: ListEndpointsByPlatformApplicationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListOriginationNumbersCommand: (
  input: ListOriginationNumbersCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListPhoneNumbersOptedOutCommand: (
  input: ListPhoneNumbersOptedOutCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListPlatformApplicationsCommand: (
  input: ListPlatformApplicationsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListSMSSandboxPhoneNumbersCommand: (
  input: ListSMSSandboxPhoneNumbersCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListSubscriptionsCommand: (
  input: ListSubscriptionsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListSubscriptionsByTopicCommand: (
  input: ListSubscriptionsByTopicCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListTagsForResourceCommand: (
  input: ListTagsForResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListTopicsCommand: (
  input: ListTopicsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_OptInPhoneNumberCommand: (
  input: OptInPhoneNumberCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PublishCommand: (
  input: PublishCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PublishBatchCommand: (
  input: PublishBatchCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PutDataProtectionPolicyCommand: (
  input: PutDataProtectionPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RemovePermissionCommand: (
  input: RemovePermissionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SetEndpointAttributesCommand: (
  input: SetEndpointAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SetPlatformApplicationAttributesCommand: (
  input: SetPlatformApplicationAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SetSMSAttributesCommand: (
  input: SetSMSAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SetSubscriptionAttributesCommand: (
  input: SetSubscriptionAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SetTopicAttributesCommand: (
  input: SetTopicAttributesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SubscribeCommand: (
  input: SubscribeCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_TagResourceCommand: (
  input: TagResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UnsubscribeCommand: (
  input: UnsubscribeCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UntagResourceCommand: (
  input: UntagResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_VerifySMSSandboxPhoneNumberCommand: (
  input: VerifySMSSandboxPhoneNumberCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const de_AddPermissionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<AddPermissionCommandOutput>;
export declare const de_CheckIfPhoneNumberIsOptedOutCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CheckIfPhoneNumberIsOptedOutCommandOutput>;
export declare const de_ConfirmSubscriptionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ConfirmSubscriptionCommandOutput>;
export declare const de_CreatePlatformApplicationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreatePlatformApplicationCommandOutput>;
export declare const de_CreatePlatformEndpointCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreatePlatformEndpointCommandOutput>;
export declare const de_CreateSMSSandboxPhoneNumberCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateSMSSandboxPhoneNumberCommandOutput>;
export declare const de_CreateTopicCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateTopicCommandOutput>;
export declare const de_DeleteEndpointCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteEndpointCommandOutput>;
export declare const de_DeletePlatformApplicationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeletePlatformApplicationCommandOutput>;
export declare const de_DeleteSMSSandboxPhoneNumberCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteSMSSandboxPhoneNumberCommandOutput>;
export declare const de_DeleteTopicCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteTopicCommandOutput>;
export declare const de_GetDataProtectionPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetDataProtectionPolicyCommandOutput>;
export declare const de_GetEndpointAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetEndpointAttributesCommandOutput>;
export declare const de_GetPlatformApplicationAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetPlatformApplicationAttributesCommandOutput>;
export declare const de_GetSMSAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetSMSAttributesCommandOutput>;
export declare const de_GetSMSSandboxAccountStatusCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetSMSSandboxAccountStatusCommandOutput>;
export declare const de_GetSubscriptionAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetSubscriptionAttributesCommandOutput>;
export declare const de_GetTopicAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetTopicAttributesCommandOutput>;
export declare const de_ListEndpointsByPlatformApplicationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListEndpointsByPlatformApplicationCommandOutput>;
export declare const de_ListOriginationNumbersCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListOriginationNumbersCommandOutput>;
export declare const de_ListPhoneNumbersOptedOutCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListPhoneNumbersOptedOutCommandOutput>;
export declare const de_ListPlatformApplicationsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListPlatformApplicationsCommandOutput>;
export declare const de_ListSMSSandboxPhoneNumbersCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListSMSSandboxPhoneNumbersCommandOutput>;
export declare const de_ListSubscriptionsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListSubscriptionsCommandOutput>;
export declare const de_ListSubscriptionsByTopicCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListSubscriptionsByTopicCommandOutput>;
export declare const de_ListTagsForResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListTagsForResourceCommandOutput>;
export declare const de_ListTopicsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListTopicsCommandOutput>;
export declare const de_OptInPhoneNumberCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<OptInPhoneNumberCommandOutput>;
export declare const de_PublishCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PublishCommandOutput>;
export declare const de_PublishBatchCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PublishBatchCommandOutput>;
export declare const de_PutDataProtectionPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PutDataProtectionPolicyCommandOutput>;
export declare const de_RemovePermissionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RemovePermissionCommandOutput>;
export declare const de_SetEndpointAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SetEndpointAttributesCommandOutput>;
export declare const de_SetPlatformApplicationAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SetPlatformApplicationAttributesCommandOutput>;
export declare const de_SetSMSAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SetSMSAttributesCommandOutput>;
export declare const de_SetSubscriptionAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SetSubscriptionAttributesCommandOutput>;
export declare const de_SetTopicAttributesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SetTopicAttributesCommandOutput>;
export declare const de_SubscribeCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SubscribeCommandOutput>;
export declare const de_TagResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<TagResourceCommandOutput>;
export declare const de_UnsubscribeCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UnsubscribeCommandOutput>;
export declare const de_UntagResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UntagResourceCommandOutput>;
export declare const de_VerifySMSSandboxPhoneNumberCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<VerifySMSSandboxPhoneNumberCommandOutput>;
