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
  const { register, watch } = useForm();

  const taskWatcher = watch("task");
  const minutesWatcher = watch("minutesAmount");

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para a sua tarefa"
            list="task-suggestions"
            {...register("task")}
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
            {...register("minutesAmount", { valueAsNumber: true })}
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
