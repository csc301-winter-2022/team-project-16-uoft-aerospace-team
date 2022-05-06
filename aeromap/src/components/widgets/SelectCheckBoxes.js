import Select from 'react-select';

import { selectContainerStyle } from '../../styles/widgets/SelectCheckBoxes';

const SelectCheckBoxes = ({options, setOptions}) => {

    return(
        <div style={selectContainerStyle}>
            <Select
                options={options}
                placeholder='Select Categories'
                isMulti
                isSearchable={false}
                isClearable={false}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                menuPlacement='top'
                controlShouldRenderValue={false}
                onChange={selected => setOptions(selected.map(option => option.value))}
                />
        </div>
    )
}

export default SelectCheckBoxes;