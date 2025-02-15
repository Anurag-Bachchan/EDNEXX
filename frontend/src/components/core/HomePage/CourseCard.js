import React from 'react';

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`flex flex-col p-6 gap-2 shadow-xl transition-all duration-300 ease-in-out cursor-pointer
        ${currentCard === cardData.heading ? 'bg-slate-200 text-slate-900 shadow-black shadow-lg' : 'bg-slate-700 text-slate-300 shadow-lg shadow-black'}`}>
      <h1 className="text-xl font-bold mb-2">{cardData.heading}</h1>
      <p className="mb-4">{cardData.description}</p>
      <div className="flex flex-row justify-between">
        <div className="text-sm font-medium">{cardData.level}</div>
        <div className="text-sm font-medium">{cardData.lessionNumber}</div>
      </div>
    </div>
  );
};

export default CourseCard;
