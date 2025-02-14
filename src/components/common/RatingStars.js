import React, { useEffect, useState } from "react";
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

const RatingStars = ({ Review_Count, Star_Size }) => {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  });

  useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0;
    setStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    });
  }, [Review_Count]);

  return (
    <div className="flex gap-1 text-yellow-200">
      {/* Full Stars */}
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
      ))}
      
      {/* Half Star */}
      {starCount.half === 1 && <TiStarHalfOutline key="half" size={Star_Size || 20} />}
      
      {/* Empty Stars */}
      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} />
      ))}
    </div>
  );
};

export default RatingStars;
