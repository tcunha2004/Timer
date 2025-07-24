import { BiPlay } from "react-icons/bi";
import {
  CountDownContainer,
  DurationInput,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { TbHandStop } from "react-icons/tb";

function Home() {
  const { register, watch, handleSubmit, reset } = useForm<FormData>(); // useForm: controlador do formulario

  const taskWatcher = watch("task"); // useForm esta observando os inputs registrados
  const minutesWatcher = watch("minutesAmount"); // useForm esta observando os inputs registrados

  const [cycles, setCycles] = useState<Cycle[]>([]); // o useState armazenará uma lista de ciclos
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); // (começa com null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; // opcional
    finishedDate?: Date; // opcional
  }

  interface FormData {
    task: string;
    minutesAmount: number;
  }

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentTotalSeconds = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0;

  const minutesNum = Math.floor(currentTotalSeconds / 60); // arredonda pra baixo (pega os minutos cheios)
  const secondsNum = currentTotalSeconds % 60; // pega o resto (segundos)

  const minutes = String(minutesNum).padStart(2, "0"); // obriga a string a ter 2 caracteres, e se não tiver, adiciona 0 no 'start'
  const seconds = String(secondsNum).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id == activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );

          setAmountSecondsPassed(totalSeconds); // volta o contador pra 0 pois já se passaram todos os segundos
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval); // quando chamar o useEffect de novo, limpa o intervalo e começa um novo
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

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

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

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
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para a sua tarefa"
            list="task-suggestions"
            {...register("task")} // registrando os inputs pro useForm controlar
            disabled={!!activeCycle} // !! -> boolean (tem algum valor?)
          />

          <datalist id="task-suggestions">
            <option value="Study" />
            <option value="Clean the kitchen" />
          </datalist>

          <label htmlFor="durationMinutes">durante</label>
          <DurationInput
            type="number"
            id="durationMinutes"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })} // registrando os inputs pro useForm controlar
            disabled={!!activeCycle} // !! -> boolean (tem algum valor?)
          />

          <span>minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span> {/* primeira letra */}
          <span>{minutes[1]}</span> {/* segunda letra */}
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

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
