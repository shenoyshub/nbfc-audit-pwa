export class CategoryMaster {
    id!: number
    code!: string;
    description!: string;
    order!: number;
    parentId!: number;    
    active!: boolean;
    selected!: boolean;
    constructor(data?: Partial<CategoryMaster>) {
        if (data) {
            this.load(data);
        }
    }
    load(data: Partial<CategoryMaster>): CategoryMaster{
        this.id = data.id ?? 0;
        this.code = data.code ?? '';
        this.description = data.description ?? '';
        this.order = data.order ?? 0;
        this.parentId = data.parentId ?? 0;
        this.active = data.active ?? false;
        this.selected = data.selected ?? false;
        return this;
    }
}
