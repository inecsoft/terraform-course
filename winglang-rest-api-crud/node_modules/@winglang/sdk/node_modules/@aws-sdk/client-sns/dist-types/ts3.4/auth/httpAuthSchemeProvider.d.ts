import {
  AwsSdkSigV4AuthInputConfig,
  AwsSdkSigV4AuthResolvedConfig,
  AwsSdkSigV4PreviouslyResolved,
} from "@aws-sdk/core";
import {
  HandlerExecutionContext,
  HttpAuthScheme,
  HttpAuthSchemeParameters,
  HttpAuthSchemeParametersProvider,
  HttpAuthSchemeProvider,
} from "@smithy/types";
import { SNSClientResolvedConfig } from "../SNSClient";
export interface SNSHttpAuthSchemeParameters extends HttpAuthSchemeParameters {
  region?: string;
}
export interface SNSHttpAuthSchemeParametersProvider
  extends HttpAuthSchemeParametersProvider<
    SNSClientResolvedConfig,
    HandlerExecutionContext,
    SNSHttpAuthSchemeParameters,
    object
  > {}
export declare const defaultSNSHttpAuthSchemeParametersProvider: (
  config: SNSClientResolvedConfig,
  context: HandlerExecutionContext,
  input: object
) => Promise<SNSHttpAuthSchemeParameters>;
export interface SNSHttpAuthSchemeProvider
  extends HttpAuthSchemeProvider<SNSHttpAuthSchemeParameters> {}
export declare const defaultSNSHttpAuthSchemeProvider: SNSHttpAuthSchemeProvider;
export interface HttpAuthSchemeInputConfig extends AwsSdkSigV4AuthInputConfig {
  httpAuthSchemes?: HttpAuthScheme[];
  httpAuthSchemeProvider?: SNSHttpAuthSchemeProvider;
}
export interface HttpAuthSchemeResolvedConfig
  extends AwsSdkSigV4AuthResolvedConfig {
  readonly httpAuthSchemes: HttpAuthScheme[];
  readonly httpAuthSchemeProvider: SNSHttpAuthSchemeProvider;
}
export declare const resolveHttpAuthSchemeConfig: <T>(
  config: T & HttpAuthSchemeInputConfig & AwsSdkSigV4PreviouslyResolved
) => T & HttpAuthSchemeResolvedConfig;
