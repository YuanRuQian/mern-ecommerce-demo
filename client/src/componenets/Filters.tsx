import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Brand, Type } from "../utils/types";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

type MultipleSelectCheckmarksProps = {
    originalItems: Brand[] | Type[];
    onSelectionChange: (items: Brand[] | Type[]) => void;
    name: string;
};

const MultipleSelectCheckmarks = ({
    originalItems,
    onSelectionChange,
    name
}: MultipleSelectCheckmarksProps) => {
    const [items, setItems] = useState<Brand[] | Type[]>([]);

    const handleChange = (event: SelectChangeEvent<Brand[] | Type[]>) => {
        setItems(event.target.value as Brand[] | Type[]);
        onSelectionChange(event.target.value as Brand[] | Type[]);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                    {name}
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    placeholder={name}
                    value={items}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) =>
                        selected.map((x) => x.name).join(", ")
                    }
                    MenuProps={MenuProps}
                >
                    {originalItems.map((item) => (
                        <MenuItem key={item._id} value={item}>
                            <Checkbox
                                checked={
                                    !!items.find((x) => x._id === item._id)
                                }
                            />
                            <ListItemText primary={item.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MultipleSelectCheckmarks;
