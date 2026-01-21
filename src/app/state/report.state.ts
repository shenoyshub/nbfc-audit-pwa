export interface Header {
    header: string;
    dataMember: string;
    dataType: string;
    hasTotal: boolean;
}

export interface Report {
    title: string;
    data: any[];
    headers: Header[];
}
