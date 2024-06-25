import { type PackageSnapshots } from '@pnpm/lockfile-file';
import { type Registries } from '@pnpm/types';
export interface GetPkgInfoOpts {
    readonly alias: string;
    readonly ref: string;
    readonly currentPackages: PackageSnapshots;
    readonly peers?: Set<string>;
    readonly registries: Registries;
    readonly skipped: Set<string>;
    readonly wantedPackages: PackageSnapshots;
    readonly virtualStoreDir?: string;
    /**
     * The base dir if the `ref` argument is a `"link:"` relative path.
     */
    readonly linkedPathBaseDir: string;
    /**
     * If the `ref` argument is a `"link:"` relative path, the ref is reused for
     * the version field. (Since the true semver may not be known.)
     *
     * Optionally rewrite this relative path to a base dir before writing it to
     * version.
     */
    readonly rewriteLinkVersionDir?: string;
}
export declare function getPkgInfo(opts: GetPkgInfoOpts): PackageInfo;
interface PackageInfo {
    alias: string;
    isMissing: boolean;
    isPeer: boolean;
    isSkipped: boolean;
    name: string;
    path: string;
    version: string;
    resolved?: string;
    optional?: true;
    dev?: boolean;
}
export {};
