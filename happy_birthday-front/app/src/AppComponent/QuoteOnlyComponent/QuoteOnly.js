import QuoteComponent from '../QuoteComponent/Quote';

function QuoteOnlyComponent(props) {
  return (
    <div style={{ background: props.currentColor }}>
      <div className="absolute left-1/4 top-32">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="absolute left-3/4 top-32">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="absolute left-64 top-3/4">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="flex h-screen">
        <QuoteComponent currentColor={props.currentColor} />
      </div>
    </div>
  );
}

export default QuoteOnlyComponent;
