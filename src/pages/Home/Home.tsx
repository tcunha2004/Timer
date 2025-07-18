import { BiPlay } from "react-icons/bi";
import {
  CountDownContainer,
  DurationInput,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

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
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }
  }, [activeCycle]);

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

    reset();
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
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })} // registrando os inputs pro useForm controlar
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

        <StartCountDownButton
          disabled={!taskWatcher || !minutesWatcher}
          type="submit"
        >
          <BiPlay size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}

export default Home;
