import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useAppSelector } from "../hook";
import { getBrandsAsync, getTypesAsync } from "../slice/productSlice";
import Filters from "./Filters";
import { Brand } from "../utils/types";

type BrandsFiltersProps = {
    onBrandsChange: (brands: Brand[]) => void;
};

export const BrandsFilters = ({ onBrandsChange }: BrandsFiltersProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const brands = useAppSelector((state) => state.product.brands);

    useEffect(() => {
        dispatch(getBrandsAsync());
    }, [dispatch]);

    return (
        <Filters
            originalItems={brands}
            name="Brand Filters"
            onSelectionChange={onBrandsChange}
        />
    );
};

type TypesFiltersProps = {
    onTypesChange: (types: Brand[]) => void;
};

export const TypesFilters = ({ onTypesChange }: TypesFiltersProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const types = useAppSelector((state) => state.product.types);

    useEffect(() => {
        dispatch(getTypesAsync());
    }, [dispatch]);

    return (
        <Filters
            originalItems={types}
            name="Type Filters"
            onSelectionChange={onTypesChange}
        />
    );
};
