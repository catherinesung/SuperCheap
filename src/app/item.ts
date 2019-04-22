export interface Item {
        barcode: string;
        name_tc: string;
        name_en: string;
        brand_tc: string;
        brand_en: string;
        type_tc: string;
        type_en: string;
        price_aeon: number;
        price_dch: number;
        price_marketplace: number;
        price_parknshop: number;
        price_wellcome: number;
        price_waston: number;
        remark_tc_aeon: string;
        remark_tc_dch: string;
        remark_tc_marketplace: string;
        remark_tc_parknshop: string;
        remark_tc_wellcome: string;
        remark_tc_waston: string;
        remark_en_aeon: string;
        remark_en_dch: string;
        remark_en_marketplace: string;
        remark_en_parknshop: string;
        remark_en_wellcome: string;
        remark_en_waston: string;
        [key: string]: any;
        bp: string;
}
