import { titleStyle, dividerStyle } from "../../styles/widgets/Header"

const Header = ({text}) => (
    <div>
      <div style={titleStyle}>
        <strong>{text}</strong>
      </div>

      <hr style={dividerStyle} />
    </div>
)

export default Header