function AnimationScreenComponent(props) {
  let currentImage = (props.currentBirthday.index % 4) + 1 || 1;

  return (
    <div className="w-full">
      <div className="max-w-3xl m-auto relative">
        <div
          className="absolute right-2 top-2 border-2 border-slate-900 w-full h-full rounded-xl"
          style={{ background: `${props.currentColor}` }}
        ></div>
        <div className="relative border-2 border-slate-900 bg-white rounded-xl py-8">
          <img
            className="m-auto"
            alt="Animation character"
            src={`/images/character/character_${currentImage}.png`}
          />
        </div>
      </div>
    </div>
  );
}

export default AnimationScreenComponent;
