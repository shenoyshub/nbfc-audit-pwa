export interface PermittedBranch {
    brID: number;
    branchName: string;
}

export interface AppUser {
    displayName: string;
    jobTitle: string;
    currentBranch: number;
    imageSrc?: any;
    passwordExpiryDays: number;
    currentBranchDisplayName: string;
    permittedBranches: PermittedBranch[];
    permissions: string[];
    executiveID: number;
}