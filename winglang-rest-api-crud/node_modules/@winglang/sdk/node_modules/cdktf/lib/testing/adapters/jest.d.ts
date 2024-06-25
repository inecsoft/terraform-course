import { TerraformConstructor } from "../matchers";
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveResource(resourceConstructor: TerraformConstructor): R;
            toHaveResourceWithProperties(resourceConstructor: TerraformConstructor, properties: Record<string, any>): R;
            toHaveDataSource(dataSourceConstructor: TerraformConstructor): R;
            toHaveDataSourceWithProperties(dataSourceConstructor: TerraformConstructor, properties: Record<string, any>): R;
            toHaveProvider(providerConstructor: TerraformConstructor): R;
            toHaveProviderWithProperties(providerConstructor: TerraformConstructor, properties: Record<string, any>): R;
            toBeValidTerraform(): R;
            toPlanSuccessfully(): R;
        }
    }
}
export declare function setupJest(): void;
