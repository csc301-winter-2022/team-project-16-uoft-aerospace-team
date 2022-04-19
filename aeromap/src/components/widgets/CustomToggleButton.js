import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: 'purple'
  }
});

const CustomToggleButton = ({page, setPage}) => {

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={page}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton style={{color: 'white', borderColor: 'white'}} value="flight">Flights</ToggleButton>
      <ToggleButton style={{color: 'white', borderColor: 'white'}} value="site">Sites</ToggleButton>
      <ToggleButton style={{color: 'white', borderColor: 'white'}} value="drone">Drones</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default CustomToggleButton