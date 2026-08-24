import { 
  Icon,
  RingOuter, 
  RingInner, 
  LoaderWrapper, 
  SpinnerContainer
} from "@/styles/loader.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

// Spinner de carga adaptable
export default function Loader({ fullScreen = true }) {
  return (
    <LoaderWrapper fullScreen={fullScreen}>
      <SpinnerContainer>
        <RingOuter />
        <RingInner />        
        <Icon>
          <FontAwesomeIcon icon={faCalendarDays} />
        </Icon>
      </SpinnerContainer>
    </LoaderWrapper>
  );
}