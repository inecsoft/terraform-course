import { type DependenciesField, type Registries } from '@pnpm/types';
import { type PackageNode } from './PackageNode';
import { type SearchFunction } from './types';
export interface DependenciesHierarchy {
    dependencies?: PackageNode[];
    devDependencies?: PackageNode[];
    optionalDependencies?: PackageNode[];
    unsavedDependencies?: PackageNode[];
}
export declare function buildDependenciesHierarchy(projectPaths: string[] | undefined, maybeOpts: {
    depth: number;
    include?: {
        [dependenciesField in DependenciesField]: boolean;
    };
    registries?: Registries;
    onlyProjects?: boolean;
    search?: SearchFunction;
    lockfileDir: string;
    modulesDir?: string;
}): Promise<{
    [projectDir: string]: DependenciesHierarchy;
}>;
