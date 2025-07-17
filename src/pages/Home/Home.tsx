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

function Home() {
  const { register, watch, handleSubmit, reset } = useForm<FormData>(); // useForm: controlador do formulario

  const taskWatcher = watch("task"); // useForm esta observando os inputs registrados
  const minutesWatcher = watch("minutesAmount");

  interface FormData {
    task: string;
    minutesAmount: number;
  }

  function handleFormSubmit(data: FormData) {
    reset(); // reseta o formulário quando der o submit
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
