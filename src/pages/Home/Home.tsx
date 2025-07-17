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
import { useState } from "react";

function Home() {
  const { register, watch, handleSubmit, reset } = useForm<FormData>(); // useForm: controlador do formulario

  const taskWatcher = watch("task"); // useForm esta observando os inputs registrados
  const minutesWatcher = watch("minutesAmount"); // useForm esta observando os inputs registrados
  // ---------------------------------------------------------------------------------------------------------------
  interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
  }

  const [cycles, setCycles] = useState<Cycle[]>([]); // o useState armazenará uma lista de ciclos
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); // id do ciclo ativo no momento (começa com null)
  // ---------------------------------------------------------------------------------------------------------------
  interface FormData {
    task: string;
    minutesAmount: number;
  }

  function handleFormSubmit(data: FormData) {
    // crio um novo ciclo (seguindo a interface de como deve ser um ciclo)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((prevState) => [...prevState, newCycle]); // concateno o que tinha antes com o que vou add
    setActiveCycleId(newCycle.id);

    reset(); // reseta o formulário quando der o submit
  }

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  console.log(activeCycle);

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
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
