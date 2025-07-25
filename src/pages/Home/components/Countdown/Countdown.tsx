import { CountDownContainer, Separator } from "./styles";

function Countdown() {
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span> {/* primeira letra */}
      <span>{minutes[1]}</span> {/* segunda letra */}
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}

export default Countdown;
