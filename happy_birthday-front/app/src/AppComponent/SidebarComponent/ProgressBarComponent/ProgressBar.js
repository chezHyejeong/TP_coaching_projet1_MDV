import { useEffect, useState } from 'react';

function ProgressBarComponent(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset la progression à 0 chaque fois que l'index change
    setProgress(0);

    // Créer une animation qui dure 5 secondes pour remplir la barre de progression
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 100 / 500; // Augmenter de 0.2% chaque 10ms (5000ms/100)
        }
        clearInterval(interval);
        return 100; // Assurez-vous que la progression atteint 100%
      });
    }, 10);

    // Nettoyer l'intervalle en cas de démontage du composant
    return () => clearInterval(interval);
  }, [props.currentBirthday.index]); // Dépendance à l'index actuel

  function leadingZero(index) {
    return index <= 10 ? index.toString().padStart(2, '0') : index;
  }

  return (
    <div className="flex items-center m-auto font-bison text-xl font-bold">
      <span className="pr-3">{leadingZero(props.currentBirthday.index + 1)}</span>

      <div className="w-96 h-3 relative bottom-1">
        <div className="absolute right-1 top-2 border-2 border-slate-900 bg-slate-900 w-full h-full rounded-xl"></div>
        <div className="w-96 h-3 relative border-[1px] border-slate-900 bg-white rounded-xl box-content">
          <div
            className="h-3 rounded-xl bg-transition"
            style={{ width: `${progress}%`, background: props.currentColor, transition: 'width 10ms linear' }}
          ></div>
        </div>
      </div>

      <span className="pl-3">{leadingZero(props.totalBirthdays)}</span>
    </div>
  );
}

export default ProgressBarComponent;
