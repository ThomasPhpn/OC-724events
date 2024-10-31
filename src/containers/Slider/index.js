import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // isArray pour problème dans le console + changement de l'ordre pour l'affichage du plus ancien au plus récent
  const byDateDesc = Array.isArray(data?.focus)
    ? data?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
      )
    : [];
  // index + 1 pour régler le problème de défilement du slider
  const nextCard = () => {
    setTimeout(
      () => setIndex(index + 1 < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Utilisation de react fragment pour pouvoir avoir une key unique
        <React.Fragment key={`slide-${event.title}`}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* probleme de pagination idx plutot que index et changement de la key pour probleme de console */}
              {byDateDesc.map((ev, radioIdx) => (
                <input
                  key={`pagination-dot-${ev.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                  // readonly pour ne pas rendre les radio-button cliquables
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
