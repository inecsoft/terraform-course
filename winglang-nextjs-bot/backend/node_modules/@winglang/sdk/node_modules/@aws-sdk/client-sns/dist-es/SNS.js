import { createAggregatedClient } from "@smithy/smithy-client";
import { AddPermissionCommand, } from "./commands/AddPermissionCommand";
import { CheckIfPhoneNumberIsOptedOutCommand, } from "./commands/CheckIfPhoneNumberIsOptedOutCommand";
import { ConfirmSubscriptionCommand, } from "./commands/ConfirmSubscriptionCommand";
import { CreatePlatformApplicationCommand, } from "./commands/CreatePlatformApplicationCommand";
import { CreatePlatformEndpointCommand, } from "./commands/CreatePlatformEndpointCommand";
import { CreateSMSSandboxPhoneNumberCommand, } from "./commands/CreateSMSSandboxPhoneNumberCommand";
import { CreateTopicCommand } from "./commands/CreateTopicCommand";
import { DeleteEndpointCommand, } from "./commands/DeleteEndpointCommand";
import { DeletePlatformApplicationCommand, } from "./commands/DeletePlatformApplicationCommand";
import { DeleteSMSSandboxPhoneNumberCommand, } from "./commands/DeleteSMSSandboxPhoneNumberCommand";
import { DeleteTopicCommand } from "./commands/DeleteTopicCommand";
import { GetDataProtectionPolicyCommand, } from "./commands/GetDataProtectionPolicyCommand";
import { GetEndpointAttributesCommand, } from "./commands/GetEndpointAttributesCommand";
import { GetPlatformApplicationAttributesCommand, } from "./commands/GetPlatformApplicationAttributesCommand";
import { GetSMSAttributesCommand, } from "./commands/GetSMSAttributesCommand";
import { GetSMSSandboxAccountStatusCommand, } from "./commands/GetSMSSandboxAccountStatusCommand";
import { GetSubscriptionAttributesCommand, } from "./commands/GetSubscriptionAttributesCommand";
import { GetTopicAttributesCommand, } from "./commands/GetTopicAttributesCommand";
import { ListEndpointsByPlatformApplicationCommand, } from "./commands/ListEndpointsByPlatformApplicationCommand";
import { ListOriginationNumbersCommand, } from "./commands/ListOriginationNumbersCommand";
import { ListPhoneNumbersOptedOutCommand, } from "./commands/ListPhoneNumbersOptedOutCommand";
import { ListPlatformApplicationsCommand, } from "./commands/ListPlatformApplicationsCommand";
import { ListSMSSandboxPhoneNumbersCommand, } from "./commands/ListSMSSandboxPhoneNumbersCommand";
import { ListSubscriptionsByTopicCommand, } from "./commands/ListSubscriptionsByTopicCommand";
import { ListSubscriptionsCommand, } from "./commands/ListSubscriptionsCommand";
import { ListTagsForResourceCommand, } from "./commands/ListTagsForResourceCommand";
import { ListTopicsCommand } from "./commands/ListTopicsCommand";
import { OptInPhoneNumberCommand, } from "./commands/OptInPhoneNumberCommand";
import { PublishBatchCommand, } from "./commands/PublishBatchCommand";
import { PublishCommand } from "./commands/PublishCommand";
import { PutDataProtectionPolicyCommand, } from "./commands/PutDataProtectionPolicyCommand";
import { RemovePermissionCommand, } from "./commands/RemovePermissionCommand";
import { SetEndpointAttributesCommand, } from "./commands/SetEndpointAttributesCommand";
import { SetPlatformApplicationAttributesCommand, } from "./commands/SetPlatformApplicationAttributesCommand";
import { SetSMSAttributesCommand, } from "./commands/SetSMSAttributesCommand";
import { SetSubscriptionAttributesCommand, } from "./commands/SetSubscriptionAttributesCommand";
import { SetTopicAttributesCommand, } from "./commands/SetTopicAttributesCommand";
import { SubscribeCommand } from "./commands/SubscribeCommand";
import { TagResourceCommand } from "./commands/TagResourceCommand";
import { UnsubscribeCommand } from "./commands/UnsubscribeCommand";
import { UntagResourceCommand, } from "./commands/UntagResourceCommand";
import { VerifySMSSandboxPhoneNumberCommand, } from "./commands/VerifySMSSandboxPhoneNumberCommand";
import { SNSClient } from "./SNSClient";
const commands = {
    AddPermissionCommand,
    CheckIfPhoneNumberIsOptedOutCommand,
    ConfirmSubscriptionCommand,
    CreatePlatformApplicationCommand,
    CreatePlatformEndpointCommand,
    CreateSMSSandboxPhoneNumberCommand,
    CreateTopicCommand,
    DeleteEndpointCommand,
    DeletePlatformApplicationCommand,
    DeleteSMSSandboxPhoneNumberCommand,
    DeleteTopicCommand,
    GetDataProtectionPolicyCommand,
    GetEndpointAttributesCommand,
    GetPlatformApplicationAttributesCommand,
    GetSMSAttributesCommand,
    GetSMSSandboxAccountStatusCommand,
    GetSubscriptionAttributesCommand,
    GetTopicAttributesCommand,
    ListEndpointsByPlatformApplicationCommand,
    ListOriginationNumbersCommand,
    ListPhoneNumbersOptedOutCommand,
    ListPlatformApplicationsCommand,
    ListSMSSandboxPhoneNumbersCommand,
    ListSubscriptionsCommand,
    ListSubscriptionsByTopicCommand,
    ListTagsForResourceCommand,
    ListTopicsCommand,
    OptInPhoneNumberCommand,
    PublishCommand,
    PublishBatchCommand,
    PutDataProtectionPolicyCommand,
    RemovePermissionCommand,
    SetEndpointAttributesCommand,
    SetPlatformApplicationAttributesCommand,
    SetSMSAttributesCommand,
    SetSubscriptionAttributesCommand,
    SetTopicAttributesCommand,
    SubscribeCommand,
    TagResourceCommand,
    UnsubscribeCommand,
    UntagResourceCommand,
    VerifySMSSandboxPhoneNumberCommand,
};
export class SNS extends SNSClient {
}
createAggregatedClient(commands, SNS);
