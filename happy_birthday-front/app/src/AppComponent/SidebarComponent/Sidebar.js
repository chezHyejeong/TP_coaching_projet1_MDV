import QuoteComponent from "../QuoteComponent/Quote";
import AnimationScreenComponent from "./AnimationScreenComponent/AnimationScreen";
import ProgressBarComponent from "./ProgressBarComponent/ProgressBar";

function SidebarComponent(props) {
  return (
    <div className="bg-white py-6 pt-24 px-12 w-1/2 flex flex-col place-content-evenly border-l-2 border-black">
      <QuoteComponent
        currentColor={props.currentColor}
        width="w-full"
        currentQuote={props.currentQuote}
      />
      <AnimationScreenComponent
        currentColor={props.currentColor}
        currentBirthday={props.currentBirthday}
        totalBirthdays={props.totalBirthdays}
      />
      {props.totalBirthdays > 1 ? (
        <ProgressBarComponent
          currentBirthday={props.currentBirthday}
          totalBirthdays={props.totalBirthdays}
          currentColor={props.currentColor}
        />
      ) : (
        <div className="m-auto"></div>
      )}
    </div>
  );
}

export default SidebarComponent;
