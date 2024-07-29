import BirthdayAnimationComponent from "./BirthdayAnimationComponent/BirthdayAnimation";

function BirthdayComponent(props) {
  let fullName = `${props.currentBirthday.firstname} ${props.currentBirthday.lastname}`;
  return (
    <div className="pt-44 w-1/2" style={{ background: props.currentColor }}>
      <div className="absolute left-[5%] top-[20%]">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="absolute left-[40%] top-[30%]">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="absolute left-[5%] top-[50%]">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="flex flex-col h-full">
        <BirthdayAnimationComponent currentColor={props.currentColor} />
        <div className="w-full text-center relative bottom-16">
          <span className="font-bison text-[95px]">{fullName}</span>
        </div>
      </div>
    </div>
  );
}

export default BirthdayComponent;
