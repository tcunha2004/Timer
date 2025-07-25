import { BiPlay } from "react-icons/bi";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { createContext, useEffect, useState } from "react";
import { TbHandStop } from "react-icons/tb";
import CycleForm from "./components/CycleForm/CycleForm";
import Countdown from "./components/Countdown/Countdown";

interface FormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date; // opcional
  finishedDate?: Date; // opcional
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>
  amountSecondsPassed: number
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
}

export const CyclesContext = createContext({} as CyclesContextType)

function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]); // o useState armazenará uma lista de ciclos
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); // (começa com null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<FormData>(); // useForm: controlador do formulario
  const { watch, handleSubmit, reset } = newCycleForm
  const taskWatcher = watch("task"); // useForm esta observando os inputs registrados
  const minutesWatcher = watch("minutesAmount"); // useForm esta observando os inputs registrados

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  function handleFormSubmit(data: FormData) {
    // crio um novo ciclo (seguindo a interface de como deve ser um ciclo)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevState) => [...prevState, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0); // volta pra 0 quando criar um novo ciclo @D058

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        // se o ciclo estava ativo e for interrompido, retornamos com o atributo interruptedDate
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, setCycles, amountSecondsPassed, setAmountSecondsPassed }}>
          <FormProvider {...newCycleForm}>
            <CycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <TbHandStop size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton
            disabled={!taskWatcher || !minutesWatcher}
            type="submit"
          >
            <BiPlay size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}

export default Home;
